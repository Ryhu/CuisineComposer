import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import Add from '../components/Add'
import Find from '../components/Find'
import Browse from '../components/Browse'
import Cart from '../components/Cart'
import Prep from '../components/Prep'
const styles = StyleSheet.create({
  bigblue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
});

class CuisineComposer extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      screen: ""
    }

  }

  setScreen = (word) => {
    this.setState({
      screen: word
    })
  }


  showMainMenu = () => {
    return (<View style={styles.container}>
      <Button title="find" className="mainMenuButton" onPress={ () => this.setScreen('find')} style={styles.bigblue}> find</Button>
      <Button title="add" className="mainMenuButton" onPress={ () => this.setScreen('add')}> add</Button>
      <Button title="browse" className="mainMenuButton" onPress={ () => this.setScreen('browse')}> browse</Button>
      <Button title="cart" className="mainMenuButton" onPress={ () => this.setScreen('cart')}> cart</Button>
      <Button title="prep" className="mainMenuButton" onPress={ () => this.setScreen('prep')}> prep</Button>
    </View>)
  }

  display(){
    switch(this.state.screen){

      case "":
        return this.showMainMenu()
      case "add":
        return <Add screen="" />
      case "find":
        return <Find screen="" />
      case "browse":
        return <Browse screen="" />
      case "cart":
        return <Cart screen="" />
      case "prep":
        return <Prep screen="" />
      default:
        console.log("failed the switch")
    }
  }


  render() {
    return (<View >
      <View id="display">{ this.display() }</View>

      <View className="footer">{this.showMainMenu()}</View>
      </View>
    )
  }
}

export default CuisineComposer;
