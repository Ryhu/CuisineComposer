import React from 'react';
import CartActivate from "./CartActivate"
import CartEdit from "./CartEdit"
import { Button, View, Text, Image } from "react-native";


class Cart extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      screen: ""
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
      case "edit":
        return <CartEdit />
      case "activate":
        return <CartActivate />

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
        <Text>Cart</Text>
        <Button className="addButtons" onPress={ () => this.setScreen('edit') } title="edit Cart"></Button>
        <Button className="addButtons" onPress={ () => this.setScreen('activate') } title="Activate Cart"></Button>
      </View>
    )
  }

  render() {
    return  this.display()
  }
}

export default Cart;
