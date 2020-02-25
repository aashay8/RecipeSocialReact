import React from 'react';
import { Collapse, Input, Button, Checkbox, Switch } from 'antd';
import recipesData from './recipes';
const { Panel } = Collapse;

const URL = 'http://localhost:5000/'

class RecipeDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem('login') != null ? JSON.parse(localStorage.getItem('login')).token : null,
            recipe: '',
            comments: [],
            ingredients: []
        }
    }

    componentDidMount() {
        //API to fetch comments by user id and recipe id
        if (this.props.friendPageFlag)
            fetch(URL + 'friends/getFriendComments', {
                method: 'post',
                body: JSON.stringify({ 'recipe_id': this.props.id, 'friendId': this.props.friendID }),
                headers: {
                    "Content-Type": "application/json",
                    "token": this.state.token
                }
            })
                .then(response => response.json())
                .then(resp => {
                    if (resp.message == 'List of comments')
                        this.setState({
                            comments: resp.data.commentsList
                        })
                })

        else
            fetch(URL + 'users/getUserComments', {
                method: 'post',
                body: JSON.stringify({ 'recipe_id': this.props.id }),
                headers: {
                    "Content-Type": "application/json",
                    "token": this.state.token
                }
            })
                .then(response => response.json())
                .then(resp => {
                    if (resp.message == 'List of comments')
                        this.setState({
                            comments: resp.data.commentsList
                        })
                })

        let ingredientsList = [];
        let recipeDetails = '';
        for (let i in recipesData) {
            let recipe = recipesData[i];
            if (recipe.idMeal == this.props.id) {
                recipeDetails = recipe.strInstructions;
                if (recipe.strIngredient1) ingredientsList.push(recipe.strIngredient1 + '---' + recipe.strMeasure1);
                if (recipe.strIngredient2) ingredientsList.push(recipe.strIngredient2 + '---' + recipe.strMeasure2);
                if (recipe.strIngredient3) ingredientsList.push(recipe.strIngredient3 + '---' + recipe.strMeasure3);
                if (recipe.strIngredient4) ingredientsList.push(recipe.strIngredient4 + '---' + recipe.strMeasure4);
                if (recipe.strIngredient5) ingredientsList.push(recipe.strIngredient5 + '---' + recipe.strMeasure5);
                if (recipe.strIngredient6) ingredientsList.push(recipe.strIngredient6 + '---' + recipe.strMeasure6);
                if (recipe.strIngredient7) ingredientsList.push(recipe.strIngredient7 + '---' + recipe.strMeasure7);
                if (recipe.strIngredient8) ingredientsList.push(recipe.strIngredient8 + '---' + recipe.strMeasure8);
                if (recipe.strIngredient9) ingredientsList.push(recipe.strIngredient9 + '---' + recipe.strMeasure9);
                if (recipe.strIngredient10) ingredientsList.push(recipe.strIngredient10 + '---' + recipe.strMeasure10);
                if (recipe.strIngredient11) ingredientsList.push(recipe.strIngredient11 + '---' + recipe.strMeasure11);
                if (recipe.strIngredient12) ingredientsList.push(recipe.strIngredient12 + '---' + recipe.strMeasure12);
                if (recipe.strIngredient13) ingredientsList.push(recipe.strIngredient13 + '---' + recipe.strMeasure13);
                if (recipe.strIngredient14) ingredientsList.push(recipe.strIngredient14 + '---' + recipe.strMeasure14);
                if (recipe.strIngredient15) ingredientsList.push(recipe.strIngredient15 + '---' + recipe.strMeasure15);
                if (recipe.strIngredient16) ingredientsList.push(recipe.strIngredient16 + '---' + recipe.strMeasure16);
                if (recipe.strIngredient17) ingredientsList.push(recipe.strIngredient17 + '---' + recipe.strMeasure17);
                if (recipe.strIngredient18) ingredientsList.push(recipe.strIngredient18 + '---' + recipe.strMeasure18);
                if (recipe.strIngredient19) ingredientsList.push(recipe.strIngredient19 + '---' + recipe.strMeasure19);
                if (recipe.strIngredient20) ingredientsList.push(recipe.strIngredient20 + '---' + recipe.strMeasure20);
                break;
            }
        }
        this.setState({
            recipe: recipeDetails,
            ingredients: ingredientsList
        })
    }

    handleCommentSubmit = e => {
        e.preventDefault();
        e.stopPropagation();
        // console.log(typeof(e.target.privacy.getAttribute('aria-checked')));
        fetch(URL + 'users/addComment', {
            method: 'post',
            body: JSON.stringify({
                'recipe_id': this.props.id,
                'commentedGridEmail': this.props.friendID ? this.props.friendID : JSON.parse(localStorage.getItem('login')).emailID,
                'commentText': e.target.comment.value,
                'privacy': e.target.privacy.getAttribute('aria-checked') === 'true' ? 1 : 0
            }),
            headers: {
                "Content-Type": "application/json",
                "token": this.state.token
            }
        })
            .then(response => response.json())
            .then(resp => {
                if (resp.message === 'New Comment Added') {
                    this.setState({
                        comments: resp.data
                    })
                }
                else {
                    alert('Error in Posting comment');
                }
            })
 
            document.getElementById('commentForm' + this.props.id).reset();
    }

    render() {
        return (
            <div>
                <h3>{this.props.title}</h3>
                <Collapse accordion
                // defaultActiveKey={['1']}  onChange={callback}
                >
                    <Panel header="Recipe" key="1">
                        <p>{this.state.recipe}</p>
                    </Panel>
                    <Panel header="Ingredients" key="2">
                        <ul>
                            {this.state.ingredients.map(v => <li>{v}</li>)}
                        </ul>
                    </Panel>
                    <Panel header="Comments" key="3">
                        <ul>
                            {this.state.comments.map(v => <li>{v.text}</li>)}
                        </ul>
                        <form id={'commentForm' + this.props.id} onSubmit={this.handleCommentSubmit}>
                            <input type='text' id='comment' name='comment' />
                            <Switch name='privacy'
                             checkedChildren="private" unCheckedChildren="public" defaultChecked={false}
                             disabled={this.props.friendPageFlag} 
                            >Private</Switch>
                            <Button type="primary" htmlType="submit" className="login-form-button" >Submit Comment</Button>
                        </form>
                    </Panel>
                </Collapse>
            </div >
        )
    }
}

export default RecipeDetails;