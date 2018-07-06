import React from 'react';
import PrepFridge from '../components/PrepFridge'
import PrepPlan from '../components/PrepPlan'
import { TouchableOpacity, View, Text, Image } from "react-native";
import styles from '../components/stylesheet'

class Prep extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.bigButton} onPress={() => this.props.navigation.navigate('PrepFridge')}><Text style={styles.bigButtonText}>Fridge</Text></TouchableOpacity>
        <TouchableOpacity style={styles.bigButton} onPress={() => this.props.navigation.navigate('PrepPlan')}><Text style={styles.bigButtonText}>Plan</Text></TouchableOpacity>
      </View>
    )
  }
}

export default Prep;
