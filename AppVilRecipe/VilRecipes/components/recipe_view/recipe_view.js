import React , { Component }from 'react';
import {  ToastAndroid,TouchableHighlight,ActivityIndicator, StyleSheet,ListView, Text, View } from 'react-native';
import Config from 'VilRecipes/config/config';
import Icon from 'react-native-vector-icons/Ionicons';
import RNFetchBlob from 'react-native-fetch-blob'
export default class ViewRecipe extends React.Component {

  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    this.state = {
      recipe : params.recipe
    }
  }

  downloadFiles(idRecipe){
    fetch(Config.URl_GET_EXISTING_FILE+"/"+idRecipe).then((response)=>response.json()).then((responseJson)=>{
        if(responseJson.error==Config.NO_ERROR){
          if(responseJson.data){
            responseJson.data.forEach(function(data){
              console.log("url",Config.URL_DOWNLOAD_RECIPE+"/"+data.name);
              const split = data.name.split(".");
              const ext = split[split.length-1];
              console.log(ext);
              const mime = ext=="pdf"?"application/pdf":	"image/jpeg";
              RNFetchBlob
              .config({
                  addAndroidDownloads : {
                      useDownloadManager : true,
                      notification : true,
                      mime : mime,
                      description : 'File downloaded',
                      path: RNFetchBlob.fs.dirs.DownloadDir+"/"+data.name
                  }
              })
              .fetch('GET', Config.URL_DOWNLOAD_RECIPE+"/"+data.name);
          });
        }
        else{
          ToastAndroid.show("Une erreur c'est produite. Veuillez réessayer ultérieurement", ToastAndroid.SHORT);
        }
      }
      else{
        ToastAndroid.show("Une erreur c'est produite. Veuillez réessayer ultérieurement", ToastAndroid.SHORT);
      }
    })
  }


  render(){
    const recipe = this.state.recipe
      const remarks = [];
      for(let i=0;i<recipe.remarks.length;i++){
        remarks.push(<Text key={i} style={styles.remarkText}>{recipe.remarks[i]}</Text>)
      }
       return (
         <View style={{flex:1,backgroundColor:"#757575"}}>
           <Text style={styles.viewRecipeText}>Nom : {recipe.name}</Text>
           <Text style={styles.viewRecipeText}>Nombre de personne : {recipe.people}</Text>
           <Text style={styles.viewRecipeText}>Temps de préparation : {recipe.time.preparation.hour}h:{recipe.time.preparation.minute}m</Text>
           <Text style={styles.viewRecipeText}>Temps de cuisson : {recipe.time.cooking.hour}h:{recipe.time.cooking.minute}m</Text>
           <Text style={styles.viewRecipeText}>Catégorie : {recipe.recipe_category_id.name}</Text>
           <Text style={styles.viewRecipeText}>Pays : {recipe.recipe_country_id.info.name}</Text>
           <Text style={styles.viewRecipeText}>Difficulté : {recipe.recipe_difficulty_id.name}</Text>
           <Text style={styles.viewRecipeText}>Remarques : </Text>
           {remarks}
           <View>
           <TouchableHighlight style={styles.viewRecipeIcon} onPress={() => this.downloadFiles(this.state.recipe._id)}  underlayColor={"#E1E1E1"}>
             <View>
               <Icon name="md-download" size={34} color={"white"}/>
             </View>
           </TouchableHighlight>
           </View>
         </View>
      );
  }
}

const styles = StyleSheet.create({
  viewRecipeIcon:{
    margin:15,
    width:34
  },
  viewRecipeText:{
    color:'white',
    fontSize:15,
    margin:15
  },
  remarkText:{
    color:'white',
    fontSize:15,
    marginLeft:30,
    margin:15
  }
});
