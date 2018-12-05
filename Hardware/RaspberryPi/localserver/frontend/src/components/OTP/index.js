import React, { Component } from 'react'
import {getOTPs} from '../Api/externalApi';
import app from '../Api/externalApi';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Divider from '@material-ui/core/Divider';
import AddOtpCard from "./addOTPCard";
import OTPCard from "./OTPCard";

function compare(a,b) {
  if (a.id < b.id)
    return -1;
  if (a.id > b.id)
    return 1;
  return 0;
}



export default class OTP extends Component {
  constructor(props){
    super(props);
    this.state = {
        otpList: []
    }
  }
  componentDidMount(){
    Promise.resolve(getOTPs()).then((otpData) => {
      this.setState({otpList: otpData});
    });    
    app.service('otp').on('created', (newOtp) => {
      this.setState((prevState) => {
        return {
          otpList: prevState.otpList.concat(newOtp)
        }
      })
    });
    app.service('otp').on('patched', (patchedOtp) => {
      this.setState((prevState) => {
        if(patchedOtp.status === 'inactive'){
          const filtered = prevState.otpList.filter(obj =>  obj.id !== patchedOtp.id )
        return {
          otpList: filtered
        }
        }
        return {
          otpList: prevState.otpList.map(obj => patchedOtp.id === obj.id ? patchedOtp : obj)
        }
      })
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
          One-Time-Passwords QR Codes
          <br/>
          <Divider/>
          <br/>
          <GridList className={styles.gridList} cols={3}>
            <GridListTile>
            <AddOtpCard/>
            </GridListTile>
            {this.state.otpList ? 
            this.state.otpList.map((otp) => {
              return otp ? (
                <GridListTile key={otp.id}>
                  <OTPCard otp={otp}/>
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