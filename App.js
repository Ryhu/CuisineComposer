import React, { Component } from 'react';
import CuisineComposer from './containers/CuisineComposer.js'
import { ScrollView, Text, Image } from "react-native";


class App extends Component {
  render() {
    return (
      <ScrollView className="App" style={{backgroundColor: '#b3ffb3'}}>
        <ScrollView className="App-header">
          <Image source={require('./logo.svg')} />
          <Text className="App-title">Welcome to React</Text>
        </ScrollView>

        <CuisineComposer />
      </ScrollView>
    );
  }
}

export default App;
