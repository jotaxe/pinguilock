import React, { Component } from 'react';
import app from '../Api';
import QRCode from 'qrcode.react'
import CustomCard from "./card";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";



export default class AssingOTP extends Component {
    constructor(props){
        super(props);
        localStorage.setItem('otpId',  this.props.match.params.otp);
        this.state = {
            otpId: this.props.match.params.otp,
            qrView: undefined,
            otp: undefined,
            requestSended: false,
            grantedBy: ""
        }
    }
    
    componentDidMount = async () => {
        const otpId = this.props.match.params.otp;
        const accessToken = localStorage.getItem('accessToken');
        app.service('otp').on('patched', (patchedOtp) => {
           this.setState({otp: patchedOtp});             
        });
        let auth;
        if(accessToken){
            auth = await app.authenticate();
            localStorage.setItem('user', JSON.stringify(auth.user));
            const otp = await app.service('otp').get(otpId);
            const grantedBy = await app.service('user').get(otp.granted_by_user);    
            if(otp.user_id){
                if(otp.user_id === auth.user.id){
                    this.setState({qrView: 'correctUser', otp: otp, grantedBy: grantedBy.name})
                }else{
                    this.setState({qrView: 'incorrectUser'})
                }
            }else{
                this.setState({qrView: 'linkUser'});
            }      
        }else{
            this.setState({qrView: 'login'});
        }
    }

    linkAccount = () => {
        const {otpId} = this.state;
        app.authenticate().then((res) => {
            app.service('otp').patch(otpId, {user_id: res.user.id, status: 'aproval pending'}).then(() => {
                alert("User linked! please wait for aproval.")
            });
        });
    }

    
    loginAction = () => {
        window.location.href = 'http://www.pinguilock.tk/auth/google';
    }

    sendRequest = () => {
        const {otp} = this.state;
        const user = JSON.parse(localStorage.getItem('user'))
        app.service('access-request').create({
            user_id: user.id, 
            lock_id: otp.lock_id, 
            otp_id: otp.id, 
            method: "OTP"
        }).then( () => {
            this.setState({requestSended: true});
        })
    }



    
    render() {
        const {qrView, otp} = this.state;
        const classes = {
            card: {
              minWidth: 275,
            },
            bullet: {
              display: 'inline-block',
              margin: '0 2px',
              transform: 'scale(0.8)',
            },
            title: {
              fontSize: 14,
            },
            pos: {
              marginBottom: 12,
            },
          };
        
        console.log(qrView);
        switch (qrView) {
            case "correctUser":
                const {requestSended, grantedBy} = this.state;
                
                const content = otp.status === 'active' ? 
                (<QRCode renderAs={'svg'} size={"300"} value={otp.secret_code}/>) 
                :
                (otp.status == 'timedout' ? 
                    (<Typography align={"center"} className={classes.title} color="textSecondary">OTP Timedout.</Typography>)
                    :
                    (<Typography align={"center"} className={classes.title} color="textSecondary">please wait for aproval from admin.</Typography>)
                ) 
                
                return(<CustomCard 
                    title={"One Time Password QR Code"}
                    secondary={`Granted by user: ${grantedBy}`}
                    content={content}
                    button={(requestSended && otp.status === 'active') ? null :  <Button onClick={this.sendRequest}> Use OTP </Button>}
                    />)
            case "incorrectUser":
                return(<CustomCard 
                    title={"One Time Password QR Code"}
                    secondary={`WRONG USER`}
                    content={"incorrect"}
                    />)
            case "linkUser":
                    const user = JSON.parse(localStorage.getItem('user'));
                    return (
                    <CustomCard 
                    title={"One Time Password QR Code"}
                    secondary={`would you like to link this account (${user.email}) with this OTP?`}
                    button= {<Button onClick={this.linkAccount}> Link account </Button>}
                    />

                    )
            case "login": 
        
                    return (
                    <CustomCard 
                    title={"One Time Password QR Code"}
                    secondary={`Login`}
                    content={<Button onClick={this.loginAction}> Login With Google </Button>}
                    />

                    )
            default:
            return(<div>Loading</div>)
        }
    }
}

