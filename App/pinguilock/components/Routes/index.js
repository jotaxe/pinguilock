import {createStackNavigator} from "react-navigation";
import KeysScreen from "../Keys";
import LoginScreen from "../Login";
import React from 'react';


export default RootStack = createStackNavigator(
    {
      Login: LoginScreen,
      Keys: KeysScreen,
    },
    {
      initialRouteName: 'Login',
    }
  );