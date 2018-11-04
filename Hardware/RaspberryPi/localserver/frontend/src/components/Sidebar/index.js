import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import {sidebarItems} from './sidebarItems';
import { routes } from "../Routes";
import Avatar from '@material-ui/core/Avatar';

const drawerWidth = 260;

const styles = theme => ({
    root: {
        flexGrow: 1,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        height: '600px'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth
    },
    content: {
        flexGrow: 1,
        background: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        minWidth: 0,
        paddingTop: theme.spacing.unit * 10,
    },
    toolbar: theme.mixins.toolbar,
});

function Sidebar(props){
    const {classes} = props;
    return (
        <div className={classes.root}>
            <AppBar position="absolute" className={classes.appBar}>
                <Toolbar>
                    <Avatar src="/logo.png"/>
                    <Typography variant="title" color="inherit" noWrap>
                        Pingüilock
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer 
                variant="permanent" 
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
            <div className={classes.toolbar} />
            <List>{sidebarItems}</List>
            </Drawer>
            <main className={classes.content} >
                <div>
                    {routes}
                </div>
            </main>
        </div>
    );
}
Sidebar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Sidebar);