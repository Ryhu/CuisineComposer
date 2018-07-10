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
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
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
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    overflow: 'hidden'
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
    borderRadius: 5,
  },
  overImageText:{
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    color:'white',
    paddingLeft:5,
    paddingRight:5,
  },
  recipeTile:{
    paddingLeft:5,
    height:60,
    width: 400,
    backgroundColor: '#ff4d4d',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    overflow: 'hidden',
    justifyContent: 'center',
    fontWeight:'bold'
  },

});
