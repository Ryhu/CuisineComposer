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
    return (
      <View>
        <Text>Add</Text>
        <Button className="addButtons" onPress={() => this.props.navigation.navigate('AddIngredient')} title="add Ingredient"></Button>
        <Button className="addButtons" onPress={() => this.props.navigation.navigate('AddRecipe')} title="add Recipe"></Button>
        {this.messageDisplay()}
      </View>
    )
  }
}

export default Add;
