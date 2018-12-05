import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image
} from 'react-native';
import GoogleSignIn from 'react-native-google-sign-in';
import {authenticate} from "../Api";
import {AsyncStorage} from "react-native";
import { createStackNavigator } from 'react-navigation';

export default class LoginScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
      <Image
          style={{width: 100, height: 100, left: 0, top: 0}}
          source={require('../Styles/pinguilock.png')}

        />
        <Text style={styles.welcome}>
          Login Screen
        </Text>
        
        <TouchableHighlight onPress={ () => {
          Promise.resolve(GoogleSignIn.configure({
            clientID: '744835113496-hf0qmi7q80kt8jlb3hcndja01ef2mhs1.apps.googleusercontent.com',
            scopes: ['openid', 'email', 'profile'],
            shouldFetchBasicProfile: true,
          })).then( () => {
            Promise.resolve(GoogleSignIn.signInPromise()).then((user) => {
                alert(JSON.stringify(user));
                authenticate(user.accessToken).then( (r) => {
                  
                    r.accessToken ? this.props.navigation.navigate('Pi') : null;
                    AsyncStorage.setItem("userID", user.userID);

                }).catch((e) => {
                  alert(e)
                });
            })
          });

          
          
        }}>
          <Text style={styles.instructions}>
            Google Sign
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});