import React, { Component } from 'react';
import Sidebar from "./components/Sidebar";
import './App.css';
import { Route } from "react-router-dom";
import Login from "./components/Login";

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

class App extends Component {
  render() {
    const theme = createMuiTheme({
      palette: {
        primary: {
          main: "#212121"
        },
        secondary: {
          main: "#ff5722"
        }
      },
    });

    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Sidebar/>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
