import React from 'react';
import { Button, View, Text, Image, TextInput } from "react-native";


class AddIngredient extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      name:"",
      picture:"",
      nutrition:"",
    }

  }

  TextInputFieldHandler = (e) => {
    console.log("im am e")
    console.log(e.target)
    console.log(e.target.title)
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


    this.setState({
      name:"",
      picture:"",
      nutrition:"",
    })

    this.props.messageAction("added ingredient!")
  }

  render() {
    return (
      <View className="addForm">
        <Text>ingredients{"\n"}</Text>
        <Text>name: </Text>
        <TextInput  style={{backgroundColor: 'white'}} value={ this.state.name } name="name" onChange={ () => this.TextInputFieldHandler("name") }/>
        <Text>picture: </Text>
        <TextInput style={{backgroundColor: 'white'}} value={ this.state.picture } title="picture" onChange={ this.TextInputFieldHandler } />
        <Text>nutrition: </Text>
        <TextInput style={{backgroundColor: 'white'}} multiline = {true}  value={ this.state.nutrition } data-name="nutrition" onChange={ this.TextInputFieldHandler } ></TextInput>
      <Button onPress={ this.submit } title="Add Ingredient"/>
      </View>
    )
  }
}

export default AddIngredient;
