import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { faLock, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Divider from '@material-ui/core/Divider';
import {deletePair} from "../Api/localApi"


const styles = {
  card: {
    minWidth: 125,
  },
  title: {
    fontSize: 18,
  },
  pos: {
    marginBottom: 12,
  },
  divider: {
      marginLeft: 0,
  }
};

class PairCard extends Component {
  
  deleteClick = () =>{
    const { pair } = this.props;
    deletePair(pair._id);
  }

  render(){  
    const { classes, pair } = this.props;
    
    return (
      <Card className={classes.card}>
        <CardContent style={{paddingBottom: '6px'}}>
          <Typography className={classes.title}   align="center" variant="caption">
              <FontAwesomeIcon icon={faLock} align="center"/>
          </Typography> 
          <Typography className={classes.title}   align="center" variant="caption">
            /{pair.lock_topic}
          </Typography> 
          
          <Divider inset className={classes.divider}/>
          <Typography className={classes.title} color="textSecondary"  align="center" variant="caption">
              <FontAwesomeIcon icon={faVideo} />
          </Typography>
          <Typography className={classes.title}   align="center" variant="caption">
            /{pair.cam_topic}
          </Typography> 
          
        </CardContent>
        <CardActions>
          <Button size="small" onClick={this.deleteClick}>Delete</Button>
        </CardActions>
      </Card>
    );
  }
}
PairCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PairCard);