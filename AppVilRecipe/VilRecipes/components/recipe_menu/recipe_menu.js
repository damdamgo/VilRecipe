import React , { Component }from 'react';
import {  TouchableHighlight,ActivityIndicator, StyleSheet,ListView, Text, View } from 'react-native';
import Config from 'VilRecipes/config/config';
import Icon from 'react-native-vector-icons/Ionicons';

export default class ListRecipe extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading : true
    }
    this.navigation = props.navigation;
    this.getRecipeList();
  }

  getRecipeList(){
    fetch(Config.URl_GET_RECIPE).then((response)=>response.json()).then((responseJson)=>{
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      if(responseJson.error==Config.NO_ERROR){
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson.data),
        });
      }
    });
  }

  gotToCRUDRecipe(recipe){
    this.navigation('RecipeCRUD', { status: "update",recipe: recipe,onGoBack: () => this.getRecipeList()})
  }
  gotToViewRecipe(recipe){
    this.navigation('ViewRecipe', { recipe: recipe})
  }

  renderRecipe(recipe){
    return (
      <View style={styles.viewRecipe} >
        <Text>{recipe.name} --- {recipe.recipe_category_id.name} --- {recipe.recipe_country_id.name}</Text>
        <TouchableHighlight style={styles.viewRecipeIcon} onPress={() => this.gotToViewRecipe(recipe)}  underlayColor={"#E1E1E1"}>
          <View>
            <Icon name="md-book" size={24}/>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.viewRecipeIcon}  onPress={() => this.gotToCRUDRecipe(recipe)} underlayColor={"#E1E1E1"}>
          <View>
            <Icon name="md-create" size={24} />
          </View>
        </TouchableHighlight>
      </View>

    )
  }

  render() {
    if (this.state.isLoading) {
         return (
           <View style={{flex: 1, paddingTop: 20}}>
             <ActivityIndicator />
           </View>
         );
       }

       return (
         <View style={{flex: 1, paddingTop: 20}}>
           <ListView
             dataSource={this.state.dataSource}
             renderRow={this.renderRecipe.bind(this)}
           />
         </View>
       );
  }
}

const styles = StyleSheet.create({
  viewRecipe: {
    flex:1,
    padding:5,
    flexDirection: 'row',
  },
  viewRecipeIcon:{
    paddingLeft:10
  }
});
