import React , { Component }from 'react';
import { TouchableHighlight,ActivityIndicator, StyleSheet,ListView, Text, View } from 'react-native';
import Config from 'VilRecipes/config/config';
import Icon from 'react-native-vector-icons/Ionicons';
import {Card,CardImage,CardTitle,CardContent,CardAction} from 'react-native-card-view';
import Button from 'react-native-button';

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
      <View style={styles.container,styles.card}>
        <CardTitle>
          <Text style={styles.title}>{recipe.name}</Text>
        </CardTitle>
        <CardContent>
          <Text>Categorie : {recipe.recipe_category_id.name}</Text>
          <Text>Pays : {recipe.recipe_country_id.info.name}</Text>
        </CardContent>
        <CardAction >
          <Button
            style={styles.button}
            onPress={() => this.gotToCRUDRecipe(recipe)}>
            Modifier
          </Button>
          <Button
            style={styles.button}
            onPress={() => this.gotToViewRecipe(recipe)}>
            Voir
          </Button>
        </CardAction>
        <View style={styles.separator} />
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
           <ListView enableEmptySections={true}
             dataSource={this.state.dataSource}
             renderRow={this.renderRecipe.bind(this)}
           />
         </View>
       );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    margin: 5
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 2,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0.3,
    }
  },
  title: {
    fontSize: 22,
    backgroundColor: 'transparent'
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#E9E9E9'
  },
  button: {
    marginRight: 10
  }
});
