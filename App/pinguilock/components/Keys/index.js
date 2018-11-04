import React, { Component } from 'react'
import { Text, View } from 'react-native'
import TopTab from "../TopTab";

export default class Keys extends Component {
  render() {
    return (
      <View>
        <TopTab/>
        <Text>De aquí para abajo va la lista </Text>
        
      </View>
    )
  }
}