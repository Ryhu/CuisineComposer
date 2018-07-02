import React from 'react';
import RecipeView from './RecipeView'
import BrowseRecipes from './BrowseRecipes'
import BrowseIngredients from './BrowseIngredients'
import { Button, View, Text, Image } from "react-native";

class Browse extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      screen: ""
    }

  }

  //returns to home screen when footer clicked again
  componentWillReceiveProps(){
    this.setState({
      screen: this.props.screen
    })
  }

  setScreen = (word) => {
    this.setState({
      screen: word
    })
  }
  display(){
    switch(this.state.screen){
      case "":
        return this.showMainMenu()
      case "recipe":
        return <BrowseRecipes messageAction={ this.changeMessage } />
      case "ingredient":
        return <BrowseIngredients messageAction={ this.changeMessage } />

      default:
        console.log("failed the switch")
    }
  }

  showMainMenu(){
    return (
      <View>
        <Text>Browse</Text>
        <Button className="addButtons" onPress={ () => this.setScreen('ingredient') } title="browse ingredients"></Button>
        <Button className="addButtons" onPress={ () => this.setScreen('recipe') } title="browse recipes"></Button>
      </View>
    )
  }

  render() {
    return (
       this.display()
    )
  }
}

export default Browse;
