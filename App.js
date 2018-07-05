import React, { Component } from 'react';
import CuisineComposer from './components/CuisineComposer.js'
import { ScrollView, Text, Image, View, Button } from "react-native";
import { createStackNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from 'react-navigation';

export default class AppScreen extends Component {
  render() {
    return (
        <CuisineComposer />
    );
  }
}
