import React, { Component } from 'react';
import {createStackNavigator, createDrawerNavigator, createMaterialTopTabNavigator} from 'react-navigation';
import { DrawerActions } from 'react-navigation';
import {View,Text,StyleSheet,Platform,TouchableOpacity,Image,StatusBar} from 'react-native';

import KeysScreen from "../Keys";
import LoginScreen from "../Login";
import OtpScreen from "../OTP";
import LocksScreen from "../Locks";
import UserScreen from "../User";

import { Icon } from 'react-native-elements'

const Tabs = createMaterialTopTabNavigator({
    Keys: {screen: KeysScreen,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({tintColor}) => (
                <Icon name="vpn-key" color='white'/>
                )
        }
    },
    Codigos: {screen: OtpScreen,
        navigationOptions: {
            tabBarLabel: 'Otp',
            tabBarIcon: ({tintColor}) => (
                <Icon name="qrcode" type='font-awesome' color='white'/>
                )
        }
    },
    Info: {screen: LocksScreen,
        navigationOptions: {
            tabBarLabel: 'Info',
            tabBarIcon: ({tintColor}) => (
                <Icon name="lock" color='white'/>
                )
        }
    },
    Opciones: {screen: UserScreen,
        navigationOptions: {
            tabBarLabel: 'User',
            tabBarIcon: ({tintColor}) => (
                <Icon name="user" type='font-awesome' color='white'/>
                )
        }
    },
},{
    tabBarOptions: {
        showIcon: true,
        showLabel: false,
        activeTintColor: '#000',
        inactiveTintColor: 'gray',
        style: {
            backgroundColor: '#f77613',
        },
        indicatorStyle: {
            backgroundColor: '#000',
        },
    }
});

const StackNavigator = createStackNavigator({
    Login: {
        screen: LoginScreen
    },
    Pi:{
        screen: Tabs
    }
},{
    initialRouteName: "Login",
});

export default StackNavigator;
