import React from 'react';
import IngredientView from './IngredientView'
import { Button, View, Text, Image, TextInput, TouchableHighlight } from "react-native";

class BrowseIngredients extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      screen: "",
      ingredientsdb: [],
      filter: "",
      currentIngredient: null,
    }

  }

  //sets up the temp recipes db
  componentDidMount(){
    fetch("http://192.168.2.184:3000/api/v1/ingredients")
      .then(res => res.json())
      .then(res => {

        let result = []
        for (let i of res){
          result.push(i)
        }

        this.setState({
          ingredientsdb: result
        })
      })
  }

  // returns filtered array
  filterSearch(){
    let arr = this.state.ingredientsdb.filter( (recipe) => {
      return (recipe.name.indexOf(this.state.filter) >= 0)
    })
    return arr
  }

  ingredientSwitch = (ingredient) => {
    this.props.navigation.navigate('IngredientView', { ingredient: ingredient})
  }


  render() {
    let filteredArr = this.filterSearch()
    return ( <View id="browseIngredients">
      <Text>Search: </Text>
      <TextInput style={{backgroundColor: 'white'}} onChangeText={ (text) => this.setState({filter: text}) } title="Search" value={ this.state.filter }/>
      {filteredArr.map( (ingredient, keyVal) => {
        return(<TouchableHighlight key={keyVal} style={{backgroundColor: '#66a3ff', marginTop:5}} className="browseIngredient" onPress={ () => this.ingredientSwitch(ingredient) }>
          <Text>{ingredient.name}</Text>
        </TouchableHighlight>)
      })}
    </View>)
  }
}

export default BrowseIngredients;
