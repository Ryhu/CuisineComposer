import React from 'react';
import IngredientView from './IngredientView'
import { Button, View, Text, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import styles from '../components/stylesheet'

class BrowseIngredients extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      ingredientsdb: [],
      filter: "",
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

  renderFilteredIngredients(){
    let filteredArr = this.filterSearch()
    return(<View style={styles.container}>
      { filteredArr.map( (i, keyVal) => {
          return(
            <TouchableOpacity key={keyVal} onPress={ () => this.ingredientSwitch(i)} style={[styles.findIngredient, {justifyContent:'center'}]}>
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
    return ( <View>
      <View style={styles.container}><Text>Search: </Text></View>
      <TextInput style={{backgroundColor: 'white', marginBottom:10, marginTop:10, fontSize:18}} placeholder="Search Ingredients..." underlineColorAndroid="transparent" onChangeText={ (text) => this.setState({filter: text}) } title="Search" value={ this.state.filter }/>
      <ScrollView contentContainerStyle={{paddingBottom: 80}}>{this.renderFilteredIngredients()}</ScrollView>
    </View>)
  }
}

export default BrowseIngredients;
