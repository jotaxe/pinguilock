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
import { addDevice } from '../Api/localApi';

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

class AddDeviceCard extends Component {
    state = {
        modal: false,
        addDeviceTextField: undefined,
        addDeviceType: "",
    };
    handleOpen = () => { 
        this.setState({modal: true});
    }

    handleClose = () => {
        this.setState({modal: false});
    }

    deviceNameChange = (ev) => {
        this.setState({addDeviceTextField: ev.target.value});
    }

    handleTypeChange = (ev) => {
        this.setState({addDeviceType: ev.target.value});
    }

    createDevice = () => {
        const { addDeviceTextField, addDeviceType } = this.state;
        const device = {
            name: addDeviceTextField, 
            type: addDeviceTextField 
        };
        addDevice(device);
        this.setState({
            modal: false,
            addDeviceTextField: undefined,
            addDeviceType: ""
        });
    }


    render(){
        const { classes } = this.props;
        
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
                                Add a Device
                            </Typography>
                            <Divider/>
                            <br/>
                            <TextField 
                            label="Device Name" 
                            onChange={this.deviceNameChange} 
                            />
                            <br/>
                            <InputLabel htmlFor="dev-sel">Device Type</InputLabel>
                            <Select
                            className={classes.createDeviceSelect}
                            onChange={this.handleTypeChange}
                            value={this.state.addDeviceType}
                            inputProps={{
                                name: "device-type",
                                id: "dev-sel"
                            }}
                            >
                                <MenuItem value="cam">Camera</MenuItem>
                                <MenuItem value="lock">Lock</MenuItem>
                            </Select>
                            <br/>
                            <Button 
                            className={classes.creteDeviceButton} 
                            color="primary"
                            onClick={this.createDevice}
                            > 
                                Create
                            </Button>
                        </div>
                    </Modal>
                </div>
        );
    }
}
AddDeviceCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddDeviceCard);