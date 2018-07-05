import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import Add from '../components/Add'
import AddIngredient from '../components/AddIngredient'
import AddRecipe from '../components/AddRecipe'

import Find from '../components/Find'
import FindResults from '../components/FindResults'

import Browse from '../components/Browse'
import Cart from '../components/Cart'
import Prep from '../components/Prep'
import { createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';



const AddStack = createStackNavigator({
  Add: Add,
  AddIngredient: AddIngredient,
  AddRecipe: AddRecipe,
},
{
  initialRouteName: 'Add',
});

const FindStack = createStackNavigator({
  Find: Find,
  FindResults: FindResults,
},
{
  initialRouteName: 'Find',
});





export default createMaterialBottomTabNavigator({
  Find: Find,
  Add: AddStack,
  Browse: Browse,
  Cart: Cart,
  Prep: Prep,
}, {
  shifting:false,
  labeled:true,
  initialRouteName: 'Add',
  activeTintColor: '#80ff80',
  inactiveTintColor: '#3e2465',
  barStyle: { backgroundColor: '#80ff80' },
});
