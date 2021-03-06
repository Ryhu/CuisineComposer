import React from 'react';
import { Button, View, Text, Image, TextInput, StyleSheet, Alert, ScrollView } from "react-native";
const styles = StyleSheet.create({
  multiline:{
    backgroundColor: 'white',
  }
})

class AddRecipe extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      screen: "",
      name: "",
      time: "",
      ingredients: "",
      directions: "",
    }

  }

  TextInputFieldHandler = (text, name) => {
    this.setState({
      [name]: text
    })
  }

  reset(){
    this.setState({
      screen: "",
      name: "",
      time: "",
      ingredients: "",
      directions: "",
    })
  }

  submit = (e) => {
    e.preventDefault()
    console.log(this.state.name,this.state.picture, this.state.nutrition)

    fetch("http://192.168.2.184:3000/api/v1/recipes", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        recipe:{
          name: `${this.state.name}`,
          time: `${this.state.time}`,
          ingredients: `${this.state.ingredients}`,
          directions: `${this.state.directions}`,
        }
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
      })

    this.reset()

    this.props.navigation.navigate('Add')

    Alert.alert("Added!",`Recipe was added to the database`)
  }



  render() {
    return (
      <ScrollView contentContainerStyle={{paddingBottom:250}}>
        <Text>Name: </Text>
        <TextInput style={{backgroundColor: 'white'}} value={ this.state.name }  onChangeText={ (text) => this.TextInputFieldHandler(text, "name") }/>
        <Text>Time: </Text>
        <TextInput style={{backgroundColor: 'white'}} value={ this.state.time }  onChangeText={ (text) => this.TextInputFieldHandler(text, "time") }/>
        <Text>Ingredients: </Text>
        <TextInput style={{backgroundColor: 'white'}} multiline = {true} numberOfLines={6} value={ this.state.ingredients } onChangeText={ (text) => this.TextInputFieldHandler(text, "ingredients") }></TextInput>
        <Text>Directions: </Text>
        <TextInput style={{backgroundColor: 'white'}} multiline = {true} numberOfLines={6} value={ this.state.directions }  onChangeText={ (text) => this.TextInputFieldHandler(text, "directions") }></TextInput>
        <Button title="Add Recipe" onPress={ this.submit }/>
      </ScrollView>
    )
  }
}

export default AddRecipe;
