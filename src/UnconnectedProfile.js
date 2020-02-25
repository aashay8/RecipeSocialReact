import React from 'react';
import { Button } from 'antd';

class UnconnectedProfile extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        if (this.props.friendPageState == 2) {
            //Request Sent - pending acceptance from friend
            return (
                <div>
                    <h1>Request sent to user {this.props.friendID}</h1>
                </div>
            )
        }
        if (this.props.friendPageState == 3) {
            //Request Pending for your acceptance
            return (
                <div>
                    <h1>Pending request from user {this.props.friendID}</h1>
                    <Button onClick={() => this.props.acceptRequestHandler(this.props.friendID)}>Accept Request</Button>
                    <Button onClick={() => this.props.rejectRequestHandler(this.props.friendID)}>Reject Request</Button>
                </div>
            )
        }
        if (this.props.friendPageState == 4)
            return (
                <div>
                    <h1>Not connected to user {this.props.friendID}</h1>
                    <Button onClick={() => this.props.sendRequestHandler(this.props.friendID)}>Send Request</Button>
                </div>
            )
    }

}

export default UnconnectedProfile