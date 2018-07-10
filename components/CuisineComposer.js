import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text, Button, StyleSheet } from 'react-native';


import Add from '../components/Add'
import AddIngredient from '../components/AddIngredient'
import AddRecipe from '../components/AddRecipe'

import Find from '../components/Find'
import FindResults from '../components/FindResults'

import Browse from '../components/Browse'
import BrowseIngredients from '../components/BrowseIngredients'
import BrowseRecipes from '../components/BrowseRecipes'

import Cart from '../components/Cart'
import CartActivate from '../components/CartActivate'
import CartEdit from '../components/CartEdit'

import Prep from '../components/Prep'
import PrepFridge from '../components/PrepFridge'
import PrepPlan from '../components/PrepPlan'

import RecipeView from '../components/RecipeView'
import IngredientView from '../components/IngredientView'

import { createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';


const FindStack = createStackNavigator({

  Find: {
    screen: () => <Find screenProps='bob' />,
    navigationOptions: () => ({
      title: "Find"
    }),
  },

  FindResults: {
    screen: FindResults,
    navigationOptions: () => ({
      title: "Results",
    }),
  },

  RecipeView: {
    screen: RecipeView,
    navigationOptions: () => ({
      title: "Recipe",
    }),
  },
},
{
  initialRouteName: 'Find',
});

const AddStack = createStackNavigator({
  Add: {
    screen: Add,
    navigationOptions: () => ({
      title: "Add",
    }),
  },
  AddIngredient: {
    screen: AddIngredient,
    navigationOptions: () => ({
      title: "Add Ingredient",
    }),
  },
  AddRecipe: {
    screen: AddRecipe,
    navigationOptions: () => ({
      title: "Add Recipe",
    }),
  },
},
{
  initialRouteName: 'Add',
});

const BrowseStack = createStackNavigator({
  Browse: {
    screen: Browse,
    navigationOptions: () => ({
      title: "Browse",
    }),
  },
  BrowseIngredients: {
    screen: BrowseIngredients,
    navigationOptions: () => ({
      title: "Browse Ingredients",
    }),
  },
  BrowseRecipes: {
    screen: BrowseRecipes,
    navigationOptions: () => ({
      title: "Browse Recipes",
    }),
  },
  RecipeView: {
    screen: RecipeView,
    navigationOptions: () => ({
      title: "Recipe",
    }),
  },
  IngredientView: {
    screen: IngredientView,
    navigationOptions: () => ({
      title: "Ingredient",
    }),
  },
},
{
  initialRouteName: 'Browse',
});

const CartStack = createStackNavigator({
  Cart: {
    screen: Cart,
    navigationOptions: () => ({
      title: "Cart",
    }),
  },
  CartActivate: {
    screen: CartActivate,
    navigationOptions: () => ({
      title: "Shopping List",
    }),
  },
  CartEdit: {
    screen: CartEdit,
    navigationOptions: () => ({
      title: "Edit List",
    }),
  },
},
{
  initialRouteName: 'Cart',
});

const PrepStack = createStackNavigator({
  Prep: {
    screen: Prep,
    navigationOptions: () => ({
      title: "Prep",
    }),
  },
  PrepFridge: {
    screen: PrepFridge,
    navigationOptions: () => ({
      title: "Fridge",
    }),
  },
  PrepPlan: {
    screen: PrepPlan,
    navigationOptions: () => ({
      title: "Plan",
    }),
  },
},
{
  initialRouteName: 'Prep',
});



export default createMaterialBottomTabNavigator({
  Find: FindStack,
  Add: AddStack,
  Browse: BrowseStack,
  Cart: CartStack,
  Prep: PrepStack,
},
{ navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;

        switch(routeName){
          case 'Find':
            iconName = `ios-search`;
            break;
          case 'Add':
            iconName = `md-add`;
            break;
          case 'Browse':
            iconName = `md-book`;
            break;
          case 'Cart':
            iconName = `md-cart`;
            break;
          case 'Prep':
            iconName = `md-calendar`;
            break;
        }
        // md-filing


        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
  shifting:false,
  labeled:true,
  initialRouteName: 'Add',
  activeTintColor: '#80ff80',
  inactiveTintColor: '#3e2465',
  barStyle: { backgroundColor: '#80ff80' },
});
