import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert
} from 'react-native';
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
      email:'',
      respuesta: {
        "total": 2,
        "limit": 10,
        "skip": 0,
        "data": [
            {
                "id": 1,
                "reciever_email": "test@nogoogle.com",
                "timeout": "2018-11-22T19:34:54.000Z",
                "createdAt": "2018-11-22T18:34:54.000Z",
                "updatedAt": "2018-11-22T18:34:54.000Z",
                "user_id": null,
                "granted_by_user": null,
                "lock_id": 1,
                "status": "timedout"
            },
            {
                "id": 2,
                "reciever_email": "rodolfo.romero@mail.udp.cl",
                "timeout": "2018-12-03T12:54:48.000Z",
                "status": "aproval pending",
                "createdAt": "2018-12-03T11:54:48.000Z",
                "updatedAt": "2018-12-03T11:54:48.000Z",
                "user_id": null,
                "granted_by_user": null,
                "lock_id": 1
            },
            {
                "id": 3,
                "reciever_email": "maximiliano.reyes@mail.udp.cl",
                "timeout": "2018-12-03T12:54:48.000Z",
                "status": "active",
                "createdAt": "2018-12-03T11:54:48.000Z",
                "updatedAt": "2018-12-03T11:54:48.000Z",
                "user_id": null,
                "granted_by_user": null,
                "lock_id": 1
            }
          ]
      },
      
    }
  }

  // componentDidMount = () => {
    
  // }


  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  } 
 

  onPress = () => {
    {console.log(this.state.email)}
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(reg.test(this.state.email) === false){
      console.log("Email is Not Correct");
      this.setState({
        email:''
        })
      alert("Ingrese mail valido")
      return false;
    }
    else {

//------METODO PARA SOLICITAR OPT---------//

      const to = [this.state.email] // string or array of email addresses
      
    }
  }


  renderSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#f77613",
          marginLeft: "0%",
          //borderTopWidth:10
        }}
      />
    );
  };

  renderTopSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#f77613",
          marginLeft: "0%",
          //borderTopWidth:10
        }}
      />
    );
  };

_keyExtractor = (item, index) => item.id.toString();

delete = (itemId) => {
   console.log(itemId);
}


renderItem = ({item}) => {
   return(
     
     <View style={{
        // flexDirection: 'row',
        alignContent: 'center',
         alignItems: 'flex-start',
        // justifyContent: 'space-evenly',
        // paddingTop: 15,
        // paddingBottom: 15,
        backgroundColor: '#292929',
        maxHeight:61
        }}>
      <Text 
      numberOfLines={1}
      ellipsizeMode='tail'
      style={{color:'white', left: 10, top:20}}>
        {item.reciever_email};
      </Text>
      
      <View style={{flexDirection: 'row'}}>
      {this.renderStatus(item)}
    </View>
   </View>
   )
  }
  
  renderStatus = (values) => {
    if(values.status == 'timedout'){
      return(
        <View style={{ left:220, top: 2, }}>
        <Text style={{color:'red', fontSize:15}}>
        Timed Out
        </Text>
        <View style={{ left: 60, top:-25}}>
        <Icon name="close-circle" type='material-community'  size={30} color="red" style={{top:11}} />
        </View>
        <View style={{  left: 100, top: -58}}>
        <TouchableOpacity onPress={() => this.delete(values.id)}>
          <Icon name="delete-forever" type='material-community'  size={30} color="gray" />
          </TouchableOpacity>
        </View>
        </View>
      );
    }
    if(values.status == 'aproval pending'){
      return(
        <View style={{ left:220, top: 2, }}>
        <Text style={{color:'#f77613'}}>
        Pending
        
        </Text>
        <View style={{ left: 67, top:-25}}>
        <Icon name="access-alarm"   size={30} color="#f77613" />
        </View>
        <View style={{ left: 109, top: -58}}>
        <TouchableOpacity onPress={() => this.delete(values.id)}>
        <Icon name="delete-forever" type='material-community'  size={30} color="red" />
        </TouchableOpacity>
        </View>
        </View>
      );      
    }
    if(values.status == 'active') {
      return(
      <View style={{ left:220, top: 2, }}>
        <Text style={{color:'green'}}>
        Used
        </Text>
        <View style={{ left: 76, top:-25}}>
        <Icon name="check-circle" type='material-community'  size={30} color="green" />
        </View>
        <View style={{ left: 118, top: -58}}>
        <TouchableOpacity onPress={() => this.delete(values.id)}>
        <Icon name="delete-forever" type='material-community'  size={30} color="gray" />
        </TouchableOpacity>
        </View>
        </View>
        );
    }
    }
  
  
  
  render() {
    return (

  //   <View style={{flex:1,justifyContent:'center',borderTopWidth:80}}>
    
  //  </View>
    <View style={{flex:1,justifyContent:'center',borderTopWidth:80}}>
          <FlatList
            data={this.state.respuesta.data}
            keyExtractor={this._keyExtractor}
            renderItem={this.renderItem}
            style={{flex:1,backgroundColor: '#000000'}}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderTopSeparator}
            ListFooterComponent={this.renderTopSeparator}
          />


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
              <Icon name="qrcode" type='font-awesome' color='#f77613' size={120}/>
              <View style={{flexDirection: 'row',
                      left:40,
                      // alignItems: 'center',
                      justifyItems: 'flex-start',}}
              >
              <Icon name="email-outline" type='material-community' color='#f77613' size={40}/>
              <TextInput
                  style={styles.email}
                  onChangeText={(email) => this.setState({email})}
                  value={this.state.email}
                  placeholder="Email"
                  keyboardType='email-address'
                  maxLength={40}
                  // multiline={true}
                  placeholderTextColor='black'

                />
                </View>
              <View style={styles.sendCancel}>
              
            <TouchableOpacity onPress={this.onPress}>
                
              <Text style={styles.enviar}>Send</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> 
            this.setState({
              showMe:false,
              email:''
            })} >
              <Text style={styles.cerrar}>Cancel</Text>
            </TouchableOpacity>
            </View>
    
            
          </View>
        </Modal>
      </View>
    );
    
  }
}