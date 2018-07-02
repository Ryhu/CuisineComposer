import React from 'react';
import { Button, View, Text, Image, TouchableHighlight, StyleSheet } from "react-native";
const styles = StyleSheet.create({
  recipe: {
    marginTop:5,
    backgroundColor:"red"
  },
});

class FindResults extends React.Component {

  renderRecipes(){
    let list = this.reqFilter()
    return(<View>
      { list.map( (i) => {
        return(<TouchableHighlight style={styles.recipe} className="recipeBox" onPress={ () => this.props.action(i) }>
        <View>
          <Text>{i.name}</Text>
          <Text>{i.time}</Text>
          <Text>{i.directions}</Text>
        </View>
        </TouchableHighlight>)
      })}
    </View>)
  }

  reqFilter(){
    let filteredRecipes = this.props.recipesdb
    // each ingredient in the filters
    for (let ingredient of this.props.findReqs){
      //filter recipies
      filteredRecipes = filteredRecipes.filter( (recipe) => {
        let flag = false
        //each ingredient in recipe compared to filter ingredient
        for (let recIng of recipe.ingredients){
          if (recIng.name === ingredient.name){
            flag = true
          }
        }
        return flag
      })
    }
    return filteredRecipes
  }


  render(){
    console.log(this.props.findReqs)
    return(
      <View>
        { this.renderRecipes() }
        <Text>hi</Text>
      </View>
    )
  }

}

export default FindResults;
