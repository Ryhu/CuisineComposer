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

  renderFilteredIngredients(){
    let filteredArr = this.filterSearch()
    return(<View style={styles.container}>
      { filteredArr.map( (i, keyVal) => {
          return(
            <TouchableOpacity key={keyVal} onPress={ () => this.addToReqs(i)} style={styles.findIngredient}>
              <Image source={{uri: Expo.FileSystem.documentDirectory + i.name}} style={{width: 300, height: 50}}/>
              <Text style={[styles.container,{
                textShadowColor: 'black',
                textShadowOffset: {width: -1, height: 1},
                textShadowRadius: 10,
                color:'white',
                paddingLeft:5,
                paddingRight:5,
                position:'absolute',
              }]}>{i.name}</Text>
            </TouchableOpacity>
          )

      })}
    </View>)
  }


  renderIngredients(){
    return(<ScrollView>
      {this.state.ingredientsdb.map( (ingredient, keyVal) => {
        return(
          <TouchableOpacity key={keyVal} onPress={ () => this.addToReqs(i)} style={styles.findIngredient}>
            <Image source={{uri: Expo.FileSystem.documentDirectory + i.name}} style={{width: 300, height: 50}}/>
            <TouchableOpacity onPress={ () => this.handleMath("-", ingredient) }><Text>-</Text></TouchableHighlight>
            <Text style={[styles.container,{
              textShadowColor: 'black',
              textShadowOffset: {width: -1, height: 1},
              textShadowRadius: 10,
              color:'white',
              paddingLeft:5,
              paddingRight:5,
              position:'absolute',
            }]}>{ingredient.name + ': ' + ingredient.amount}}</Text>
            <TouchableOpacity onPress={ () => this.handleMath("+", ingredient) }><Text>+</Text></TouchableOpacity>
            </TouchableOpacity>
          </TouchableOpacity>
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
