import React from 'react';
import CartActivate from "./CartActivate"
import CartEdit from "./CartEdit"
import { TouchableOpacity, View, Text } from "react-native";
import styles from '../components/stylesheet'

class Cart extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.bigButton} onPress={() => this.props.navigation.navigate('CartEdit')}><Text style={styles.bigButtonText}>Edit Cart</Text></TouchableOpacity>
        <TouchableOpacity style={styles.bigButton} onPress={() => this.props.navigation.navigate('CartActivate')}><Text style={styles.bigButtonText}>List</Text></TouchableOpacity>
      </View>
    )
  }
}

export default Cart;
