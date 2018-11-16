import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Modal from '@material-ui/core/Modal';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import ImageUploader from 'react-images-upload';
import { createKey, getUser } from '../Api/externalApi';
import app from '../Api/externalApi';
import AutosuggestSelect from "./autoSuggest";

const styles = theme => ({
  card: {
    minWidth: 275,
    minHeight: 172
  },
  modalPaper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  },
  button: {
    left: "42%",
    marginTop: "15%",
  },
  creteDeviceButton: {
    margin: theme.spacing.unit,
    left: "80%"
  },
  createDeviceSelect: {
    margin: theme.spacing.unit,
  }

});

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

class AddKeyCard extends Component {
    state = {
        modal: false,
        userId: undefined,
        locks: undefined,
        currentLock: 0,
        suggestions: [],
        imageUri: undefined,
        userEmail: '',
        keyName: ''
    };

    componentDidMount(){

        getUser().then((user) => {
            this.setState({locks: user.locks});
            
        }).then(() => {
            app.service('user').find({query: {$select: ['id', 'email']}}).then( (res) => {
                
                this.setState({suggestions: res.data})
            })
        });
    }
    handleOpen = () => { 
        this.setState({modal: true});
    }

    handleClose = () => {
        this.setState({modal: false});
    }

    emailChange = (event, {newValue}) => {
        
        
        const userArray = this.state.suggestions.filter(suggestion => suggestion.email === newValue)
        const userObject = userArray[0] ? userArray[0] : [];
        console.log(userObject); 
        this.setState({userId: userObject.id, userEmail: newValue});
    }

    lockChange = (ev) => {
        this.setState({currentLock: ev.target.value})
    }

    lockChange = (ev) => {
        this.setState({currentLock: ev.target.value})
    }

    nameChange = (ev) => {
        this.setState({keyName: ev.target.value})
    }

    createKey = () => {
        const {userId, currentLock, imageUri, keyName} = this.state
        createKey(userId, currentLock, imageUri, keyName).then(() => {
            this.setState({
                modal: false,
                userEmail: ""
            });
        })
    }

    onDrop = ( pictureFile, pictureDataURLs) => {
        console.log(pictureDataURLs)
        this.setState({imageUri: pictureDataURLs[0]});
    }


    render(){
        const { classes } = this.props;
        const locksOptions = this.state.locks ? this.state.locks.map((lock) => {
            return <MenuItem key={lock.id} value={lock.id}>{lock.name}</MenuItem>
        }): null;
        
        return (   
                <div>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                <Button
                                variant="fab"
                                onClick={this.handleOpen} 
                                color="secondary" 
                                aria-label="Add"
                                className={classes.button}
                                >
                                    <AddIcon />
                                </Button>
                                <br/>
                            </Typography>
                        </CardContent>
                    </Card>
                
                    <Modal 
                    open={this.state.modal}
                    onClose={this.handleClose} 
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    >
                        <div className={classes.modalPaper} style={getModalStyle()}>
                            <Typography variant="h6" id="modal-title">
                                Create a new key.
                            </Typography>
                            <Divider/>
                            <br/>
                            <TextField 
                            label="key name" 
                            onChange={this.nameChange} 
                            />
                            <br/>
                            <AutosuggestSelect
                                onChange={this.emailChange}
                                suggestions={this.state.suggestions}
                                value={this.state.userEmail}
                                placeholder='Search Users by email'
                            />
                            <br/>
                            <InputLabel htmlFor="dev-sel">Locks</InputLabel>
                            <Select
                                className={classes.createDeviceSelect}
                                onChange={this.lockChange}
                                value={this.state.currentLock}
                                inputProps={{
                                    name: "device-type",
                                    id: "dev-sel"
                                }}
                            >
                                <MenuItem value={0} disabled>
                                    Locks
                                </MenuItem>
                                {locksOptions}
                            </Select>
                            <br/>
                            <ImageUploader
                                withIcon={true}
                                buttonText='Choose images'
                                onChange={this.onDrop}
                                imgExtension={['.jpg', '.png', '.jpeg']}
                                maxFileSize={5242880}
                            />
                            <Button 
                            className={classes.creteDeviceButton} 
                            color="primary"
                            onClick={this.createKey}
                            > 
                                Create
                            </Button>
                        </div>
                    </Modal>
                </div>
        );
    }
}
AddKeyCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddKeyCard);