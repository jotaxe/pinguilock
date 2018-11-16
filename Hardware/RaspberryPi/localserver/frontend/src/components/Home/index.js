import React, { Component } from 'react'
import {getMQTTInfo, getAdmin} from '../Api/localApi';
import app from '../Api/externalApi';

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      admin: undefined,
      device_name: undefined
    }
  }
  componentDidMount(){
    app.authenticate()
    Promise.resolve(getMQTTInfo()).then((devData) => {
      this.setState({device_name: devData.device_name});
    }).then( () => {
      getAdmin().then( (adminInfo) => {
        this.setState({admin: adminInfo.mail})
      })
    });

    
  }
  render() {
    const {device_name, admin} = this.state;
    return (
      <div>
        Bienvenido al admin de {device_name} {admin}
      </div>
    )
  }
}

