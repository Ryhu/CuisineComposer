import React from 'react';
import FindResults from './FindResults'
import RecipeView from './RecipeView'
import { Button, View, Text, Image, TextInput, TouchableHighlight } from "react-native";

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
    fetch("http://192.168.2.51:3000/api/v1/recipes")
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

    fetch("http://192.168.2.51:3000/api/v1/ingredients")
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
    return(<View className="listedIngredientBox">
      { filteredArr.map( (i) => {
        return(
          <TouchableHighlight className="listedIngredient" onPress={ () => this.addToReqs(i)} style={{marginTop:5, height: 25, backgroundColor: 'powderblue'}}>
            <Text>{i.name}</Text>
          </TouchableHighlight>
        )
      })}
    </View>)
  }

  renderReqIngredients(){
    return(<View className="findReqsBox">

      { this.state.findReqs.map( (i) => {
        return(
          <TouchableHighlight className="findReqs"  onPress={ () => this.removeFromReqs(i)} style={{marginTop:5, height: 25,backgroundColor: 'powderblue'}}>
            <Text>{i.name}</Text>
          </TouchableHighlight>
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

  filterHandler = (e) => {
    this.setState({
      filter: e.target.value
    })
  }

  startSearch = () => {
    this.setState({
      screen: "results"
    })
  }

  reset = () => {
    let combined = this.state.ingredientsdb.concat(this.state.findReqs)
    this.setState({
      filter: "",
      findReqs: [],
      ingredientsdb: combined,
    })
  }

  showSearchMenu(){
    return (
      <View id="findBox">
        <Text>Find</Text>
        <TextInput style={{backgroundColor: 'white'}} onChange={ this.filterHandler } value={ this.state.filter }/>
        <View id="itemsListBox">
          <Text>All Ingredients</Text>
          { this.renderFilteredIngredients()}
        </View>
        <View id="reqBox">
          <Text>Search For: </Text>
          { this.renderReqIngredients()}
        </View>
        <Button id="findButton" onPress={ this.startSearch } title="Find"></Button>
        <Button id="findButton" onPress={ this.reset } title="Reset"></Button>
      </View>
    )
  }

  recipeSwitch = (recipe) => {
    this.setState({
      screen: "recipe",
      currentRecipe: recipe
    })
  }

  display(){
    if(this.state.screen === ""){
      return this.showSearchMenu()
    }
    else if (this.state.screen === "results"){
      return <FindResults recipesdb={this.state.recipesdb} findReqs={this.state.findReqs} action={this.recipeSwitch}/>
    }
    else if (this.state.screen === "recipe"){
      return <RecipeView recipe={this.state.currentRecipe}/>
    }
  }

  render() {
    return (
       this.display()
    )
  }
}

export default Find;
