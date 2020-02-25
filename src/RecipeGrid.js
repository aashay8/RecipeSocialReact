import React from 'react';
import { Redirect } from 'react-router-dom'
import RecipeCard from './RecipeCard'
import { Col, Row, Layout } from 'antd';
import RecipeSidebar from './RecipeSidebar';
import RecipeHeader from './RecipeHeader';
import RecipeGridContent from './RecipeGridContent';
import UnconnectedProfile from './UnconnectedProfile';
import FriendsLists from './FriendsLists';
import string_concat from './utils/string_concat';

import recipesData from './recipes';

const URL = 'http://localhost:5000/'

const { Header, Sider, Content } = Layout;
// import { Content } from 'react-bootstrap/lib/Tab';


class RecipeGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem('login') != null ? JSON.parse(localStorage.getItem('login')).token : null,
            recipes: recipesData,
            categories: [],
            likes: [],
            dislikes: [],
            favourites: [],
            hidden: [],
            item_keys: {},
            toShow: 'all',
            //friendPageStates -> null - own profile, 1-friend added, 2 - req sent, 3 - req pending, 4 - not connected yet
            friendPageState: null,
            friendsListView: null,
            userListForView: null
        }
    }


    handleNavClick = (key) => {
        console.log(key);
        this.setState({ toShow: key })
    }

    recipeSearch = (key) => {
        let toHide = [];

        for (let i in this.state.item_keys) {
            if (!this.state.item_keys[i].toLowerCase().includes(key.toLowerCase()))
                toHide.push(i)
        }
        this.setState({ hidden: toHide })
    }

    componentWillMount() {
        if (this.props.match.params.friendID && JSON.parse(localStorage.getItem('login')).emailID != this.props.match.params.friendID) {
            fetch(URL + 'friends/getFriendProfile', {
                method: 'post',
                body: JSON.stringify({ "friendId": this.props.match.params.friendID }),
                headers: {
                    "Content-Type": "application/json",
                    "token": this.state.token
                }
            })
                .then(response => response.json())
                .then((resp) => {
                    let userLoginInfo = localStorage.getItem('login') != null ? JSON.parse(localStorage.getItem('login')) : null;
                    userLoginInfo.friendDetails = resp.data;
                    localStorage.setItem('login', JSON.stringify(userLoginInfo));
                    if (resp.message == 'Friend details') {
                        // resp.data = userName, email, location, gender, mobile, likes, dislikes, favourites
                        this.setState({
                            friendPageState: 1,
                            likes: resp.data.likes,
                            dislikes: resp.data.dislikes,
                            favourites: resp.data.favourites
                        })
                    }
                    else if (resp.message == 'Friend Request sent') {
                        this.setState({
                            friendPageState: 2
                        })
                    }
                    else if (resp.message == 'Pending Friend Request')
                        this.setState({
                            friendPageState: 3
                        })
                    else if (resp.message == 'Not connected')
                        this.setState({
                            friendPageState: 4
                        })
                })
        }
        else {
            //Own profile
            let localStore = localStorage.getItem('login') != null ? JSON.parse(localStorage.getItem('login')) : null;
            localStore.friendPageState = null;
            if (localStore.loggedIn)
                this.setState({
                    likes: localStore.likes,
                    dislikes: localStore.dislikes,
                    favourites: localStore.favourites
                })
        }
    }

    componentDidMount() {
        this.state.recipes.map(recipe => {
            let currentKeys = this.state.item_keys;
            currentKeys[recipe.idMeal] = string_concat(recipe.strMeal, recipe.strDrinkAlternate, recipe.strCategory, recipe.strArea, recipe.strTags, recipe.strIngredient1, recipe.strIngredient2, recipe.strIngredient3, recipe.strIngredient4, recipe.strIngredient5, recipe.strIngredient6, recipe.strIngredient7, recipe.strIngredient8, recipe.strIngredient9, recipe.strIngredient10, recipe.strIngredient11, recipe.strIngredient12, recipe.strIngredient13, recipe.strIngredient14, recipe.strIngredient15, recipe.strIngredient15, recipe.strIngredient16, recipe.strIngredient17, recipe.strIngredient18, recipe.strIngredient19, recipe.strIngredient20);
            this.setState({ item_keys: currentKeys });
        });
    }

    handleToggleLike = (id) => {
        //API to toggle like
        //Set state to new list of likes and dislikes
        fetch(URL + 'users/toggleLike', {
            method: 'post',
            body: JSON.stringify({ 'recipe_id': id }),
            headers: {
                "Content-Type": "application/json",
                "token": this.state.token
            }
        })
            .then(response => response.json())
            .then(resp => {
                if (resp.message === 'success') {
                    this.setState({
                        likes: resp.data.likes,
                        dislikes: resp.data.dislikes
                    })
                }
                else {
                    alert('Error in toggling like')
                }
            })
    }

    handleToggleDislike = (id) => {
        //API to toggle dislike
        //Set state to new list of likes and dislikes
        fetch(URL + 'users/toggleDislike', {
            method: 'post',
            body: JSON.stringify({ 'recipe_id': id }),
            headers: {
                "Content-Type": "application/json",
                "token": this.state.token
            }
        })
            .then(response => response.json())
            .then(resp => {
                if (resp.message === 'success') {
                    this.setState({
                        likes: resp.data.likes,
                        dislikes: resp.data.dislikes
                    })
                }
                else {
                    alert('Error in toggling dislike')
                }
            })
    }

    handleToggleFavourite = (id) => {
        //API to toggle favourite
        //Set state to new list of likes and dislikes
        fetch(URL + 'users/toggleFavourites', {
            method: 'post',
            body: JSON.stringify({ 'recipe_id': id }),
            headers: {
                "Content-Type": "application/json",
                "token": this.state.token
            }
        })
            .then(response => response.json())
            .then(resp => {
                if (resp.message === 'success') {
                    this.setState({
                        favourites: resp.data.favourites
                    })
                }
                else {
                    alert('Error in toggling favourite')
                }
            })
    }

    acceptRequestHandler = (friendId) => {
        fetch(URL + 'friends/acceptRequest', {
            method: 'post',
            body: JSON.stringify({ 'friendId': friendId }),
            headers: {
                "Content-Type": "application/json",
                "token": this.state.token
            }
        }).then(response => response.json())
            .then(resp => {
                if (resp.message == 'Request accepted') {
                    window.location.reload()
                }
                else {
                    alert('error in accepting request');
                }
            })
    }

    rejectRequestHandler = (friendId) => {
        fetch(URL + 'friends/rejectRequest', {
            method: 'post',
            body: JSON.stringify({ 'friendId': friendId }),
            headers: {
                "Content-Type": "application/json",
                "token": this.state.token
            }
        }).then(response => response.json())
            .then(resp => {
                if (resp.message == 'Request rejected') {
                    window.location.reload()
                }
                else {
                    alert('error in rejecting request');
                }
            })
    }

    sendRequestHandler = (friendId) => {
        fetch(URL + 'friends/sendRequest', {
            method: 'post',
            body: JSON.stringify({ 'friendId': friendId }),
            headers: {
                "Content-Type": "application/json",
                "token": this.state.token
            }
        }).then(response => response.json())
            .then(resp => {
                if (resp.message == 'Friend request sent') {
                    window.location.reload()
                }
                else {
                    alert('error in sending request: ' + resp.messaage);
                }
            })
    }

    handleFriendsListView = (key, userList)=>{
        this.setState({ friendsListView: key, userListForView: userList})
    }

    render() {
        let localStore = localStorage.getItem('login') != null ? JSON.parse(localStorage.getItem('login')) : null;
        let friendPageFlag = this.state.friendPageState != null ? true : false;
        if (localStore.loggedIn) {
            //For view of sent,received,friend list
            if(this.state.friendsListView){
                return(
                    <div>
                    <Layout>
                        <Sider>
                            <RecipeSidebar onSearch={this.recipeSearch} disableUnconnected={false}/>
                        </Sider>
                    </Layout>
                    <Layout>
                        <Header>
                            <RecipeHeader
                                userName={localStore.userName}
                                onSearch={this.recipeSearch}
                                handleNavClick={this.handleNavClick}
                                friendPageState={this.state.friendPageState}
                                friendPageFlag={friendPageFlag}
                                friendUserName={friendPageFlag ? localStore.friendDetails.userName : null}
                                disableUnconnected={false}
                                handleFriendsListView = {this.handleFriendsListView} />
                        </Header>
                        <Content>
                            <FriendsLists style={{width:'100%'}} listType = {this.state.friendsListView} userList={this.state.userListForView} />
                        </Content>
                    </Layout>
                </div >
                )
            }
            //Unconnected user
            if (this.state.friendPageState && [2, 3, 4].indexOf(this.state.friendPageState) != -1)
                return (
                    <div>
                        <Layout>
                            <Sider>
                                <RecipeSidebar disableUnconnected={true} />
                            </Sider>
                        </Layout>
                        <Layout>
                            <Header>
                                <RecipeHeader
                                    userName={localStore.userName}
                                    // onSearch={this.recipeSearch}
                                    // handleNavClick={this.handleNavClick}
                                    friendPageState={this.state.friendPageState}
                                    friendPageFlag={friendPageFlag}
                                    friendUserName={localStore.friendDetails.userName}
                                    disableUnconnected={true}
                                    handleFriendsListView = {this.handleFriendsListView}
                                    />
                            </Header>
                            <Content>
                                <UnconnectedProfile
                                    friendPageState={this.state.friendPageState}
                                    acceptRequestHandler={this.acceptRequestHandler}
                                    rejectRequestHandler={this.rejectRequestHandler}
                                    sendRequestHandler={this.sendRequestHandler}
                                    friendUserName={localStore.friendDetails.userName}
                                    friendID={this.props.match.params.friendID}
                                />
                            </Content>
                        </Layout>
                    </div >
                )
            //friendPageFlag = True if we are visiting a friend's page
            return (
                <div>
                    <Layout>
                        <Sider>
                            <RecipeSidebar onSearch={this.recipeSearch} disableUnconnected={false}/>
                        </Sider>
                    </Layout>
                    <Layout>
                        <Header>
                            <RecipeHeader
                                userName={localStore.userName}
                                onSearch={this.recipeSearch}
                                handleNavClick={this.handleNavClick}
                                friendPageState={this.state.friendPageState}
                                friendPageFlag={friendPageFlag}
                                friendUserName={friendPageFlag ? localStore.friendDetails.userName : null}
                                disableUnconnected={false}
                                handleFriendsListView = {this.handleFriendsListView} />
                        </Header>
                        <Content>
                            <RecipeGridContent
                                friendPageFlag={friendPageFlag}
                                friendID={friendPageFlag ? localStore.friendDetails.email : null}
                                recipes={this.state.recipes}
                                likes={friendPageFlag ? localStore.friendDetails.likes : this.state.likes}
                                dislikes={friendPageFlag ? localStore.friendDetails.dislikes : this.state.dislikes}
                                favourites={friendPageFlag ? localStore.friendDetails.favourites : this.state.favourites}
                                hidden={this.state.hidden}
                                toShow={this.state.toShow}
                                handleToggleLike={friendPageFlag ? () => { } : this.handleToggleLike}
                                handleToggleDislike={friendPageFlag ? () => { } : this.handleToggleDislike}
                                handleToggleFavourite={friendPageFlag ? () => { } : this.handleToggleFavourite}
                            />
                        </Content>
                    </Layout>
                </div >
            )
        }
        else
            return (<Redirect to="/login" />)
    }
}

export default RecipeGrid