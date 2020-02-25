import React from 'react'
import { Card, Icon, Avatar, Modal } from 'antd';
import RecipeDetails from './RecipeDetails';

const { Meta } = Card;

class RecipeCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = { visible: false };
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    render() {
        //Boolean values
        let { liked, disliked, favourited } = this.props;

        const styling = { 'liked': 'green', 'disliked': 'blue', 'favourited': 'red' };

        // const styling = { 'liked': { color: liked ? 'green' : 'grey' }, 'disliked': { color: disliked ? 'blue' : 'grey' }, 'favourited': { color: favourited ? 'red' : 'grey' } };
        const theme = { 'liked': liked ? 'filled' : 'outlined', 'disliked': disliked ? 'filled' : 'outlined', 'favourited': favourited ? 'filled' : 'outlined' };
        return (
            <div>
                <Card
                    hoverable={true}
                    cover={<img alt="example" src={this.props.image} />}
                    actions={[
                        // <Icon type="like" style={styling['liked']} theme={theme['liked']} onClick={this.handleClick}/>,
                        <Icon type="like" style={{ color: liked ? styling['liked'] : 'grey' }} theme={theme['liked']} onClick={() => this.props.handleToggleLike(this.props.id)} />,
                        <Icon type="dislike" style={{ color: disliked ? styling['disliked'] : 'grey' }} theme={theme['disliked']} onClick={() => this.props.handleToggleDislike(this.props.id)} />,
                        <Icon type="heart" style={{ color: favourited ? styling['favourited'] : 'grey' }} theme={theme['favourited']} onClick={() => this.props.handleToggleFavourite(this.props.id)} />,
                        <Icon type="info-circle" onClick={this.showModal} />
                    ]}
                >
                    <Meta title={this.props.title} description={this.props.description} />
                </Card>
                <Modal
                    title="Recipe Details"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    friendPageFlag={this.props.friendPageFlag}
                    friendID={this.props.friendID}
                >
                    <RecipeDetails
                        id={this.props.id}
                        image={this.props.image}
                        title={this.props.title}
                        description={this.props.description}
                        liked={this.props.liked}
                        disliked={this.props.disliked}
                        favourited={this.props.favourited}
                        handleToggleLike={this.props.handleToggleLike}
                        handleToggleDislike={this.props.handleToggleDislike}
                        handleToggleFavourite={this.props.handleToggleFavourite}
                        friendPageFlag={this.props.friendPageFlag}
                        friendID={this.props.friendID} />
                </Modal>
            </div>
        )
    }
}

export default RecipeCard