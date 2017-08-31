import React from 'react';
import { Platform,StyleSheet, Text, View ,StatusBar} from 'react-native';
import ListRecipe from './components/recipe_menu/recipe_menu';
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
     navigate('Recipe', { status: "create" })
  }

  render() {
    return (
      <View style={styles.screenStyle}>
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
  Recipe : {screen:RecipeCRUD}
},
{
 cardStyle: {
  //add color
 }
});

export default VilRecipes;
