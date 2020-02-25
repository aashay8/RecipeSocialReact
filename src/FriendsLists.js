import React from 'react';
import { List, Avatar, Button } from 'antd';

const ListItemFriend = (props) => {
    let nameSplit = props.userName.split(' ')
    let avatarText = nameSplit[0][0] + nameSplit[nameSplit.length - 1][0]
    return (
        <List.Item>
            <List.Item.Meta
                // avatar={<Avatar style={{ verticalAlign: 'middle' }} size="large">
                //     {avatarText}
                // </Avatar>}
                title={props.userName}
                description={props.email}
            />
        </List.Item>)
}

const ListItemSent = (props) => {
    let nameSplit = props.userName.split(' ')
    let avatarText = nameSplit[0][0] + nameSplit[nameSplit.length - 1][0]
    return (
        <List.Item>
            <List.Item.Meta
                // avatar={<Avatar style={{ verticalAlign: 'middle' }} size="large">
                //     {avatarText}
                // </Avatar>}
                title={props.userName}
                description={props.email}
            />
            <Button>Delete Request</Button>
        </List.Item>)
}

const ListItemPending = (props) => {
    let nameSplit = props.userName.split(' ')
    let avatarText = nameSplit[0][0] + nameSplit[nameSplit.length - 1][0]
    return (
        <List.Item>
            <List.Item.Meta
                // avatar={<Avatar style={{ verticalAlign: 'middle' }} size="large">
                //     {avatarText}
                // </Avatar>}
                title={props.userName}
                description={props.email}
            />
            <Button>Accept Request</Button>
        </List.Item>)
}

class FriendsLists extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let listItem = ''
        if(this.props.userList && this.props.userList.length == 0)
            return (
                <div>
                    <h3>No users in list</h3>
                </div>
            )
        if (this.props.listType == 'friends') {
            return(
                <List
                itemLayout="horizontal"
                dataSource={this.props.userList}
                renderItem={item => ( <ListItemFriend userName = {item.userName} email={item.email} />)}/>
            )
        }
        else if (this.props.listType == 'sent') {
            return(
                <List
                itemLayout="horizontal"
                dataSource={this.props.userList}
                renderItem={item => ( <ListItemSent userName = {item.userName} email={item.email} />)}/>
            )
        }
        else if (this.props.listType == 'received') {
            return(
                <List
                itemLayout="horizontal"
                dataSource={this.props.userList}
                renderItem={item => ( <ListItemPending userName = {item.userName} email={item.email} />)}/>
            )
        }
    }
}

export default FriendsLists