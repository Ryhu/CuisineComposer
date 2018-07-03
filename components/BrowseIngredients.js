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

  showBrowseIngredientsMenu(){
    let filteredArr = this.filterSearch()
    return( <View id="browseIngredients">
      <Text>Search: </Text>
      <TextInput style={{backgroundColor: 'white'}} onChange={ this.filterHandler } title="Search" value={ this.state.filter }/>
      {filteredArr.map( (ingredient) => {
        return(<TouchableHighlight style={{backgroundColor: '#66a3ff', marginTop:5}} className="browseIngredient" onPress={ () => this.ingredientSwitch(ingredient) }>
          <Text>{ingredient.name}</Text>
        </TouchableHighlight>)
      })}
    </View>)
  }



  // returns filtered array
  filterSearch(){
    let arr = this.state.ingredientsdb.filter( (recipe) => {
      return (recipe.name.indexOf(this.state.filter) >= 0)
    })
    return arr
  }

  filterHandler = (e) => {
    this.setState({
      filter: e.target.value
    })
  }

  display(){
    if(this.state.screen === ""){
      return this.showBrowseIngredientsMenu()
    }
    else if (this.state.screen === "ingredient"){
      return <IngredientView ingredient={this.state.currentIngredient}/>
    }
  }


  ingredientSwitch = (ingredient) => {
    this.setState({
      screen: "ingredient",
      currentIngredient: ingredient
    })
  }

  render() {
    return (
       this.display()
    )
  }
}

export default BrowseIngredients;
