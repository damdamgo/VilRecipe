import React , { Component }from 'react';
import {  ActivityIndicator, ListView, Text, View } from 'react-native';
import Config from 'VilRecipe/config/config';

export default class ListRecipe extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading : true
    }
    this.getRecipeList();
  }

  getRecipeList(){
    fetch(Config.URl_GET_RECIPE).then((response)=>response.json()).then((responseJson)=>{
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({
        isLoading: false,
        dataSource: ds.cloneWithRows(responseJson.data),
      });
    });
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
             renderRow={(rowData) => <Text>{rowData.title}, {rowData.releaseYear}</Text>}
           />
         </View>
       );
  }
}
