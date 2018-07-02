import React from 'react';
import AddIngredient from '../components/AddIngredient'
import AddRecipe from '../components/AddRecipe'
import { Button, View, Text, Image } from "react-native";

class Add extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      screen: "",
      message: ""
    }

  }


  componentWillReceiveProps(){
    this.setState({
      screen: this.props.screen
    })
  }

  display = () => {
    switch(this.state.screen){
      case "":
        return this.showMainMenu()
      case "ingredient":
        return <AddIngredient messageAction={ this.changeMessage } />
      case "recipe":
        return <AddRecipe messageAction={ this.changeMessage } />

      default:
        console.log("failed the switch")
    }
  }

  setScreen = (word) => {
    this.setState({
      screen: word
    })
  }

  showMainMenu(){
    return (
      <View>
        <Text>Add</Text>
        <Button className="addButtons" onPress={ () => this.setScreen('ingredient') } title="add Ingredient"></Button>
        <Button className="addButtons" onPress={ () => this.setScreen('recipe') } title="add Recipe"></Button>
        {this.messageDisplay()}
      </View>
    )
  }


  messageDisplay(){
    return(
      <View>{this.state.message === "" ? null : <Text>{this.state.message}</Text>}</View>
    )
  }

  changeMessage = (message) => {
    this.setState({
      message: message,
      screen: ""
    })
  }

  render() {
    return  this.display()
  }
}

export default Add;
