import React, { Component } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import { ProfileHeader } from '../header/header'
import { ProfileFooter } from '../footer/footer'
import { apiEndpoint } from '../../config'
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import LinkIcon from '@material-ui/icons/Link';
import DescriptionIcon from '@material-ui/icons/Description';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import { Alert, AlertTitle } from '@material-ui/lab';
import FormData from 'form-data'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import './profileview.scss'
import '../rootstyle.scss'

export class ProfileView extends Component {

    constructor(props) {
        super(props);
        const profileId = this.props.location.pathname.substring(this.props.location.pathname.lastIndexOf('/') + 1)
        
        let profileData = null, profileDataBackup = null, isNewProfile = null;
        if (this.props.location.newProfile && this.props.location.newProfile == true)  {
            isNewProfile = true;
        } else {
            isNewProfile = false;
        }
        console.log(isNewProfile)
        if (this.props.location.profileData && !isNewProfile)  {
            profileData = this.props.location.profileData.item
            profileDataBackup = JSON.parse(JSON.stringify(profileData));
        }
        this.state = { 
                        profileId : profileId,
                        profileData : profileData,
                        profileDataBackup : profileDataBackup,
                        editMode: false,
                        isUploadSuccesful: false,
                        deleteDialogOpen : false,
                        isNewProfile : isNewProfile
                    }  
        //  console.log('profileId', this.state.profileId)
        //   console.log('profileData', this.state.profileData)
    }


    componentDidMount() {
        if (this.state.isNewProfile) {
            this.setState({
                profileData : {
                    name : '',
                    description : '',
                    link : ''
                },
                editMode : true
            })
        }
        else if (this.state.profileData == null) {
            this.getProfile();
        }
    }

