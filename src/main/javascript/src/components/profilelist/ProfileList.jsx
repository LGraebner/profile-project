import React, { Component } from 'react';
import axios from 'axios';
import { apiEndpoint } from '../../config'
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import { ProfileHeader } from '../header/header'
import { ProfileFooter } from '../footer/footer'

function ListItemLink(props: ListItemProps<'a', { button?: true }>) {
    return <ListItem button component="a" {...props} />;
}

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

    getCustomLink = (itemId) => {
        return <Link to={`/profileentry/${itemId}`}/>
    }

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
                            this.getCustomLink(item.id)
                            return (
                                <div key={`profile-div-${counter}`}>
                                    <Link to={`/profileentry/${item.id}`}>
                                        <ListItem key={profileKey} button>
                                            <ListItemText key={`profile-text-${counter}`} primary={item.name} />
                                        </ListItem>
                                    </Link>
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