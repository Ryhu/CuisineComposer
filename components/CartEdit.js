import React from 'react';
import { Button, View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import styles from '../components/stylesheet'

class CartEdit extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      ingredientsdb: [],
    }
  }

  componentDidMount(){
    this.getData()
  }

  componentWillReceiveProps(){
    this.getData()
  }

  getData(){
    fetch("http://192.168.2.184:3000/api/v1/shopping_carts")
      .then(res => res.json())
      .then(res => {
        let result = []
        for (let i of res[0].shopping_cart_ingredients){
          let ingredient = Object.assign({amount: i.amount, join_id: i.id}, i.ingredient)
          result.push(ingredient)
        }

        this.setState({
          ingredientsdb: result
        })
      })
  }

  handleMath(op, ingredient){
    let tempIngredients = this.state.ingredientsdb
    let pos = tempIngredients.indexOf(ingredient)

    //handle operations, + or -
    let value = ingredient.amount
    if (op === "-"){
      value--
    }else{
      value++
    }
    tempIngredients[pos].amount = value


    if (value <= 0 ){
      //delete from state of client
      tempIngredients.splice(pos, 1)
      //delete from the DB
      fetch(`http://192.168.2.184:3000/api/v1/shopping_cart_ingredients/${ingredient.join_id}`, {
        method: "DELETE",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(res => {
          console.log(res)
        })
    }
    else{
      //edit the DB
      fetch(`http://192.168.2.184:3000/api/v1/shopping_cart_ingredients/${ingredient.join_id}`, {
        method: "PATCH",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          item:{
            id: `${ingredient.join_id}`,
            amount: `${value}`,
          }
        })
      })
        .then(res => res.json())
        .then(res => {
          // console.log(res)
        })
    }

    //set the state, at the end because one of the db calls runs a state change
    this.setState({
      ingredientsdb: tempIngredients
    })
  }




  renderIngredients(){
    return(<ScrollView contentContainerStyle={styles.container}>
      {this.state.ingredientsdb.map( (ingredient, keyVal) => {
        return(
            <View key={keyVal} onPress={ () => this.addToReqs(i)} style={styles.findIngredient}>
              <Image source={{uri: Expo.FileSystem.documentDirectory + ingredient.name}} style={{width: 300, height: 50, position:'absolute'}}/>
              <TouchableOpacity style={[styles.container, {width: 50, height: 50, backgroundColor:'transparent'}]} onPress={ () => this.handleMath("-", ingredient) }><Text style={[styles.overImageText, {fontSize:20}]}>-</Text></TouchableOpacity>
              <Text style={styles.overImageText}>{ingredient.name + ': ' + ingredient.amount}</Text>
              <TouchableOpacity style={[styles.container, {width: 50, height: 50, backgroundColor:'transparent'}]} onPress={ () => this.handleMath("+", ingredient) }><Text style={[styles.overImageText, {fontSize:20}]}>+</Text></TouchableOpacity>
            </View>
        )
      })}
    </ScrollView>)
  }
  //          <Button>-</Button>

  render() {
    return this.renderIngredients()
  }
}

export default CartEdit;
