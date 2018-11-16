import React, { Component } from 'react'
import {getKeys} from '../Api/externalApi';
import app from '../Api/externalApi';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Divider from '@material-ui/core/Divider';
import AddKeyCard from "./addKeyCard";
import KeyCard from "./keyCard";


export default class Key extends Component {
  constructor(props){
    super(props);
    this.state = {
        keyList: []
    }
  }
  componentDidMount(){
    Promise.resolve(getKeys()).then((keyData) => {
      this.setState({keyList: keyData.data});
    });    
    app.service('key').on('created', (newKey) => {
      this.setState((prevState) => {
        return {
          keyList: prevState.keyList.concat(newKey)
        }
      })
    });
    app.service('key').on('removed', (removedKey) => {
      this.setState((prevState) => {
        const filtered = prevState.keyList.filter(obj =>  obj.id !== removedKey.id )
        return {
          keyList: filtered
        }
      });
    });
  }
  render() {
    const styles = {
        gridList: {
          width: 500,
          height: 450
        },
        subheader: {
          width: '100%',
        },
        addButtonGrid: {
            alignContent: "center",
            justifyContent: "center",
            display: "grid"
        }

      };

    return (
      <div>
          Keys
          <br/>
          <Divider/>
          <br/>
          <GridList className={styles.gridList} cols={3}>
            <GridListTile>
                <AddKeyCard/>
            </GridListTile>
            {this.state.keyList ? 
            this.state.keyList.map((key) => {
              return key ? (
                <GridListTile key={key.id}>
                  <KeyCard cardKey={key}/>
                </GridListTile>
              ) : null
            }):
            null
            }
          </GridList>
      </div>
    )
  }
}