import React from 'react';
import FindResults from './FindResults'
import RecipeView from './RecipeView'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button, StyleSheet, ScrollView, Text, Image, TextInput, TouchableOpacity, View, Dimensions, Animated } from "react-native";
import styles from '../components/stylesheet'

const width = Dimensions.get('window').width

class Find extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      screen: "",
      recipesdb: [],
      ingredientsdb: [],
      findReqs: [],
      filter: "",
      currentRecipe: null,
      animated: new Animated.Value(0),
      shown:false,
    }

  }

  componentDidMount(){
    fetch("http://192.168.2.184:3000/api/v1/recipes")
      .then(res => res.json())
      .then(res => {
        let result = []
        //console.log(res)
        for (let i of res){
          result.push(i)
        }
        this.setState({
          recipesdb: result
        })
      })
      .catch(res => {console.log(res)})

    fetch("http://192.168.2.184:3000/api/v1/ingredients")
      .then(res => res.json())
      .then(res => {
        let result = []
        for (let i of res){
          result.push(i)
        }
        this.setState({
          ingredientsdb: result,
        })
      })
      .catch(res => {console.log(res)})
  }

  componentWillReceiveProps(){
    this.setState({
      screen: this.props.screen
    })
  }

  addToReqs(i){
    //adds clicked item to search requirements
    let reqs = this.state.findReqs
    reqs.push(i)
    console.log("hi!")
    //removes clicked item from items list
    let pos = this.state.ingredientsdb.indexOf(i)
    let tempList = this.state.ingredientsdb
    tempList.splice(pos,1)

    this.setState({
      findReqs: reqs,
      ingredientsdb: tempList
    })
  }

  removeFromReqs(i){
    //adds clicked item to search requirements
    let list = this.state.ingredientsdb
    list.push(i)

    //removes clicked item from items list
    let pos = this.state.findReqs.indexOf(i)
    let tempReqs = this.state.findReqs
    tempReqs.splice(pos,1)

    this.setState({
      ingredientsdb: list,
      findReqs: tempReqs,
    })
  }

  renderFilteredIngredients(){
    let filteredArr = this.filterSearch()
    return(<View style={styles.container}>
      { filteredArr.map( (i, keyVal) => {
        return(
          <TouchableOpacity key={keyVal} onPress={ () => this.addToReqs(i)} style={styles.findIngredient}>
            <Text style={styles.container}>{i.name}</Text>
          </TouchableOpacity>
        )
      })}
    </View>)
  }

  renderReqIngredients(){
    return(<View style={styles.container}>

      { this.state.findReqs.map( (i, keyVal) => {
        return(
          <TouchableOpacity key={keyVal} onPress={ () => this.removeFromReqs(i)} style={styles.reqIngredient}>
            <Text style={styles.container}>{i.name}</Text>
          </TouchableOpacity>
        )
      })}

    </View>)
  }

  // returns filtered array
  filterSearch(){
    let arr = this.state.ingredientsdb.filter( (ingredient) => {
      return (ingredient.name.indexOf(this.state.filter) >= 0)
    })

    return arr
  }

  reset = () => {
    let combined = this.state.ingredientsdb.concat(this.state.findReqs)
    this.setState({
      filter: "",
      findReqs: [],
      ingredientsdb: combined,
    })
  }

  getResult = () => {
    this.props.navigation.navigate('FindResults', {
      recipesdb:this.state.recipesdb,
      findReqs:this.state.findReqs,
      action:this.recipeSwitch
    })
  }

  toggleBar = () => {
    const newState = !this.state.shown
    this.setState({shown:newState})
    Animated.timing(this.state.animated,{
      toValue:newState?1:0,
      duration:250,
    }).start()
  }


  render() {

    const anistyles = StyleSheet.create({
      pullOutTab:{
        position:'absolute',
        height:600,
        width:300,
        backgroundColor:'green',
        position:'absolute',
        transform:[
          {
            translateX:this.state.animated.interpolate({
              inputRange:[0,1],
              outputRange:[-270,1]
            })
          }
        ],
        left:-1,
      }
    })

    return (
      <View>
        <ScrollView style={styles.findView}>
          <TextInput style={{backgroundColor: 'white'}} onChangeText={ (text) => this.setState({filter: text}) } value={ this.state.filter }/>
          <View >
            <Text>All Ingredients</Text>
            { this.renderFilteredIngredients()}
          </View>
        </ScrollView>

        <Animated.View style={anistyles.pullOutTab}>
          <ScrollView contentContainerStyle={[styles.container, {marginRight:30, paddingBottom:60}]}>
              <Text style={{color:'white', textAlign:'center', fontWeight:'bold', marginTop:30}}>Search for recipes with these Ingredients:</Text>
              { this.renderReqIngredients()}
              <TouchableOpacity style={styles.findReqButton} onPress={ this.getResult }>
                <Text style={{color:'white'}}>Find</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.findReqButton} onPress={ this.reset }>
                <Text style={{color:'white'}}>Reset</Text>
              </TouchableOpacity>
          </ScrollView>
          <TouchableOpacity onPress={this.toggleBar} style={styles.pullOutTrigger}>
            <Ionicons name='md-send' />
            <Ionicons name='md-send' />
            <Ionicons name='md-send' />
          </TouchableOpacity>
        </Animated.View>











      </View>
    )
  }
}

export default Find;
