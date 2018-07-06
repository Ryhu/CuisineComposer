import React from 'react';
import { Button, View, Text, Image, Alert } from "react-native";


class RecipeView extends React.Component {

  ingredientsSpreader(ingredients){
    return(<View className="recipeIngredients">

      {ingredients.map( (ingredient, keyVal) => {
        return(
          <Text key={keyVal}>{ingredient.name}</Text>
        )
      })}

    </View>)
  }

  massAddToCart = () => {
    for (let ingredient of recipe.ingredients){
      this.addToCart(ingredient)
    }
    Alert.alert("Added!", "Ingredients Added to Cart!")
  }

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
  }

  render(){

    recipe = this.props.navigation.getParam('recipe')

    return(
      <View className="recipeScreen">
        <Text>Im recipe viewer!</Text>
        <Text>{ recipe.name}</Text>
        <Text>{ recipe.time}</Text>
        {this.ingredientsSpreader(recipe.ingredients)}
        <Text>{ recipe.directions}</Text>
        <Button title="Add To Cart" onPress={this.massAddToCart}></Button>
      </View>
    )
  }

}

export default RecipeView;
