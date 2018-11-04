/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import styles from '../../styles/index';
//import {List, } from 

export default class Home extends Component{

  constructor (){
    super()
    this.state = {
      datos:[]
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          Home
        </Text>
      </View>
    );
  }
}
