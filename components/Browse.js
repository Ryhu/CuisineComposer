import React from 'react';
import RecipeView from './RecipeView'
import BrowseRecipes from './BrowseRecipes'
import BrowseIngredients from './BrowseIngredients'
import { TouchableOpacity, View, Text, Image } from "react-native";
import styles from '../components/stylesheet'

class Browse extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>Browse</Text>
        <TouchableOpacity style={styles.bigButton} onPress={() => this.props.navigation.navigate('BrowseIngredients')}><Text style={styles.bigButtonText}>Browse{"\n"}Ingredients</Text></TouchableOpacity>
        <TouchableOpacity style={styles.bigButton} onPress={() => this.props.navigation.navigate('BrowseRecipes')}><Text style={styles.bigButtonText}>Browse Recipes</Text></TouchableOpacity>
      </View>
    )
  }
}

export default Browse;
