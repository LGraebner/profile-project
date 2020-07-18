import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';

export class ProfileView extends Component {

    constructor(props) {
        super(props);
        const profileId = this.props.location.pathname.substring(this.props.location.pathname.lastIndexOf('/') + 1)
        this.state = { profileId : profileId}  

        console.log('profileId', profileId)
    }

    render() {
        console.log('test')
        return (
            <div>
                <Paper elevation={3}>
                <h1>PROFILE {this.state.profileId}</h1>     
                </Paper>
            </div>
        )
    }
}

export default ProfileView