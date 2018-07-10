import React from 'react';
import { Button, View, Text, Image, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import styles from '../components/stylesheet'


class CartActivate extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      ingredientsdb: [],
    }

  }

  componentDidMount(){
    fetch("http://192.168.2.184:3000/api/v1/shopping_carts")
      .then(res => res.json())
      .then(res => {
        let result = []
        for (let i of res[0].shopping_cart_ingredients){
          let ingredient = Object.assign({amount: i.amount, inCart: false, join_id: i.id}, i.ingredient)
          result.push(ingredient)
        }

        this.setState({
          ingredientsdb: result
        })
      })
  }

  touchIngredient(ingredient){
    let tempdb = this.state.ingredientsdb
    let pos = tempdb.indexOf(ingredient)
    let boo = !tempdb[pos].inCart
    tempdb[pos].inCart = boo

    this.setState({
      ingredientsdb: tempdb
    })
  }

  massAddToFridge = () => {
    const ingredients = [...this.state.ingredientsdb]
    //this.addToFridge(this.state.ingredientsdb[0])
    for (let ingredient of ingredients){
      this.addToFridge(ingredient)
      this.deleteFromCart(ingredient)
    }
    Alert.alert("Added!", "Ingredients Added to Fridge!")
  }
  addToFridge = (ingredient) => {
    fetch(`http://192.168.2.184:3000/api/v1/fridge_ingredients`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        item:{
          ingredient_id: `${ingredient.id}`,
          fridge_id: 1,
          amount: ingredient.amount ,
        }
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
      })
          // NEEDS TO CHANGE TO PROPER DYNAMIC AMOUNT
  }

  deleteFromCart(ingredient){
    let tempIngredients = this.state.ingredientsdb
    let pos = tempIngredients.indexOf(ingredient)
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

    this.setState({
      ingredientsdb: tempIngredients
    })

  }

  showCart(){
    return(

      <ScrollView>

        <View style={styles.container}>
          <Text style={{fontSize:20, fontWeight:'bold'}}>Need to Buy:</Text>
          {this.state.ingredientsdb.map( (ingredient, keyVal) => {
            if(!ingredient.inCart){
              return(
                  <TouchableOpacity key={keyVal} onPress={() => this.touchIngredient(ingredient)} style={[styles.findIngredient,{justifyContent:'center'}]}>
                    <Image source={{uri: Expo.FileSystem.documentDirectory + ingredient.name}} style={{width: 300, height: 50, position:'absolute'}}/>
                    <Text style={styles.overImageText}>{ingredient.name + ': ' + ingredient.amount}</Text>
                  </TouchableOpacity>
              )
            }
          })}
        </View>

        <View style={styles.container}>
          <Text style={{fontSize:20, fontWeight:'bold'}}>In Cart:</Text>
          {this.state.ingredientsdb.map( (ingredient, keyVal) => {
            if(ingredient.inCart){
              return(
                <TouchableOpacity key={keyVal} onPress={() => this.touchIngredient(ingredient)} style={[styles.findIngredient,{justifyContent:'center', backgroundColor:'#993333'}]}>
                  <Image source={{uri: Expo.FileSystem.documentDirectory + ingredient.name}} style={{width: 300, height: 50, position:'absolute', opacity:.3}}/>
                  <Text style={[styles.overImageText]}>{ingredient.name + ': ' + ingredient.amount}</Text>
                </TouchableOpacity>
              )
            }
          })}
        </View>

        <Button title="Add All To Fridge" onPress={this.massAddToFridge} ></Button>

      </ScrollView>)
  }


  render() {
    return (
       this.showCart()
    )
  }
}

export default CartActivate;
