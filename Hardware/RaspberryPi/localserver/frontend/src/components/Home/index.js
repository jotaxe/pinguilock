import React, { Component } from 'react'
import {getMQTTInfo, getAdmin} from '../Api/localApi';

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      admin: undefined,
      device_name: undefined
    }
  }
  componentDidMount(){
    Promise.all(getAdmin()).then((adminData) => {
      this.setState({
        admin: adminData.email
      })
    }).catch(() => {
      alert("Admin not set")
    }).then( () => {
      Promise.resolve(getMQTTInfo()).then((devData) => {
        this.setState({device_name: devData.device_name});
      })
    });

    
  }
  render() {
    const {device_name, email} = this.state;
    return (
      <div>
        Bienvenido al admin de {device_name} {email}
      </div>
    )
  }
}

