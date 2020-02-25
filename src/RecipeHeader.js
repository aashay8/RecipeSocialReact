import React from 'react';
import { Redirect } from 'react-router-dom';
import { Menu, Avatar, Input, Button, Dropdown } from 'antd';
import Select from 'react-select';
const { Search } = Input;

const URL = 'http://localhost:5000/';

class RecipeHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reactSelectOptions: [],
            reactselectedOption: null,
            token: localStorage.getItem('login') != null ? JSON.parse(localStorage.getItem('login')).token : null
        }
    }

    logOutFunction = () => {
        localStorage.setItem('login', JSON.stringify({ loggedIn: false }))
        window.location.reload();
    }

    componentDidMount() {
        fetch(URL + 'users/userList', {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
                "token": this.state.token
            }
        })
            .then(response => response.json())
            .then((resp) => {
                let valuesForSelect = resp.data.map(v => {
                    return { value: v.email, label: v.userName }
                })
                this.setState({
                    reactSelectOptions: valuesForSelect
                })
            })
    }

    handleUserSearch = selectedOption => {
        console.log(`Option selected:`, selectedOption)
        this.setState(
            { reactselectedOption: selectedOption }
        );
    }

    retrieveFriendList = () => {
        fetch(URL + 'users/getUserFriendsDetails', {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                "token": this.state.token
            }
        })
            .then(response => response.json())
            .then((resp) => {
                this.props.handleFriendsListView('friends',resp.data)
            })
    }

    retrieveSentList = () => {
        fetch(URL + 'users/getUserSentRequests', {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                "token": this.state.token
            }
        })
            .then(response => response.json())
            .then((resp) => {
                this.props.handleFriendsListView('sent',resp.data)
            })
    }
    retrievePendingList = () => {
        fetch(URL + 'users/getUserPendingRequests', {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                "token": this.state.token
            }
        })
            .then(response => response.json())
            .then((resp) => {
                this.props.handleFriendsListView('received',resp.data)
            })
    }

    render() {
        let name = this.props.userName.split(' ');
        let avatarDisplay = name[0].split('')[0] + name[name.length - 1].split('')[0]
        let friendAvatarDisplay = '';
        // let friendHeaderVisiblity = this.props.friendPageFlag ? 'visible' : 'hidden'
        let userAvatarMenu =
            <Menu>
                <Menu.Item key='received' onClick={this.retrievePendingList}>Received Requests</Menu.Item>
                <Menu.Item key='friends' onClick={this.retrieveFriendList}>Friends List</Menu.Item>
                <Menu.Item key='sent' onClick={this.retrieveSentList}>Sent Requests</Menu.Item>
            </Menu>
        if (this.props.friendPageFlag)
            friendAvatarDisplay = this.props.friendUserName[0].split('')[0] + this.props.friendUserName[this.props.friendUserName.length - 1].split('')[0];
        //User searched from user search bar
        if (this.state.reactselectedOption) {
            return (
                <Redirect to={'/RecipeHome/' + this.state.reactselectedOption.value} />
            )
        }
        // Disable header options for unconnected profile view
        if (this.props.disableUnconnected)
            return (
                <div
                    style={{ display: 'flex', alignItems: 'left', position: 'fixed', zIndex: '100000', width: '100vw' }}>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{ lineHeight: '64px', width: '100vw' }}
                    >
                        <Avatar style={{ verticalAlign: 'middle' }} disabled={!this.props.friendPageFlag} size="large" >
                            {friendAvatarDisplay}
                        </Avatar>
                        <Menu.Item key="friend-name" disabled={!this.props.friendPageFlag}>
                            {this.props.friendUserName}
                        </Menu.Item>
                        <Dropdown overlay={userAvatarMenu} trigger={['click']}>
                            <Avatar style={{ verticalAlign: 'middle' }} size="large">
                                {avatarDisplay}
                            </Avatar>
                        </Dropdown>
                        <Menu.Item><Button onClick={this.logOutFunction}>Log Out</Button></Menu.Item>
                        <Menu.Item>
                            <div class='user-search'>
                                {/* <AutoComplete dataSource={this.state.userNameList} onClick={() => alert('Search item clicked')} /> */}
                                <Select
                                    value={this.state.reactselectedOption}
                                    onChange={this.handleUserSearch}
                                    options={this.state.reactSelectOptions}
                                />
                            </div>
                        </Menu.Item>
                    </Menu>
                </div>
            )
        else
            return (
                <div
                    style={{ display: 'flex', alignItems: 'left', position: 'fixed', zIndex: '100000', width: '100%' }}>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{ lineHeight: '64px', width: '100vw' }}
                    >
                        <Avatar style={{ verticalAlign: 'middle' }} disabled={!this.props.friendPageFlag} size="large" >
                            {friendAvatarDisplay}
                        </Avatar>
                        <Menu.Item key="friend-name" disabled={!this.props.friendPageFlag}>
                            {this.props.friendUserName}
                        </Menu.Item>
                        <Dropdown overlay={userAvatarMenu} trigger={['click']}>
                            <Avatar style={{ verticalAlign: 'middle' }} size="large">
                                {avatarDisplay}
                            </Avatar>
                        </Dropdown>
                        <Menu.Item key="1" onClick={() => this.props.handleNavClick('all')}>Home</Menu.Item>
                        <Menu.Item key="2" onClick={() => this.props.handleNavClick('likes')}>Likes</Menu.Item>
                        <Menu.Item key="3" onClick={() => this.props.handleNavClick('dislikes')}>Dislikes</Menu.Item>
                        <Menu.Item key="4" onClick={() => this.props.handleNavClick('favourites')}>Favourites</Menu.Item>
                        {/* <Link to="/RecipeHome/dislikes"></Link> */}
                        <Menu.Item key="5">
                            <Search
                                placeholder="Search"
                                onSearch={value => this.props.onSearch(value)}
                                style={{ width: 160 }}
                            />
                        </Menu.Item>
                        <Menu.Item><Button onClick={this.logOutFunction}>Log Out</Button></Menu.Item>
                        <Menu.Item>
                            <div class='user-search'>
                                {/* <AutoComplete dataSource={this.state.userNameList} onClick={() => alert('Search item clicked')} /> */}
                                <Select
                                    value={this.state.reactselectedOption}
                                    onChange={this.handleUserSearch}
                                    options={this.state.reactSelectOptions}
                                />
                            </div>
                        </Menu.Item>
                    </Menu>
                </div>
            )
    }
}

export default RecipeHeader;