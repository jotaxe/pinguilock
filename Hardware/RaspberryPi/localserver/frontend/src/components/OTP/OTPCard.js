import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {deleteOTP, aproveOTP, getUser, getUserName} from "../Api/externalApi";

const styles = {
  card: {
    minWidth: 125,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

class OTPCard extends Component {

    constructor(props){
        super(props);
        this.state={
            userName: undefined
        }
    }

    deleteClick = () => {
        const { otp } = this.props;
        deleteOTP(otp.id);
    }
    aproveClick = () => {
        const {otp} = this.props;
        aproveOTP(otp.id);
    }

    componentDidMount(){
        getUserName(this.props.otp.user_id).then((user) => {
            this.setState({userName: user.name});
        })
    }
    render(){  
        const { classes, otp } = this.props;
        const accountText = otp.user_id ? this.state.userName : "No linked Account"
        console.log(otp)
        return (
        <Card className={classes.card}>
            <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
                {otp.status}
            </Typography>
            <Typography variant="h5" component="h2">
                {otp.email}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
                {accountText}
            </Typography>
            </CardContent>
            <CardActions>
            <Button size="small" onClick={this.deleteClick}>Delete</Button>
            {(otp.user_id && (otp.status === 'aproval pending')) ? (<Button size="small" onClick={this.aproveClick}>Aprove</Button>) : null}
            </CardActions>
        </Card>
        );
    }
}

OTPCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OTPCard);