    getProfile = async () => {
        let res = await axios.get(`${apiEndpoint}/profiles/${this.state.profileId}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        // console.log(res.data);
        this.setState({ profileData: res.data, profileDataBackup : JSON.parse(JSON.stringify(res.data))});
        console.log('backupData', this.state.profileDataBackup)
    };

    toggleEdit = async () => {
        this.setState({editMode: !this.state.editMode})
    }

    saveProfile = async () => {
        let profileData = {
            name : this.state.profileData.name,
            description :  this.state.profileData.description,
            link : this.state.profileData.link
        }
        console.log('saving profileData', profileData);
        if  (!this.state.isNewProfile) {
            await axios.put(`${apiEndpoint}/profiles/${this.state.profileId}`, profileData, {
                headers: {
                'Content-Type': 'application/json'
                }
            });
            this.onFileUpload();
        } else {
            let res = await axios.post(`${apiEndpoint}/profiles`, profileData, {
                headers: {
                'Content-Type': 'application/json'
                }
            });   
            const profileId = res.data.id
            this.setState({profileId: profileId})
            this.onFileUpload();
            this.props.history.push({
                pathname: `/profileentry/${profileId}`
            });
            window.location.reload();        
        }

        this.setState({editMode: false, profileDataBackup : JSON.parse(JSON.stringify(this.state.profileData))})

    }

    cancelEdit = async () => {
        console.log('cancel edit')
        console.log('current', this.state.profileData)
        console.log('backup', this.state.profileDataBackup)
        this.setState({
            editMode: false, 
            profileData: JSON.parse(JSON.stringify(this.state.profileDataBackup))
        })
    }

    handleDeleteOpen = () => {
        this.setState({deleteDialogOpen : true});
    };
    
    handleDeleteClose = () => {
        this.setState({deleteDialogOpen : false});
    };

    handleExecuteDelete = async () => {
        await axios.delete(`${apiEndpoint}/profiles/${this.state.profileId}`, {
            headers: {
            'Content-Type': 'application/json'
            }
        });   
        this.props.history.push({
            pathname: '/'
        });
    };


    onFileChange = event => { 
     
        // Update the state 
        this.setState({ selectedFile: event.target.files[0] }); 
       
    }; 

    onFileUpload = async () => { 
     
        // Create an object of formData 
        const formData = new FormData(); 
       
        if (!this.state.selectedFile) {
            return
        }
        // Update the formData object 
        formData.append( 
          "image-file", 
          this.state.selectedFile, 
          this.state.selectedFile.name 
        ); 
       
        // Details of the uploaded file 
        console.log(this.state.selectedFile); 
       
        // Request made to the backend api 
        // Send formData object 
        // axios.post("api/uploadfile", formData); 
        const uploadUrl = `${apiEndpoint}images/${this.state.profileId}`
        await axios.post(uploadUrl, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
        let profileData = this.state.profileData;
        profileData.imageName = this.state.profileId + '-' + this.state.selectedFile.name
        let profileDataBackup = this.state.profileDataBackup;
        profileDataBackup.imageName = this.state.profileId + '-' + this.state.selectedFile.name
        this.setState({profileData : profileData, profileDataBackup : profileDataBackup})

      }; 


    render() {

        const isDataAvailable = this.state.profileData != null
        return (
            <div className='globalView'>


                <ProfileHeader/>
                    <div style={{paddingLeft:'100px', paddingRight:'100px'}}>
                    <div>
                    <AppBar 
                        position="static" 
                        className='profile-view-app-bar' 
                
                    >
                    
                    {
                        this.state.editMode && !this.state.isNewProfile ?
                        <Toolbar>
                            <div style={{marginLeft: 'auto'}}>
                                <Button color="inherit"  onClick={() => this.saveProfile()}>
                                    Save
                                </Button>
                                <Button color="inherit"  onClick={() => this.cancelEdit()}>
                                    Cancel
                                </Button>
                            </div>
                        </Toolbar>
                        :
                        this.state.isNewProfile ?
                        <Toolbar>
                            <div style={{marginLeft: 'auto'}}>
                                <Button color="inherit"  onClick={() => this.saveProfile()}>
                                    Save
                                </Button>
                            </div>
                        </Toolbar>
                        :
                        <Toolbar >
                            <div style={{marginLeft: 'auto'}}>
                                <Button color="inherit"  onClick={() => this.toggleEdit()}>
                                    Edit
                                </Button>
                                <Button color="inherit"  onClick={() => this.handleDeleteOpen()}>
                                    Delete
                                </Button>
                                <Dialog
                                    open={this.state.deleteDialogOpen}
                                    onClose={this.handleDeleteClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">{"Really delete profile?"}</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                Do you really want to delete the profile?
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={this.handleExecuteDelete} color="primary">
                                                Ok
                                            </Button>
                                            <Button onClick={this.handleDeleteClose} color="primary" autoFocus>
                                                Cancel
                                            </Button>
                                        </DialogActions>
                                </Dialog>
                            </div>
                        </Toolbar>
                    }
                
                </AppBar>
                    </div>
                    <Paper elevation={3} className='profile-view-paper'>

                        { isDataAvailable?
                           <Grid container spacing={3} className='profile-view-grid' justify="space-evenly">
                            <Grid item xs={3}>
                                <Avatar 
                                    variant="rounded" 
                                    alt={this.state.profileData.name} 
                                    className='profile-view-avatar' 
                                    style={{ width: '225px', height: '225px', margin: 'auto'}} 
                                    src={!this.state.isNewProfile ? `${apiEndpoint}/images/${this.state.profileData.imageName}` : ('')} 
                                />

                                {
                                    this.state.editMode ?
                                    <div style={{textAlign:'center', marginTop:'15px'}}>
                                        <input
                                            type="file"
                                            style={{ marginBottom: '15px' }}
                                            onChange={this.onFileChange}
                                        />
                                        {/* <Button  variant="contained" component="label" onClick={this.onFileUpload}>
                                        Upload

                                        </Button> */}
                                    </div>


                                    :
                                    <div></div>
                                }
                                                                    {
                                        this.state.isUploadSuccesful ?
                                        (
                                            <div>
                                                <br></br>
                                                <Alert severity="success">
                                                    <AlertTitle>Success</AlertTitle>
                                                    <strong>File upload was successful</strong>
                                                </Alert>
                                            </div>
                                        ) : ('')
                                    }
                            </Grid>
                            <Grid item xs={6}>
                                {
                                    this.state.editMode ?
                                    <div>

                            <div>
                                <Card>
                                    <CardContent>
                                <form>
                                <TextField 
                                    value={this.state.profileData.name} 
                                    id="profile-name" 
                                    label="Name" 


                                    variant="outlined"
                                    style={{width:'100%', marginBottom:'25px'}}
                                    required
                                    onChange={event => {
                                        console.log('edit title')
                                        const { value } = event.target;
                                        let profileData = this.state.profileData;
                                        profileData.name = value;
                                        this.setState({profileData : profileData})
                                    }} 
                                />

                                <TextField 
                                    value={this.state.profileData.link} 
                                    id="profile-link" 
                                    label="Link" 
   

                                    variant="outlined"
                                    style={{width:'100%', marginBottom:'25px'}}
                                    required 
                                    onChange={event => {
                                        console.log('edit title')
                                        const { value } = event.target;
                                        let profileData = this.state.profileData;
                                        profileData.link = value;
                                        this.setState({profileData : profileData})
                                    }} 
                                />
                           
                                            <TextField 
                                                value={this.state.profileData.description} 
                                                id="profile-description" 
                                                label="Description" 


                                                variant="outlined"
                                                style={{width:'100%'}}
                                                required
                                                multiline
                                                onChange={event => {
                                                    console.log('edit title')
                                                    const { value } = event.target;
                                                    let profileData = this.state.profileData;
                                                    profileData.description = value;
                                                    this.setState({profileData : profileData})
                                                }} 
                                            />
                                            </form>
                                    </CardContent>
                                </Card>
                                </div>

                                
                                </div>
                                 : 
                                 <div>
                                 <Card >
                                    <CardContent>
                                     <div className='profile-view-input-container' style={{marginBottom:'15px'}}>
                                        <LabelImportantIcon style={{ color: 'black' }} />
                                        <h2 style={{marginLeft:'10px'}}>{this.state.profileData.name}</h2>
                                     </div>
                                     <div className='profile-view-input-container'>
                                        <LinkIcon style={{ color: 'black' }} />
                                        <a href={this.state.profileData.link} target="_blank">
                                        <h2 style={{marginLeft:'10px'}}>{this.state.profileData.link}</h2> 
                                        </a>
                                     </div>
                                     <Divider  />
                                     <div className='profile-view-input-container'>
                                <DescriptionIcon style={{ color: 'black' }} />
                                <h2 style={{marginLeft:'10px'}}>Description</h2> 
                            </div> 
                                        <Typography color="textSecondary" gutterBottom>
                                            {this.state.profileData.description}
                                        </Typography>
                                     </CardContent>
                                </Card>
                                
                                </div>
                                }
                            </Grid>
                            <Grid item xs={3}></Grid>

                            <Grid item xs={3}></Grid>
                            <Grid item xs={6}>


                            
                            </Grid>
                            <Grid item xs={3}></Grid>

                        </Grid>
                            
                            : <div></div>}    
     
                        
                    </Paper>
                    </div>
                <ProfileFooter/>

            
            </div>
        )
    }
}

export default ProfileView