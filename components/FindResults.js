import React from 'react';
import { Button, View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
const styles = StyleSheet.create({
  recipe: {
    marginTop:5,
    backgroundColor:"red"
  },
});

class FindResults extends React.Component {




  viewRecipe(recipe){
    this.props.navigation.navigate('RecipeView', {
      recipe:recipe,
    })
  }

  renderRecipes(){
    let list = this.reqFilter()
    return(<View>
      { list.map( (i, keyVal) => {
        return(<TouchableOpacity key={keyVal} style={styles.recipe} className="recipeBox" onPress={ () => this.viewRecipe(i) }>
        <View>
          <Text>{i.name}</Text>
          <Text>{i.time}</Text>
          <Text>{i.directions}</Text>
        </View>
        </TouchableOpacity>)
      })}
    </View>)
  }

  reqFilter(){
    let filteredRecipes = this.props.navigation.getParam('recipesdb')
    // each ingredient in the filters
    for (let ingredient of this.props.navigation.getParam('findReqs')){
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
    return(
      <View>
        { this.renderRecipes() }
      </View>
    )
  }

}

export default FindResults;
