import React from 'react';
import AddIngredient from '../components/AddIngredient'
import AddRecipe from '../components/AddRecipe'
import { Button, View, Text, Image, TouchableOpacity, Dimensions, Alert, AsyncStorage, ScrollView } from "react-native";
import styles from '../components/stylesheet'
import Expo from 'expo'


class Add extends React.Component {

  // constructor(props){
  //   super(props)
  //
  //   this.state = {
  //     imgURI: null
  //   }
  // }
  //
  // async storeStuff(){
  //   try {
  //     await AsyncStorage.setItem('meatballs', 'yummy');
  //     Alert.alert("stuff worked!")
  //   } catch (error) {
  //     Alert.alert("problem storin")
  //   }
  // }
  //
  // async showStuff(){
  //   try {
  //     const value = await AsyncStorage.getItem('meatballs');
  //     Alert.alert(`stuff worked, here is your ${value}`)
  //   } catch (error) {
  //     Alert.alert("problem storin")
  //   }
  // }
  // <TouchableOpacity onPress={this.storeStuff}><Text>seed data</Text></TouchableOpacity>
  // <TouchableOpacity onPress={this.showStuff}><Text>show me da wae</Text></TouchableOpacity>

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
