import React , { Component }from 'react';
import {ScrollView,TouchableHighlight,Button,StyleSheet, TextInput, ActivityIndicator, ListView, Text, View } from 'react-native';
import Config from 'VilRecipes/config/config';
import {ListCategory,ListCountry,Remark,FileManager} from './recipe_crud_components';
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';
import Icon from 'react-native-vector-icons/Ionicons';


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
    this.state = {recipe  : {},current_accept_page:0,current_page:0,country_selected:{},category_selected:{}};
  }

  changePage(event){
    if(this.state.current_accept_page < event.position) {
      this.setState({current_accept_page: event.position});
    }
    this.setState({current_page: event.position});
  }


  setCountry(country){
    this.setState({country_selected: country});
  }

  setCategory(category){
    this.setState({category_selected: category});
  }

  sendFile(index,array,idRecipe){
    if(index!=array.length){
      const data = new FormData();
      data.append(array[index].name,{
          uri:array[index].uri,
          type:array[index].type,
          name:array[index].name
      });
      data.append("idRecipe",idRecipe);
      fetch(Config.URl_ADD_FILE_RECIPE+"/"+idRecipe, {
        method: 'POST',
        body: data
      }).then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.error==Config.NO_ERROR){
          this.fileManager.setUploadFile(index);
          this.sendFile(index++,array)
        }
      }).catch(function(error) {
        console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
      });
    }
  }

  sendRecipe(){
    const recipe = this.state.recipe;
    recipe.remarks = this.remark.getRemarks();
    recipe.country = this.state.country_selected;
    recipe.category = this.state.category_selected;
    const files = this.fileManager.getFiles();
    const bodySend = JSON.stringify({recipe:recipe});
    fetch(Config.URl_ADD_RECIPE, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: bodySend
    }).then((res) => {
      const resJson = JSON.parse(res._bodyText)
      if(resJson.error==Config.NO_ERROR){
        this.state.recipe.creation_date=Date.now()
        this.sendFile(0,files,resJson.data._id);
      }
    }).catch((error) => {
        console.error(error);
    });
  }

  render() {
    // The screen's current route is passed in to `props.navigation.state`:
    return (
      <View style={{flex:1,backgroundColor:"#757575"}}>
          <IndicatorViewPager onPageSelected={(event)=>this.changePage(event)} ref={(indicatorViewPager) => { this.indicatorViewPager = indicatorViewPager; }}  style={{flex:1,
          padding:40}} horizontalScroll={false} indicator={this._renderDotIndicator()}>
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
               <ScrollView>
               <Remark remarks={this.state.remarks} ref={(remark) => { this.remark = remark; }}></Remark>
               </ScrollView>
               <Button
                onPress={()=>this.indicatorViewPager.setPage(this.state.current_page+1)}
                title="Suivant"
                color="#9E9E9E"
                />
             </View>
             <View style={styles.recipeStep}>
               <Text style={styles.titleStep}>3. Categorie : </Text>
               <ScrollView>
                <ListCategory callback={this.setCategory.bind(this)} style={styles.limitsListe} ref={(category) => { this.category = category; }}></ListCategory>
               </ScrollView>
               <View style={styles.nextLayout}>
                 <Text style={styles.nextLayoutText}>
                   {this.state.category_selected && this.state.category_selected.name?"Catégorie sélectionnée :"+this.state.category_selected.name:"Pas de catégorie selectionnée"}
                 </Text>
                 {this.state.category_selected && this.state.category_selected.name && <Button
                  onPress={()=>this.indicatorViewPager.setPage(this.state.current_page+1)}
                  title="Suivant"
                  color="#9E9E9E"
                  />}
               </View>
             </View>
             <View style={styles.recipeStep}>
               <Text style={styles.titleStep}>4. Pays : </Text>
               <ScrollView>
                 <ListCountry callback={this.setCountry.bind(this)} style={styles.limitsListe} ref={(country) => { this.country = country; }}></ListCountry>
                </ScrollView>
                <View style={styles.nextLayout}>
                  <Text style={styles.nextLayoutText}>
                    {this.state.country_selected && this.state.country_selected.name?"Pays sélectionné :"+this.state.country_selected.name:"Pas de pays sélectionné"}
                  </Text>
                  {this.state.country_selected && this.state.country_selected.name && <Button
                   onPress={()=>this.indicatorViewPager.setPage(this.state.current_page+1)}
                   title="Suivant"
                   color="#9E9E9E"
                   />}
                </View>
             </View>
             <View style={styles.recipeStep}>
               <Text style={styles.titleStep}>5. Fichier : </Text>
               <ScrollView>
                <FileManager  ref={(fileManager) => { this.fileManager = fileManager; }}></FileManager>
              </ScrollView>
               <View style={styles.nextLayout}>
                <Button
                  onPress={()=>this.sendRecipe()}
                  title="Envoyer"
                  color="#9E9E9E"
                  />
               </View>
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
    flex:1
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
  },
  nextLayout:{
    flexDirection: 'row',
    padding:20
  },
  nextLayoutText:{
    color:'white',
    fontSize:15,
    alignSelf:"center",
    marginRight:20
  }
});
