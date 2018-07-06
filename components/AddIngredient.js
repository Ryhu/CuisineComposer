import React from 'react';
import { Button, View, Text, Image, TextInput, Alert } from "react-native";


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

  render() {
    return (
      <View className="addForm">
        <Text>ingredients{"\n"}</Text>
        <Text>name: </Text>
        <TextInput  style={{backgroundColor: 'white'}} value={ this.state.name } onChangeText={ (text) => this.TextInputFieldHandler(text, "name") }/>
        <Text>picture: </Text>
        <TextInput style={{backgroundColor: 'white'}} value={ this.state.picture } onChangeText={ (text) => this.TextInputFieldHandler(text, "picture") } />
        <Text>nutrition: </Text>
        <TextInput style={{backgroundColor: 'white'}} multiline = {true}  value={ this.state.nutrition } onChangeText={ (text) => this.TextInputFieldHandler(text, "nutrition") } ></TextInput>
      <Button onPress={ this.submit } title="Add Ingredient"/>
      </View>
    )
  }
}

export default AddIngredient;
