import React, { Component } from 'react';
import axios from 'axios';
import { apiEndpoint } from '../../config'
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { ProfileHeader } from '../header/header'
import { ProfileFooter } from '../footer/footer'
import '../rootstyle.scss'
import './profilelist.scss'


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
        // console.log(res.data);
        this.setState({ profilesList: res.data });
    };

    handleItemClick(item) {
        const path = `/profileentry/${item.id}`
        console.log(path)
        this.props.history.push({
            pathname: path,
            profileData: {item}
        });
    }

    handleCreateNew = () => {
        const path = `/profileentry/new`
        console.log(path)
        this.props.history.push({
            pathname: path,
            newProfile : true
        });
    };

    render() {
        let counter = 0;
        let profileKey;
        return (
            <div className='globalView'>
                <ProfileHeader/>
                <div style={{paddingLeft:'100px', paddingRight:'100px'}}>
                <div>
                    <AppBar position="static" className='profile-view-app-bar'>
                    <Toolbar >
                        <div style={{marginLeft: 'auto'}}>
                            <Button color="inherit" onClick={() => this.handleCreateNew()}>
                                Add
                            </Button>
                        </div>
                    </Toolbar>
                </AppBar>
                    </div>
                <Paper elevation={3} className='profile-list-paper'>
                    <List>
                    {
                        this.state.profilesList.map((item) => {
                            profileKey = `profile-${++counter}`
                            return (
                                <div key={`profile-div-${counter}`}>
                                        <ListItem key={profileKey} button onClick={() => this.handleItemClick(item)}>
                                            <Avatar alt={item.name} className='profile-list-avatar' style={{minWidth: '25px', minHeight: '25px', width: '125px', height: '125px'}} src={`${apiEndpoint}/images/${item.imageName}`} />
                                            <ListItemText key={`profile-list-text-${counter}`} disableTypography primary={<Typography type="body2" style={{ color: 'black', fontWeight: 'bold', fontSize: '16pt' }}>{item.name}</Typography>} />
                                        </ListItem>
                                </div>
                            );
                        })
                    }
                    </List>
                    </Paper>
                    </div>
                <ProfileFooter/>
            </div>
        );
    }
}

export default ProfileList