import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
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
  Find: Find,
  FindResults: FindResults,
  RecipeView: RecipeView,
},
{
  initialRouteName: 'Find',
});

const AddStack = createStackNavigator({
  Add: Add,
  AddIngredient: AddIngredient,
  AddRecipe: AddRecipe,
},
{
  initialRouteName: 'Add',
});

const BrowseStack = createStackNavigator({
  Browse: Browse,
  BrowseIngredients: BrowseIngredients,
  BrowseRecipes: BrowseRecipes,
  RecipeView: RecipeView,
  IngredientView: IngredientView,
},
{
  initialRouteName: 'Browse',
});

const CartStack = createStackNavigator({
  Cart: Cart,
  CartActivate: CartActivate,
  CartEdit: CartEdit,
},
{
  initialRouteName: 'Cart',
});

const PrepStack = createStackNavigator({
  Prep: Prep,
  PrepFridge: PrepFridge,
  PrepPlan: PrepPlan,
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
