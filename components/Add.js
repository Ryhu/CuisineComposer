import React from 'react';
import AddIngredient from '../components/AddIngredient'
import AddRecipe from '../components/AddRecipe'
import { Button, View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import styles from '../components/stylesheet'




class Add extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.bigButton} onPress={() => this.props.navigation.navigate('AddIngredient')}><Text style={styles.bigButtonText}>Add Ingredient</Text></TouchableOpacity>
        <TouchableOpacity style={styles.bigButton} onPress={() => this.props.navigation.navigate('AddRecipe')}><Text style={styles.bigButtonText}>Add Recipe</Text></TouchableOpacity>
      </View>
    )
  }
}

export default Add;
