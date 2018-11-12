import React from 'react';
import {Route, Switch} from "react-router-dom";
import Home from "../Home";
import Access from "../Access";
import Login from "../Login";
import OTP from '../OTP';

import {PrivateRoute} from "./PrivateRoute";

export const routes = (
    <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/access" component={Access} />
        <PrivateRoute exact path="/OTP" component={OTP} />
    </Switch>
)


