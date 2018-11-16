import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {removeKey, getUserName} from "../Api/externalApi";
import app from "../Api/externalApi";

const styles = {
  card: {
    minWidth: 125,
    minHeight: 172
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    minWidth: 125,
  },
  avatar: {
    width: 80,
    height: 80,
    marginRight: 25,
  }
};

class KeyCard extends Component {

    constructor(props){
        super(props);
        this.state={
            avatarUri: null,
            userName: undefined
        }
    }

    deleteClick = () => {
        const { cardKey } = this.props;
        removeKey(cardKey.id);
    }

    async componentDidMount(){
        getUserName(this.props.cardKey.user_id).then((user) => {
            this.setState({userName: user.name});
        })
        console.log(this.props.cardKey.image_path);
        await app.service('uploads').get(this.props.cardKey.image_path).then( (res) => {
            console.log(res);
            this.setState({avatarUri: res.uri})
        })
    }


    render(){  
        const { classes, cardKey } = this.props;
        const {avatarUri} = this.state;
        const accountText = cardKey.user_id ? this.state.userName : "No linked Account";
        console.log(avatarUri);
        return (
        <Card className={classes.card}>
            <CardContent className={classes.row}>
                <Avatar className={classes.avatar} src={avatarUri || null}/>
                    <Typography variant="h5" component="h2">
                        {cardKey.name}
                        <Typography className={classes.pos} color="textSecondary">
                            {accountText}
                        </Typography>
                    </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={this.deleteClick}>Delete</Button>
            </CardActions>
        </Card>
        );
    }
}

KeyCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(KeyCard);
