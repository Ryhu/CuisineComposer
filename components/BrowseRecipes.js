import React from 'react';
import RecipeView from './RecipeView'
import { Button, View, Text, Image, TextInput, TouchableHighlight } from "react-native";

class BrowseRecipes extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      screen: "",
      recipesdb: [],
      filter: "",
      currentRecipe: null,
    }

  }

  //sets up the temp recipes db
  componentDidMount(){
    fetch("http://192.168.2.184:3000/api/v1/recipes")
      .then(res => res.json())
      .then(res => {

        let result = []
        for (let i of res){
          result.push(i)
        }

        this.setState({
          recipesdb: result
        })
      })
  }

  // returns filtered array
  filterSearch(){
    let arr = this.state.recipesdb.filter( (recipe) => {
      return (recipe.name.indexOf(this.state.filter) >= 0)
    })
    return arr
  }

  recipeSwitch(recipe){
    this.props.navigation.navigate('RecipeView',{recipe: recipe})
  }

  render() {
    let filteredArr = this.filterSearch()
    return( <View id="browseRecipes">
    <Text>Search: </Text>
    <TextInput style={{backgroundColor: 'white'}} onChangeText={ (text) => this.setState({filter: text}) } value={ this.state.filter }/>
      {filteredArr.map( (recipe, keyVal) => {
        return(<TouchableHighlight key={keyVal} style={{backgroundColor: '#66a3ff', marginTop:5}} className="browseRecipe" onPress={ () => this.recipeSwitch(recipe) }>
          <Text>{recipe.name}</Text>
        </TouchableHighlight>)
      })}
    </View>)
  }
}

export default BrowseRecipes;
