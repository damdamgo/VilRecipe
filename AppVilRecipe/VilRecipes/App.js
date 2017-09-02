import React from 'react';
import { ScrollView,Platform,StyleSheet, Text, View ,StatusBar} from 'react-native';
import ListRecipe from './components/recipe_menu/recipe_menu';
import ViewRecipe from './components/recipe_view/recipe_view';
import RecipeCRUD from './components/recipe_crud/recipe_crud';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackNavigator } from 'react-navigation';

 class App extends React.Component {

  static navigationOptions = {
    title: 'Home'
  };

  addRecipe(){
    const {navigate}  = this.props.navigation;
     navigate('RecipeCRUD', { status: "create" ,onGoBack: () => this.listRecipe.getRecipeList()})
  }

  getNavigation(){
    const {navigate} = this.props.navigation;
    return navigate;
  }

  render() {
    return (
      <View style={styles.screenStyle}>
        <ScrollView><ListRecipe navigation={this.getNavigation()} ref={(listRecipe) => { this.listRecipe = listRecipe; }}></ListRecipe></ScrollView>
        <ActionButton buttonColor="rgba(231,76,60,1)" onPress={()=>this.addRecipe()}>
       </ActionButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screenStyle: {
    flex:1
  },
});

const VilRecipes = StackNavigator({
  Home: { screen: App },
  RecipeCRUD : {screen:RecipeCRUD},
  ViewRecipe : {screen:ViewRecipe}
},
{
 cardStyle: {
  //add color
 }
});

export default VilRecipes;
