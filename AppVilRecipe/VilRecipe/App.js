import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ListRecipe from './components/recipe_menu/recipe_menu';

export default class App extends React.Component {
  render() {
    return (
      <View>
        <ListRecipe></ListRecipe>
      </View>
    );
  }
}
