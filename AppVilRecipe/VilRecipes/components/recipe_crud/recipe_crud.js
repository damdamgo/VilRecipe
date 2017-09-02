import React , { Component }from 'react';
import {ToastAndroid,ScrollView,TouchableHighlight,Button,StyleSheet, TextInput, ActivityIndicator, ListView, Text, View } from 'react-native';
import Config from 'VilRecipes/config/config';
import {ListCategory,ListCountry,Remark,FileManager,ListDifficulty} from './recipe_crud_components';
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';
import Icon from 'react-native-vector-icons/Ionicons';


export default class RecipeCRUD extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: "Recipe",
  });

  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    this.initStateRecipe(params);
  }

  initStateRecipe(params){
    const objectRecipe = {};
    this.state = {recipe  : {},current_accept_page:0,current_page:0,country_selected:{},category_selected:{},save_manager:{upload:false},time:{preparation:{},cooking:{}},difficulty_selected:{}};
    if(params.status=="update"){
      this.state.recipe = params.recipe;
      this.state.country_selected = params.recipe.recipe_country_id;
      this.state.difficulty_selected= params.recipe.recipe_difficulty_id;
      this.state.category_selected = params.recipe.recipe_category_id;
      this.state.time = params.recipe.time;
    }
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

  setDifficulty(difficulty){
    this.setState({difficulty_selected: difficulty});
  }


  sendFile(index,array,idRecipe){
    if(index!=array.length){
      if(array[index].creation_date){
        this.sendFile(index+1,array,idRecipe)
      }else
      {
        const data = new FormData();
        this.setTextUpload("Enregistrement du fichier"+array[index].name);
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
            this.fileManager.setUploadFile(index,responseJson.data._id);
            this.sendFile(index+1,array,idRecipe)
          }
          else{
            this.stopUpload();
            ToastAndroid.show("Une erreur c'est produite. Veuillez réessayer ultérieurement", ToastAndroid.SHORT);
          }
        }).catch(function(error) {
          this.stopUpload();
          ToastAndroid.show("Une erreur c'est produite. Veuillez réessayer ultérieurement", ToastAndroid.SHORT);
        });
      }
    }
    else{
      const {goBack} = this.props.navigation;
      const { params } = this.props.navigation.state
      params.onGoBack();
      goBack();
    }
  }

  startUpload(){
    const save_manager = this.state.save_manager;
    save_manager.upload=true;
    this.setState({save_manager:save_manager})
  }

  stopUpload(){
    const save_manager = this.state.save_manager;
    save_manager.upload=false;
    this.setState({save_manager:save_manager})
  }

  setTextUpload(text){
    const save_manager = this.state.save_manager;
    save_manager.text=text;
    this.setState({save_manager:save_manager})
  }

  sendRecipe(){
    this.startUpload();
    this.setTextUpload("Enregistrement de la recette");
    const recipe = this.state.recipe;
    recipe.remarks = this.remark.getRemarks();
    recipe.country = this.state.country_selected;
    recipe.category = this.state.category_selected;
    recipe.difficulty = this.state.difficulty_selected;
    recipe.time = this.state.time;
    const files = this.fileManager.getFiles();
    const bodySend = JSON.stringify({recipe:recipe});
    if(recipe._id){
      fetch(Config.URl_UPDATE_RECIPE, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: bodySend
      }).then((res) => {
        const resJson = JSON.parse(res._bodyText)
        if(resJson.error==Config.NO_ERROR){
          this.sendFile(0,files,recipe._id);
        }
        else{
          this.stopUpload();
          ToastAndroid.show("Une erreur c'est produite. Veuillez réessayer ultérieurement", ToastAndroid.SHORT);
        }
      }).catch((error) => {
          this.stopUpload()
          ToastAndroid.show("Une erreur c'est produite. Veuillez réessayer ultérieurement", ToastAndroid.SHORT);
      });
    }
    else{
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
          this.state.recipe.creation_date=Date.now();
          this.state.recipe._id=resJson.data._id;
          this.sendFile(0,files,resJson.data._id);
        }
        else{
          this.stopUpload();
          ToastAndroid.show("Une erreur c'est produite. Veuillez réessayer ultérieurement", ToastAndroid.SHORT);
        }
      }).catch((error) => {
          this.stopUpload()
          ToastAndroid.show("Une erreur c'est produite. Veuillez réessayer ultérieurement", ToastAndroid.SHORT);
      });
    }
  }

  updateValue(index,text){
    const recipe = this.state.recipe;
    recipe[index] = text;
    this.setState({ recipe: recipe });
  }

  updatePreparationValue(index,value){
    const time = this.state.time;
    time.preparation[index] = value;
    this.setState({ time: time });
  }

  updateCookingValue(index,value){
    const time = this.state.time;
    time.cooking[index] = value;
    this.setState({ time: time });
  }

  checkNumber(value){
    if(value==0){
      return true
    }
    return Number(value)==value && value!="";
  }

  checkedNextStepRecipe(){
    const recipe = this.state.recipe;
    const time = this.state.time;
    return this.checkNumber(time.preparation.hour) && this.checkNumber(time.preparation.minute) && this.checkNumber(time.cooking.minute) && this.checkNumber(time.cooking.hour) && recipe.name && this.checkNumber(recipe.cost) && this.checkNumber(recipe.people);
  }

  render() {
    // The screen's current route is passed in to `props.navigation.state`:
    return (
      <View style={{flex:1,backgroundColor:"#757575"}}>
          <IndicatorViewPager onPageSelected={(event)=>this.changePage(event)} ref={(indicatorViewPager) => { this.indicatorViewPager = indicatorViewPager; }}  style={{flex:1,
          padding:40}} horizontalScroll={false} indicator={this._renderDotIndicator()}>
             <View style={styles.recipeStep}>
               <ScrollView>
                <Text style={styles.titleStep}>1. Recette : </Text>
                 <Text style={styles.titleStep}>Nom de la recette : </Text>
                 <TextInput style={styles.textInputStep} underlineColorAndroid={"transparent"}
                 onChangeText={(text) => this.updateValue("name",text)}
                 value={this.state.recipe.name}/>
                 <Text style={styles.titleStep}>Cout : </Text>
                 <TextInput style={styles.textInputStep} underlineColorAndroid={"transparent"}
                 onChangeText={(text) => this.updateValue("cost",text)}  keyboardType = 'numeric'
                 value={this.checkNumber(this.state.recipe.cost)?""+this.state.recipe.cost:this.state.recipe.cost}/>
                 <Text style={styles.titleStep}>Nombre de personne : </Text>
                 <TextInput style={styles.textInputStep} underlineColorAndroid={"transparent"}
                 onChangeText={(text) => this.updateValue("people",text)}  keyboardType = 'numeric'
                 value={this.checkNumber(this.state.recipe.people)?""+this.state.recipe.people:this.state.recipe.people}/>
                 <Text style={styles.titleStep}>Temps de préparation : </Text>
                 <View>
                  <Text style={styles.subTitle} >Heure :</Text>
                  <TextInput style={styles.textInputStep} underlineColorAndroid={"transparent"}
                  onChangeText={(text) => this.updatePreparationValue("hour",text)}  keyboardType = 'numeric'
                  value={this.checkNumber(this.state.time.preparation.hour)?""+this.state.time.preparation.hour:this.state.time.preparation.hour}/>
                  <Text style={styles.subTitle}>Minute :</Text>
                  <TextInput style={styles.textInputStep} underlineColorAndroid={"transparent"}
                  onChangeText={(text) => this.updatePreparationValue("minute",text)}  keyboardType = 'numeric'
                  value={this.checkNumber(this.state.time.preparation.minute)?""+this.state.time.preparation.minute:this.state.time.preparation.minute}/>
                 </View>
                 <Text style={styles.titleStep}>Temps de cuisson : </Text>
                 <View>
                  <Text style={styles.subTitle}>Heure :</Text>
                  <TextInput style={styles.textInputStep} underlineColorAndroid={"transparent"}
                  onChangeText={(text) => this.updateCookingValue("hour",text)}  keyboardType = 'numeric'
                  value={this.checkNumber(this.state.time.cooking.hour)?""+this.state.time.cooking.hour:this.state.time.cooking.hour}/>
                  <Text style={styles.subTitle}>Minute :</Text>
                  <TextInput style={styles.textInputStep} underlineColorAndroid={"transparent"}
                  onChangeText={(text) => this.updateCookingValue("minute",text)}  keyboardType = 'numeric'
                  value={this.checkNumber(this.state.time.cooking.minute)?""+this.state.time.cooking.minute:this.state.time.cooking.minute}/>
                 </View>
                 </ScrollView>
                 { this.checkedNextStepRecipe() && <Button
                  onPress={()=>this.indicatorViewPager.setPage(this.state.current_page+1)}
                  title="Suivant"
                  color="#9E9E9E"
                  />
                }
             </View>
             <View style={styles.recipeStep}>
               <Text style={styles.titleStep}>2. Remarque : </Text>
               <ScrollView>
               <Remark remarks={this.state.recipe.remarks?this.state.recipe.remarks:null} ref={(remark) => { this.remark = remark; }}></Remark>
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
               <Text style={styles.titleStep}>4. Difficulté : </Text>
               <ScrollView>
                 <ListDifficulty callback={this.setDifficulty.bind(this)} style={styles.limitsListe} ref={(difficulty) => { this.difficulty = difficulty; }}></ListDifficulty>
                </ScrollView>
                <View style={styles.nextLayout}>
                  <Text style={styles.nextLayoutText}>
                    {this.state.difficulty_selected && this.state.difficulty_selected.name?"Difficulté sélectionnée :"+this.state.difficulty_selected.name:"Pas de difficulté sélectionnée"}
                  </Text>
                  {this.state.difficulty_selected && this.state.difficulty_selected.name && <Button
                   onPress={()=>this.indicatorViewPager.setPage(this.state.current_page+1)}
                   title="Suivant"
                   color="#9E9E9E"
                   />}
                </View>
             </View>
             <View style={styles.recipeStep}>
               <Text style={styles.titleStep}>6. Fichier : </Text>
               <ScrollView>
                <FileManager idrecipe={this.state.recipe._id ?this.state.recipe._id:null} ref={(fileManager) => { this.fileManager = fileManager; }}></FileManager>
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
        {
          this.state.save_manager.upload==true && <View style={styles.panelUpload}>
            <Text style={styles.textUpload}>{this.state.save_manager.text}</Text>
          </View>
        }
      </View>
    );
  }

  _renderDotIndicator() {
       return <PagerDotIndicator pageCount={6} />;
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
  },
  panelUpload:{
    position:"absolute",
    bottom:0,
    top:0,
    left:0,
    right:0,
    backgroundColor:"#757575",
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textUpload:{
    color:'white',
    fontSize:15
  },
  subTitle:{
    color:'white',
    fontSize:13
  }
});
