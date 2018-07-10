import React from 'react';
import { Button, View, Text, Image, TextInput, Alert, TouchableOpacity } from "react-native";


class AddIngredient extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      name:"",
      picture:"",
      nutrition:"",
    }

  }

  TextInputFieldHandler = (text, name) => {
    this.setState({
      [name]: text
    })
  }

  reset(){
    this.setState({
      name:"",
      picture:"",
      nutrition:"",
    })
  }


  submit = (e) => {
    e.preventDefault()
    console.log(this.state.name,this.state.picture, this.state.nutrition)

    fetch("http://192.168.2.184:3000/api/v1/ingredients", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ingredient:{
          name: `${this.state.name}`,
          picture: `${this.state.picture}`,
          nutrition: `${this.state.nutrition}`,
        }
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
      })


    this.reset()

    this.props.navigation.navigate('Add')

    Alert.alert("Added!",`Ingredient was added to the database`)
  }








  files = () => {
    Expo.FileSystem.downloadAsync('https://i.imgur.com/fvAPawE.jpg',
      Expo.FileSystem.documentDirectory + 'bread')
      .then(res => console.log(res))
    Expo.FileSystem.downloadAsync('https://i.imgur.com/29wfs82.jpg',
      Expo.FileSystem.documentDirectory + 'chicken')
      .then(res => console.log(res))
    Expo.FileSystem.downloadAsync('https://i.imgur.com/M96QQxn.jpg',
      Expo.FileSystem.documentDirectory + 'cheese')
      .then(res => console.log(res))
    Expo.FileSystem.downloadAsync('https://i.imgur.com/UeUNwgR.jpg',
      Expo.FileSystem.documentDirectory + 'noodles')
      .then(res => console.log(res))

  }


  render() {
    return (
      <View className="addForm">
        <Text>Name: </Text>
        <TextInput  style={{backgroundColor: 'white'}} value={ this.state.name } onChangeText={ (text) => this.TextInputFieldHandler(text, "name") }/>
        <Text>Picture: </Text>
        <TextInput style={{backgroundColor: 'white'}} value={ this.state.picture } onChangeText={ (text) => this.TextInputFieldHandler(text, "picture") } />
        <Text>Nutrition: </Text>
        <TextInput style={{backgroundColor: 'white'}} multiline = {true} numberOfLines={6} value={ this.state.nutrition } onChangeText={ (text) => this.TextInputFieldHandler(text, "nutrition") } ></TextInput>
      <Button onPress={ this.submit } title="Add Ingredient"/>


        <TouchableOpacity onPress={this.files}><Text style={{fontSize:30}}>filesystem</Text></TouchableOpacity>
        <TouchableOpacity onPress={this.filesfun}><Text>filsys funtimes</Text></TouchableOpacity>
        <Image source={{uri: 'https://i.vimeocdn.com/portrait/58832_300x300.jpg'}} style={{width: 300, height: 300}}/>
        <Image source={{uri: Expo.FileSystem.documentDirectory + 'pictures'}} style={{width: 300, height: 300}}/>
      </View>
    )
  }
}



export default AddIngredient;
