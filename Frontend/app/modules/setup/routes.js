import React, { Component } from 'react';
import {createStackNavigator, createDrawerNavigator, createMaterialTopTabNavigator} from 'react-navigation';
import { DrawerActions } from 'react-navigation';
import {View,Text,StyleSheet,Platform,TouchableOpacity,Image,StatusBar} from 'react-native';

import Home from '../screens/Home/index';
import Opciones from '../screens/Opciones/index'
import Codigos from '../screens/Codigos/index';
import Info from '../screens/Info/index';
import DrawerScreen from '../screens/Common/DrawerScreen';

import { Icon } from 'react-native-elements'

const Tabs = createMaterialTopTabNavigator({
    Home: {screen: Home,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({tintColor}) => (
                <Icon name="vpn-key" color='white'/>
                )
        }
    },
    Codigos: {screen: Codigos,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({tintColor}) => (
                <Icon name="qrcode" type='font-awesome' color='white'/>
                )
        }
    },
    Info: {screen: Info,
        navigationOptions: {
            tabBarLabel: 'Info',
            tabBarIcon: ({tintColor}) => (
                <Icon name="lock" color='white'/>
                )
        }
    },
    Opciones: {screen: Opciones,
        navigationOptions: {
            tabBarLabel: 'Home',
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

const DrawerNavigator = createDrawerNavigator({
    Home:{
        screen: Tabs
    }
},{
    initialRouteName: 'Home',
    contentComponent: DrawerScreen,
    drawerWidth: 300
});

const MenuImage = ({navigation}) => {
    if(!navigation.state.isDrawerOpen){
        return <Image source={require('../images/menu-button.png')}/>
    }else{
        return <Image source={require('../images/left-arrow.png')}/>
    }
}

const StackNavigator = createStackNavigator({
    
    //important: key and screen name (i.e. DrawerNavigator) should be same while using the drawer navigator inside stack navigator.
    
    DrawerNavigator:{
        screen: DrawerNavigator
    }
},{
    navigationOptions: ({ navigation }) => ({
        title: 'Pinguilock',  // Title to appear in status bar
        headerLeft: 
        <TouchableOpacity  onPress={() => {navigation.dispatch(DrawerActions.toggleDrawer())} }>
            <MenuImage style="styles.bar" navigation={navigation}/>
        </TouchableOpacity>,
        headerStyle: {
            backgroundColor: '#f77613',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },

    })
});

export default StackNavigator;
