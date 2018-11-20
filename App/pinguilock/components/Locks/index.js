import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import styles from '../Styles/index';

//import TopTab from "../TopTab";
import { AsyncStorage } from "react-native";
import {fetchUserKeys} from "../Api";




export default class Locks extends Component{
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          Ventana locks 
        </Text>
      </View>
    );
  }
}