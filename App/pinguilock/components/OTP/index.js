import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
//import TopTab from "../TopTab";
import { AsyncStorage } from "react-native";
import {fetchUserKeys} from "../Api";
import styles from '../Styles/index';
//import email from 'react-native-email';
import { Icon } from 'react-native-elements';
import Modal from "react-native-modal";



export default class Codigos extends Component{
  constructor(){
    super()
    this.state={
      showMe:false,
      nombre: '',
      email:''
    }
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  } 
 


  
  render() {
    return (
      <View style={styles.container}>
          <TouchableOpacity onPress={()=> this.setState({
              showMe:true
            })} style={styles.boton}>
            <Icon name={"add"}  size={30} color="white" />
          </TouchableOpacity>
          <Modal 
            transparent={true}
            visible={this.state.showMe}
            onRequestClose={() => {
              alert('Modal has been closed.');
              }}>
            <View style={styles.modal}>
              <Text style={styles.tituloModal}>Send OTP QR code </Text>
            <TouchableOpacity onPress={this.Enviar}>
              <Text style={styles.enviar}>Enviar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> 
            this.setState({
              showMe:false
            })} >
              <Text style={styles.cerrar}>Cancelar</Text>
            </TouchableOpacity>
    
            
          </View>
        </Modal>
      </View>
    );
  }
};