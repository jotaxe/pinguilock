import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    content:{
        textAlign: 'center'
    }
  };

class CustomCard extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const {classes} = this.props;
        const props = this.props;
        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography align={"center"} className={classes.title} color="textSecondary" gutterBottom>
                        {props.title}
                    </Typography>
                    <div className={classes.content}>
                        {this.props.content !== "incorrect" ? this.props.content 
                        : (
                        <Typography align={"center"} className={classes.title} color="textSecondary">
                            Incorrect User. You can't see this QR Code.
                        </Typography>)}
                    </div>
                    <Typography align={"center"} className={classes.pos} color="textSecondary">
                        {props.secondary}
                    </Typography>
                </CardContent>
                <CardActions>
                        {this.props.button}
                </CardActions>
            </Card>
        )
    }
}

CustomCard.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(CustomCard);