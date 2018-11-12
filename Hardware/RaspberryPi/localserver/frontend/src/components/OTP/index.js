import React, { Component } from 'react'
import {getOTPs} from '../Api/externalApi';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Divider from '@material-ui/core/Divider';
import AddOtpCard from "./addOTPCard";
import OTPCard from "./OTPCard";

export default class OTP extends Component {
  constructor(props){
    super(props);
    this.state = {
        otpList: undefined
    }
  }
  componentDidMount(){
    Promise.resolve(getOTPs()).then((otpData) => {
      this.setState({otpList: otpData.data});
    })
    
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
              return (
                <GridListTile key={otp.id}>
                  <OTPCard otp={otp}/>
                </GridListTile>
              )
            }):
            null
            }
          </GridList>
      </div>
    )
  }
}