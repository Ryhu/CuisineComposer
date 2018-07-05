import React from 'react';
import RecipeView from './RecipeView'
import BrowseRecipes from './BrowseRecipes'
import BrowseIngredients from './BrowseIngredients'
import { Button, View, Text, Image } from "react-native";

class Browse extends React.Component {

  render() {
    return (
      <View>
        <Text>Browse</Text>
        <Button onPress={ () => this.props.navigation.navigate('BrowseIngredients') } title="Browse Ingredients"></Button>
        <Button onPress={ () => this.props.navigation.navigate('BrowseRecipes') } title="Browse Recipes"></Button>
      </View>
    )
  }
}

export default Browse;
