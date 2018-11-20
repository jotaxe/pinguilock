
import React from 'react'
import {Switch, Route} from 'react-router-dom';
import Home from '../Home';
import AssingOTP from "../AssingOTP";
import Redirect from '../Redirect';

const routes = (
    <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/assingOtp/:otp?" component={AssingOTP}></Route>
        <Route path="/redirect" component={Redirect}></Route>
    </Switch>
)
export default routes;

