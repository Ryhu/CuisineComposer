import React from 'react';
import { Button, View, Text, Image } from "react-native";


class IngredientView extends React.Component {

  addToCart = () => {
    console.log(this.props.ingredient)
    fetch(`http://192.168.2.184:3000/api/v1/shopping_cart_ingredients`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        item:{
          ingredient_id: `${this.props.ingredient.id}`,
          shopping_cart_id: 1,
          amount: 1,
        }
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
      })
          // NEEDS TO CHANGE TO PROPER DYNAMIC AMOUNT
  }

  addToFridge = () => {
    console.log(this.props.ingredient)
    fetch(`http://192.168.2.184:3000/api/v1/fridge_ingredients`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        item:{
          ingredient_id: `${this.props.ingredient.id}`,
          fridge_id: 1,
          amount: 1,
        }
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
      })
          // NEEDS TO CHANGE TO PROPER DYNAMIC AMOUNT
  }

  render(){
    return(
      <View className="recipeScreen">
        <Text>ingredient viewer!</Text>
        <Text>{ this.props.ingredient.name }</Text>
        <Text>{ this.props.ingredient.picture }</Text>
        <Text>{ this.props.ingredient.nutrition }</Text>
        <Button title="Add To Cart" onPress={this.addToCart}></Button>
        <Button title="Add To Fridge" onPress={this.addToFridge}></Button>
      </View>
    )
  }

}

export default IngredientView;
