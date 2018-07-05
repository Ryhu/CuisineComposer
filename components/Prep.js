import React from 'react';
import PrepFridge from '../components/PrepFridge'
import PrepPlan from '../components/PrepPlan'
import { Button, View, Text, Image } from "react-native";


class Prep extends React.Component {

  render() {
    return (
      <View>
        <Text>Prep</Text>
        <Button onPress={ () => this.props.navigation.navigate('PrepFridge') } title="Fridge"></Button>
        <Button onPress={ () => this.props.navigation.navigate('PrepFridge') } title="Plan"></Button>
      </View>
    )
  }
}

export default Prep;
