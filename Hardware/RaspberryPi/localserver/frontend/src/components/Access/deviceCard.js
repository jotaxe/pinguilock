import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {deleteDevice} from "../Api/localApi";

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

class DeviceCard extends Component {
  deleteClick = () => {
    const { device } = this.props;
    deleteDevice(device._id)
  }
  render(){  
    const { classes, device, localname } = this.props;
    
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {device.type}
          </Typography>
          <Typography variant="h5" component="h2">
            {device.name}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {localname}/{device.name}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={this.deleteClick}>Delete</Button>
        </CardActions>
      </Card>
    );
  }
}

DeviceCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DeviceCard);