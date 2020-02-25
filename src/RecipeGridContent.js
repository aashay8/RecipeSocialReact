import React from 'react';
import { Col, Row } from 'antd';
import RecipeCard from './RecipeCard';

class RecipeGridContent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            item_keys:{}
        }
    }

    // componentWillMount(){
        
    //     console.log(this.props)
    // }
    render(){
        let { recipes } = this.props;
        let liked = -1, disliked = -1, favourited = -1;

        return(
            <div style={{ background: 'rgba(0,0,0,0)', padding: '30px', marginLeft: '120px' }}>

            <Row gutter={16}>
                {recipes.map((recipe) => {

                    liked = this.props.likes.indexOf(recipe.idMeal) != -1;
                    disliked = this.props.dislikes.indexOf(recipe.idMeal) != -1;
                    favourited = this.props.favourites.indexOf(recipe.idMeal) != -1

                    if (this.props.hidden.indexOf(recipe.idMeal) == -1) {
                        if ((this.props.toShow == 'all')
                            || (this.props.toShow == 'likes' && liked)
                            || (this.props.toShow == 'dislikes' && disliked)
                            || (this.props.toShow == 'favourites' && favourited)
                        ) {
                            return (
                                <Col key={recipe.idMeal} span={6} style={{ padding: '10px' }}>
                                    <RecipeCard
                                        id={recipe.idMeal}
                                        image={recipe.strMealThumb}
                                        title={recipe.strMeal}
                                        description={recipe.strArea}
                                        liked={liked}
                                        disliked={disliked}
                                        favourited={favourited}
                                        handleToggleLike={this.props.handleToggleLike}
                                        handleToggleDislike={this.props.handleToggleDislike}
                                        handleToggleFavourite={this.props.handleToggleFavourite}
                                        friendPageFlag = {this.props.friendPageFlag}
                                        friendID = { this.props.friendID }
                                    />
                                </Col>)
                        }
                    }
                })
                }
            </Row>
        </div>
        )
    }
}

export default RecipeGridContent;