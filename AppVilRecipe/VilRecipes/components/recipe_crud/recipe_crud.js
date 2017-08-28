import React , { Component }from 'react';
import {TouchableHighlight,Button,StyleSheet, TextInput, ActivityIndicator, ListView, Text, View } from 'react-native';
import Config from 'VilRecipes/config/config';
import {ListCategory,ListCountry,Remark} from './recipe_crud_components';
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';
import Icon from 'react-native-vector-icons/Ionicons';
var RNFS = require('react-native-fs');

export default class RecipeCRUD extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: "Recipe",
  });

  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    this.initStateRecipe(params.status);
  }

  initStateRecipe(status){
    const objectRecipe = {};
    this.state = {recipe  : {},current_accept_page:0,current_page:0};
  }

  changePage(event){
    if(this.state.current_accept_page < event.position) {
      this.setState({current_accept_page: event.position});
    }
    this.setState({current_page: event.position});
  }

  updateRemarks(remarks){
    console.log("remarks",remarks);
    this.state.remarks = remarks;
  }

  selectFile(){
    // get a list of files and directories in the main bundle
    RNFS.readDir(RNFS.MainBundlePath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
      .then((result) => {
        console.log('GOT RESULT', result);

        // stat the first file
        return Promise.all([RNFS.stat(result[0].path), result[0].path]);
      })
      .then((statResult) => {
        if (statResult[0].isFile()) {
          // if we have a file, read it
          return RNFS.readFile(statResult[1], 'utf8');
        }

        return 'no file';
      })
      .then((contents) => {
        // log the file contents
        console.log(contents);
      })
      .catch((err) => {
        console.log(err.message, err.code);
      });
  }

  render() {
    // The screen's current route is passed in to `props.navigation.state`:
    return (
      <View style={{flex:1,backgroundColor:"#757575"}}>
          <IndicatorViewPager onPageSelected={(event)=>this.changePage(event)} ref={(indicatorViewPager) => { this.indicatorViewPager = indicatorViewPager; }}  style={{flex:1}} horizontalScroll={false} indicator={this._renderDotIndicator()}>
             <View style={styles.recipeStep}>
               <Text style={styles.titleStep}>1. Nom de la recette : </Text>
               <TextInput style={styles.textInputStep} underlineColorAndroid={"transparent"}
               onChangeText={(text) => this.state.recipe.name =text}
               value={this.state.recipe.name}/>
               <Button
                onPress={()=>this.indicatorViewPager.setPage(this.state.current_page+1)}
                title="Suivant"
                color="#9E9E9E"
                />
             </View>
             <View style={styles.recipeStep}>
               <Text style={styles.titleStep}>2. Remarque : </Text>
               <Remark remarks={this.state.remarks} ref={(remark) => { this.remark = remark; }}></Remark>
               <Button
                onPress={()=>this.indicatorViewPager.setPage(this.state.current_page+1)}
                title="Suivant"
                color="#9E9E9E"
                />
             </View>
             <View style={styles.recipeStep}>
               <Text style={styles.titleStep}>3. Categorie : </Text>
               <ListCategory style={styles.limitsListe}></ListCategory>
               <Button
                onPress={()=>this.indicatorViewPager.setPage(this.state.current_page+1)}
                title="Suivant"
                color="#9E9E9E"
                />
             </View>
             <View style={styles.recipeStep}>
               <Text style={styles.titleStep}>4. Pays : </Text>
               <ListCountry style={styles.limitsListe}></ListCountry>
               <Button
                onPress={()=>this.indicatorViewPager.setPage(this.state.current_page+1)}
                title="Suivant"
                color="#9E9E9E"
                />
             </View>
             <View style={styles.recipeStep}>
               <Text style={styles.titleStep}>5. Fichier : </Text>
               <Button
                onPress={()=>this.selectFile()}
                title="file"
                color="#9E9E9E"
                />
             </View>
          </IndicatorViewPager>
          { this.state.current_page !=0 &&
          <View style={styles.bottomNavigationLeft}>
            <View>
              <TouchableHighlight onPress={()=>{this.indicatorViewPager.setPage(this.state.current_page-1)}} style={{padding:10}} underlayColor={'rgba(224, 224, 224, 0.5)'}>
                 <View>
                     <Icon name="md-arrow-back" size={24} color="white" />
                 </View>
             </TouchableHighlight>
            </View>
          </View>
          }
          { this.state.current_accept_page > this.state.current_page &&
          <View style={styles.bottomNavigationRight}>
            <View>
              <TouchableHighlight onPress={()=>{this.indicatorViewPager.setPage(this.state.current_page+1)}} style={{padding:10}} underlayColor={"#E1E1E1"}>
                 <View>
                     <Icon name="md-arrow-forward" size={24} color="white" />
                 </View>
             </TouchableHighlight>
            </View>
          </View>
        }
      </View>
    );
  }

  _renderDotIndicator() {
       return <PagerDotIndicator pageCount={5} />;
   }

}


const styles = StyleSheet.create({
  recipeStep: {
    flex:1,
    padding:"5%"
  },
  bottomNavigationLeft:{
    position:"absolute",
    bottom:0,
    left:0
  },
  bottomNavigationRight:{
    position:"absolute",
    bottom:0,
    right:0
  },
  titleStep:{
    color:'white',
    fontSize:20,
    marginBottom:10
  },
  textInputStep:{
    height:40,
    borderColor: 'white',
    borderWidth: 1,
    color:"white",
    marginBottom:10,
    fontSize:15,
  },
  limitsListe:{
    height:"80%"
  }
});
