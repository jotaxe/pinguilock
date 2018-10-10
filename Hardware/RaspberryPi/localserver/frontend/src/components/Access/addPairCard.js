import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Modal from '@material-ui/core/Modal';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';


import {getCams, getLocks, pairDevices} from "../Api/localApi";





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
  cretePairButton: {
    margin: theme.spacing.unit,
    left: "80%"
  },
  select: {
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

class addPairCard extends Component {
    state = {
        modal: false,
        cam_name: 0,
        lock_name: 0,
        cams: undefined,
        locks: undefined

    };
    handleOpen = () => { 
        this.setState({modal: true});
    }

    handleClose = () => {
        this.setState({modal: false});
    }

    camChange = (ev) => {
        this.setState({cam_name: ev.target.value});
        console.log("hola")
    }

    lockChange = (ev) => {
        this.setState({lock_name: ev.target.value});
    }

    createPair = () => {
        const { cam_name, lock_name } = this.state;
        pairDevices(cam_name, lock_name);
        this.setState({
            modal: false,
            cam_name: 0,
            lock_name: 0
        })
    }

    componentDidMount(){
        Promise.resolve(getCams()).then((camsData) => {
            this.setState({cams: camsData.data});
        }).then(() => {
            Promise.resolve(getLocks()).then((locksData) => {
                this.setState({locks: locksData.data});
            })
        });
    }


    render(){
        const { classes } = this.props;
        const {cams, locks} = this.state;
        const camsOptions = cams ? cams.map((cam) => {
            return (<MenuItem key={cam._id} value={cam.name}>{cam.name}</MenuItem>)
        }) : null;
        const locksOptions = locks ? locks.map((lock) => {
            return (<MenuItem key={lock._id} value={lock.name}>{lock.name}</MenuItem>)
        }) : null;
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
                                Add a Pair access
                            </Typography>
                            <FormControl>
                            <Select
                            displayEmpty
                            className={classes.select}
                            onChange={this.camChange}
                            value={this.state.cam_name}
                            
                            >
                             <MenuItem value={0} disabled>
                             Cameras
                             </MenuItem>
                             {camsOptions}
                            </Select>
                            <br/>
                            <Select
                            displayEmpty
                            className={classes.select}
                            onChange={this.lockChange}
                            value={this.state.lock_name}
                            
                            >
                            <MenuItem value={0} disabled>Locks</MenuItem>
                             {locksOptions}
                            </Select>
                            </FormControl>
                            <br/>
                            
                            <Button 
                            className={classes.cretePairButton} 
                            color="primary" 
                            onClick={this.createPair}
                            >
                            Pair
                            </Button>
                        </div>
                    </Modal>
                </div>
        );
    }
}
addPairCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(addPairCard);