import React from 'react';
import { Button, View, Text, Image } from "react-native";


class RecipeView extends React.Component {

  ingredientsSpreader(ingredients){
    return(<View className="recipeIngredients">

      {ingredients.map( (ingredient) => {
        return(
          <Text>{ingredient.name}</Text>
        )
      })}

    </View>)
  }

  massAddToCart = () => {
    for (let ingredient of this.props.recipe.ingredients){
      this.addToCart(ingredient)
    }
  }

  addToCart = (ingredient) => {
    console.log(ingredient)
    fetch(`http://192.168.2.51:3000/api/v1/shopping_cart_ingredients`, {
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
    return(
      <View className="recipeScreen">
        <Text>Im recipe viewer!</Text>
        <Text>{ this.props.recipe.name}</Text>
        <Text>{ this.props.recipe.time}</Text>
        {this.ingredientsSpreader(this.props.recipe.ingredients)}
        <Text>{ this.props.recipe.directions}</Text>
        <Button title="Add To Cart" onPress={this.massAddToCart}></Button>
      </View>
    )
  }

}

export default RecipeView;
