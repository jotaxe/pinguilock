import React, { Component } from 'react'

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (decodeURIComponent(pair[0]) == variable) {
        return decodeURIComponent(pair[1]);
      }
    }
    console.log('Query variable %s not found', variable);
  }
  

export default class Redirect extends Component {
    

    componentDidMount() {
        var token = getQueryVariable('token');
        if (token) {
            localStorage.setItem('accessToken', token);
        }
        const otpId = localStorage.getItem('otpId');
        if(otpId){
            this.props.history.push(`/assingOTP/${otpId}`);
        }else{
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div>
                redirecting... please wait
            </div>
        )
    }
}
