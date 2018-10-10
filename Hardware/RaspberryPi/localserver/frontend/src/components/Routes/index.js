import React from 'react'

import {Route, Switch} from "react-router-dom";
import Home from "../Home";
import Access from "../Access";

export const routes = (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/access" component={Access} />
    </Switch>
)