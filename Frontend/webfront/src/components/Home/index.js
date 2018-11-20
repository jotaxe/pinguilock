import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import app from '../Api';


const styles = {
    root: {
      flexGrow: 1,
    },
  };

class Home extends Component {
        
    render() {
        const {classes} = this.props;

        return (
            <div>
                <Typography align={"center"} component="h2" variant="h1" gutterBottom>
                    Welcome to Pingüilock
                </Typography>
            </div>
            
        )
    }
}
Home.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(Home);

