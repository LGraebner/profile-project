import React, { Component } from 'react';
import axios from 'axios';
import { apiEndpoint } from '../../config'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ProfileHeader } from '../header/header'
import { ProfileFooter } from '../footer/footer'

export class ProfileList extends Component {

    constructor(props) {
        super(props);
        this.state = {profilesList: []};
    }

    componentDidMount() {
        this.getProfiles();
    }

    getProfiles = async () => {
        let res = await axios.get(`${apiEndpoint}/profiles`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.idToken}`
          }
        });
        console.log(res.data);
        this.setState({ profilesList: res.data });
    };

    render() {
        let counter = 0;
        let profileKey;
        return (
            <div>
            <ProfileHeader/>
            <List>
            {
                this.state.profilesList.map((item) => {
                    profileKey = `profile-${++counter}`
                    return (
                        <div key={`profile-div-${counter}`}>
                            <ListItem key={profileKey} button>
                                <ListItemText key={`profile-text-${counter}`} primary={item.name} />
                            </ListItem>
                        </div>
                    );
                })
            }
            </List>
            <ProfileFooter/>
            </div>
        );
    }
}

export default ProfileList