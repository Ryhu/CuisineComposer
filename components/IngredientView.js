import React from 'react';
import { Button, View, Text, Image, Alert } from "react-native";
import styles from '../components/stylesheet'

class IngredientView extends React.Component {

  addToCart = (ingredient) => {
    console.log(ingredient)
    fetch(`http://192.168.2.184:3000/api/v1/shopping_cart_ingredients`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        item:{
          ingredient_id: `${ingredient.id}`,
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
      Alert.alert("Added!", "Ingredient Added to Cart!")
  }

  addToFridge = (ingredient) => {
    console.log(ingredient)
    fetch(`http://192.168.2.184:3000/api/v1/fridge_ingredients`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        item:{
          ingredient_id: `${ingredient.id}`,
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
      Alert.alert("Added!", "Ingredient Added to Fridge!")
  }

  render(){
    let ingredient = this.props.navigation.getParam('ingredient')
    console.log(ingredient)
    return(
      <View className="recipeScreen" styles={{alignItems:'center'}}>
        <Text style={[styles.recipeHeader,{textAlign:'center'}]}>{ ingredient.name }</Text>
        <View styles={styles.container}><Image source={{uri: Expo.FileSystem.documentDirectory + ingredient.name}} style={{width: 200, height: 200}}/></View>
        <Button title="Add To Cart" onPress={ () => this.addToCart(ingredient)}></Button>
        <Button title="Add To Fridge" onPress={ () => this.addToFridge(ingredient)}></Button>
      </View>
    )
  }

}

export default IngredientView;
