import {StyleSheet, Platform} from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
    },
    heading: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: 'white'
    },
    menuItem:{
        padding: 10,
        borderWidth: 0.5,
        borderColor: '#d6d7da'
    },
    modal: {
    justifyContent: 'center',
    height: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    //alignItems: 'center'
  },
  boton: {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:80,
    height:80,
    backgroundColor:'#f77613',
    borderRadius:80,
    left: 10,
    bottom: 10,
    position: 'absolute',
  },
  enviar: {
    backgroundColor: '#f77613',
    color: 'white',
    margin: 1,
    borderRadius: 5,
    height:50,
    width:100,
    textAlign: 'center',
    paddingTop:10,
    fontSize:20
  },
  cerrar: {
    backgroundColor: 'white',
    color: 'black',
    margin: 1,
    borderRadius: 50,   
    height:50,
    width:100,
    textAlign: 'center',
    paddingTop:10,
    fontSize:20,
    right: 20
  },
  tituloModal: {
      textAlignVertical: 'top',
      textAlign: 'center',
      fontSize:20
  },
  email: {
      height: 40, 
      borderColor: 'white', 
      borderWidth: 1,
      backgroundColor: "white",
  },
  sendCancel: {
      left: 50,
      justifyContent: 'space-evenly',
      flexDirection: 'row'
  }
});