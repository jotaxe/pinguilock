import React, { Component } from 'react';
import Sidebar from "./components/Sidebar";
import './App.css';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import app from './components/Api/externalApi';

class App extends Component {

  componentDidMount(){
    if(localStorage.getItem('feathers-jwt')){
      app.authenticate();
    }
  }

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
