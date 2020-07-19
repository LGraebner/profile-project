import React, { Component } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import { ProfileHeader } from '../header/header'
import { ProfileFooter } from '../footer/footer'
import { apiEndpoint } from '../../config'
import './profileview.scss'
import '../rootstyle.scss'

export class ProfileView extends Component {

    constructor(props) {
        super(props);
        const profileId = this.props.location.pathname.substring(this.props.location.pathname.lastIndexOf('/') + 1)
        
        let profileData = null;
        if (this.props.location.profileData)  {
            profileData = this.props.location.profileData.item
        }
        this.state = { 
                        profileId : profileId,
                        profileData: profileData
                    }  
         console.log('profileId', this.state.profileId)
          console.log('profileData', this.state.profileData)
    }


    componentDidMount() {
        if (this.state.profileData == null) {
            this.getProfile();
        }
    }

    getProfile = async () => {
        let res = await axios.get(`${apiEndpoint}/profiles/${this.state.profileId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.idToken}`
          }
        });
        // console.log(res.data);
        this.setState({ profileData: res.data });
    };


    render() {

        const isDataAvailable = this.state.profileData != null
        return (
            <div className='globalView'>


                <ProfileHeader/>
                    <Paper elevation={3} className='paperStyle'>
                    { isDataAvailable?
                        <h2>PROFILE: {this.state.profileData.name}</h2> 
                        : <div></div>}    
                    </Paper>
                <ProfileFooter/>

            
            </div>
        )
    }
}

export default ProfileView