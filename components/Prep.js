import React from 'react';
import PrepFridge from '../components/PrepFridge'
import PrepPlan from '../components/PrepPlan'
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
      case "fridge":
        return <PrepFridge messageAction={ this.changeMessage } />
      case "plan":
        return <PrepPlan messageAction={ this.changeMessage } />

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
        <Text>Prep</Text>
        <Button className="addButtons" onPress={ () => this.setScreen('fridge') } title="Fridge"></Button>
        <Button className="addButtons" onPress={ () => this.setScreen('plan') } title="Plan"></Button>
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
