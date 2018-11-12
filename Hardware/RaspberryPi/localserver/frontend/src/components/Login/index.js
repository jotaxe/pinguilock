import React, { Component } from 'react'
import { GoogleLogin } from 'react-google-login';
import {getAdmin, setAdmin, getMQTTInfo} from "../Api/localApi";
import {authenticate, createLocalServer} from "../Api/externalApi";
import Typography from '@material-ui/core/Typography';


export default class Login extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            adminSet: false,
            adminMail: undefined,
        }
    }

    responseGoogle = (response) => {
        console.log(response);
    }

    loginResponse = (response) => {
        const userEmail = response.profileObj.email;
        const {adminMail} = this.state;
        if (userEmail === adminMail){
            authenticate(response.Zi.access_token)
            .then((res) => {
                console.log(res);
                localStorage.setItem('user', res.user.id)
                window.location.href = "/";    
            }).catch((e) => {console.log(e);});
        }else{
            alert("Usuario incorrecto.")
        }
    }

    firstLoginResponse = (response) => {
        const adminMail = response.profileObj.email;
        setAdmin(adminMail).then( () => {
            
            authenticate(response.Zi.access_token).then( (res) => {
                localStorage.setItem("user", res.user.id);
            }).then( () => {
                getMQTTInfo().then( (devData) => {
                    const user = localStorage.getItem('user');
                    createLocalServer(user, devData.device_name).then( () => {
                        window.location.href = "/";
                    });
                });
            });
        });
    }

    componentDidMount() {
        Promise.resolve(getAdmin()).then((adminInfo) => {
            this.setState({
                adminSet: true,
                adminMail: adminInfo.mail
            });
            console.log(adminInfo);
        }).catch( (e) => {
            console.log(e);
        });
    }

    render() {
        const {adminSet, adminMail} = this.state;
        const firstUse = !adminSet ? (
            
            <Typography align={"center"} variant="body1">
                This login will set the account as
                 admin and will be the only account with access to
                  this site
                <Typography align={"center"} variant="caption">
                    if you don't have an account you can create it <a href="http://localhost:3030/">here.</a>
                </Typography>
            </Typography>
            
        ) : null;
        const adminInfo = adminMail ? (
            <Typography align={"center"} variant="body1">
                {"Only the device admin (" + adminMail + ") has access to this page, please login with this account to continue."}
            </Typography>
        ) : null;
        return (
            <div style={{
                marginTop: '10%'
            }}>
                
                <div style={{
                    marginLeft: "40%",
                    marginBottom: "3px"
                }}>
                    <GoogleLogin
                        clientId="744835113496-il4k0je3nr01idqate9m9vs2ndqbra7i.apps.googleusercontent.com"
                        buttonText="Login"
                        
                        onSuccess={!adminSet ? this.firstLoginResponse : this.loginResponse}
                        onFailure={this.responseGoogle}
                    />
                </div>
                {firstUse || adminInfo}
            </div>
        )
    }
}
