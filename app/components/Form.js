import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput, 
  TouchableOpacity
} from 'react-native';

export default class Form extends React.Component {

    
    render() {
        return(
  <View style = {styles.container}>
      <TextInput style = {styles.inputBox} 
      underlineColorAndroid = 'rgba(255,255,255,1)'
      placeholder = 'Epost'
      placeholderTextColor = '#ffffff'
      keyboardType = "email-address"
      onSubmitEditing={()=> this.password.focus()}/>
      <TextInput style = {styles.inputBox} 
      underlineColorAndroid = 'rgba(255,255,255,1)'
      placeholder = 'Passord'
      secureTextEntry={true}
      placeholderTextColor = '#ffffff'
      ref={(input) => this.password = input}
        />
      <TouchableOpacity style = {styles.loginButton}>
      <Text style = {styles.loginbuttonTekst}>Register</Text>
      </TouchableOpacity>


    
     </View>
        
        )
    }
}
const styles = StyleSheet.create({
    Container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    },
    inputBox : {
        width : 300,
        backgroundColor : 'rgba(5, 25, 25,0.8)',
        borderRadius : 25,
        paddingHorizontal : 16,
        fontSize : 16,
        color : '#ffffff',
        marginVertical : 5,
        paddingVertical : 13
    },
    loginButton:{
        width : 300,
        backgroundColor : 'rgba(76, 99, 214,0.85)',
        borderRadius : 25,
        
        marginVertical : 10,
        paddingVertical : 13
        
    },
    loginbuttonTekst: {
        fontSize : 16,
        fontWeight : '500',
        color : '#ffffff',
        textAlign : 'center'
        
    }
})