import React from 'react';
import { Button, View, Text, Image, TextInput, StyleSheet } from "react-native";
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

  TextInputFieldHandler = (e) => {
    let key = e.target.dataset.name
    this.setState({
      [key]: e.target.value
    })
  }

  submit = (e) => {
    e.preventDefault()
    console.log(this.state.name,this.state.picture, this.state.nutrition)

    fetch("http://192.168.2.51:3000/api/v1/recipes", {
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


    this.setState({
      name:"",
      picture:"",
      nutrition:"",
    })

    this.props.messageAction("added recipe!")
  }



  render() {
    return (
      <View >
        <Text>recipe{"\n"}</Text>
        <Text>name: </Text>
        <TextInput style={{backgroundColor: 'white'}} value={ this.state.name }  onChange={ this.TextInputFieldHandler }/>
        <Text>time: </Text>
        <TextInput style={{backgroundColor: 'white'}} value={ this.state.time }  onChange={ this.TextInputFieldHandler }/>
        <Text>ingredients: </Text>
        <TextInput style={{backgroundColor: 'white'}} multiline = {true} value={ this.state.ingredients } onChange={ this.TextInputFieldHandler }></TextInput>
        <Text>directions: </Text>
        <TextInput style={{backgroundColor: 'white'}} multiline = {true} value={ this.state.directions }  onChange={ this.TextInputFieldHandler }></TextInput>
        <Button title="Add Recipe" onPress={ this.submit }/>
      </View>
    )
  }
}

export default AddRecipe;
