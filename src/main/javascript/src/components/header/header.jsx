import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';

import './header.scss';

export class ProfileHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='headerBackground'>
                <div className='header_container'>
                    <div>
                        <IconButton 
                            aria-label="home"
                            component={Link} 
                            to='/'
                            >
                            <HomeIcon style={{ color: 'white' }} />
                        </IconButton>
                    </div>
                    <div className='headerTitle'>
                        <h1>Profiles Project</h1>
                    </div>
              </div>

            </div>
        )
    }
}

export default ProfileHeader;