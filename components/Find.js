import React from 'react';
import FindResults from './FindResults'
import RecipeView from './RecipeView'
import { Button, ScrollView, Text, Image, TextInput, TouchableOpacity, View } from "react-native";
import styles from '../components/stylesheet'


class Find extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      screen: "",
      recipesdb: [],
      ingredientsdb: [],
      findReqs: [],
      filter: "",
      currentRecipe: null
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
          <TouchableOpacity key={keyVal} className="listedIngredient" onPress={ () => this.addToReqs(i)} style={styles.findIngredient}>
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
          <TouchableOpacity key={keyVal} className="findReqs"  onPress={ () => this.removeFromReqs(i)} style={{marginTop:5, height: 25,backgroundColor: 'powderblue'}}>
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

  render() {
    return (
      <ScrollView >
        <Text>Find</Text>
        <TextInput style={{backgroundColor: 'white'}} onChangeText={ (text) => this.setState({filter: text}) } value={ this.state.filter }/>
        <View >
          <Text>All Ingredients</Text>
          { this.renderFilteredIngredients()}
        </View>
        <View >
          <Text>Search For: </Text>
          { this.renderReqIngredients()}
        </View>
        <Button id="findButton" onPress={ this.getResult } title="Find"></Button>
        <Button id="findButton" onPress={ this.reset } title="Reset"></Button>
      </ScrollView>
    )
  }
}

export default Find;
