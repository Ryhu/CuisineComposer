import React from 'react';
import { StyleSheet } from "react-native"


export default StyleSheet.create({
  bigButton: {
    marginTop:70,
    height:140,
    width:350,
    backgroundColor: '#1093f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigButtonText:{
    color: 'white',
    fontSize: 40,
    textAlign: 'center',
  },
  container:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  findIngredient:{
    marginTop:5,
    height:50,
    width: 300,
    backgroundColor: '#4dff88',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reqIngredient:{
    marginTop:5,
    height:50,
    width: 200,
    backgroundColor: '#4dff88',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pullOutTrigger:{
    position:'absolute',
    backgroundColor:'red',
    height:600,
    width:30,
    right:0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom:50,
  },
  findView:{
    marginLeft:30,
  },
  findReqButton:{
    bottom:0,
    height:30,
    width:150,
    marginTop:20,
    backgroundColor:'#1093f6',
    justifyContent: 'center',
    alignItems: 'center',
  },

});
