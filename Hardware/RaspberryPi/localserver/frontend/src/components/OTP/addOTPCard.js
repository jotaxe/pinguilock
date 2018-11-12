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
import { createOTP, getUser } from '../Api/externalApi';

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

class AddOtpCard extends Component {
    state = {
        modal: false,
        recieverEmail: "",
        locks: undefined,
        currentLock: undefined
    };

    componentDidMount(){
        getUser().then((user) => {
            this.setState({locks: user.locks});
        })
    }
    handleOpen = () => { 
        this.setState({modal: true});
    }

    handleClose = () => {
        this.setState({modal: false});
    }

    emailChange = (ev) => {
        this.setState({recieverEmail: ev.target.value});
    }

    lockChange = (ev) => {
        this.setState({currentLock: ev.target.value})
    }

    createOtp = () => {
        const { recieverEmail, currentLock } = this.state;
        createOTP(recieverEmail, currentLock);
        this.setState({
            modal: false,
            recieverEmail: ""
        });
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
                                create an OTP QR Code
                            </Typography>
                            <Divider/>
                            <br/>
                            <TextField 
                            label="email" 
                            onChange={this.emailChange} 
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
                            ><MenuItem value={0} disabled>
                            Locks
                            </MenuItem>
                            {locksOptions}
                            </Select>
                            <br/>
                            <Button 
                            className={classes.creteDeviceButton} 
                            color="primary"
                            onClick={this.createOtp}
                            > 
                                Create
                            </Button>
                        </div>
                    </Modal>
                </div>
        );
    }
}
AddOtpCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddOtpCard);