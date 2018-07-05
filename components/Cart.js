import React from 'react';
import CartActivate from "./CartActivate"
import CartEdit from "./CartEdit"
import { Button, View, Text } from "react-native";


class Cart extends React.Component {

  render() {
    return (
      <View>
        <Text>Cart</Text>
        <Button className="addButtons" onPress={ () => this.props.navigation.navigate('CartEdit') } title="edit Cart"></Button>
        <Button className="addButtons" onPress={ () => this.props.navigation.navigate('CartActivate') } title="Activate Cart"></Button>
      </View>
    )
  }
}

export default Cart;
