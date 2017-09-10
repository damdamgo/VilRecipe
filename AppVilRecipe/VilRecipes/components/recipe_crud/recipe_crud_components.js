import React , { Component }from 'react';
import {ScrollView,ToastAndroid, TouchableHighlight,Button,StyleSheet, TextInput,  ActivityIndicator, ListView, Text, View } from 'react-native';
import Config from 'VilRecipes/config/config';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/Ionicons';


class ListCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading : true
    }
    this.callback = props.callback
    this.getMainCategory();
  }

  getMainCategory(){
      fetch(Config.URL_GET_MAIN_CATEGORY).then((response)=>response.json()).then((responseJson)=>{
        console.log(responseJson)
        this.setState({
          isLoading: false,
          mainCategory: responseJson.data
        });
      });
  }

  getCategoryList(idMainCategorie){
    fetch(Config.URl_GET_CATEGORY+"/"+idMainCategorie).then((response)=>response.json()).then((responseJson)=>{
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1._id !== r2._id});
      this.setState({
        dataSource: ds.cloneWithRows(responseJson.data),
      });
    });
  }

  renderCategory(category){
    return(
      <Text onPress={()=>this.callback(category)} style={styles.displayListData}>{category.name}</Text>
    );
  }
  render() {
    if (this.state.isLoading) {
         return (
           <View>
             <ActivityIndicator />
           </View>
         );
       }
       const mainInformation = [];
       for (var i=0; i < this.state.mainCategory.length; i++) {
         const id = this.state.mainCategory[i]._id;
           mainInformation.push(<Button key={i} onPress={()=>this.getCategoryList(id)} title={this.state.mainCategory[i].name} color="#9E9E9E"/>);
       }
       return (
         <View>
         <ScrollView horizontal={true}>
          <View style={styles.mainInformation}>
            {mainInformation}
          </View>
         </ScrollView>
         {this.state.dataSource &&
           <ListView enableEmptySections={true}
             dataSource={this.state.dataSource}
             renderRow={this.renderCategory.bind(this)}
           />
          }
         </View>
       );
  }
}

class ListDifficulty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading : true
    }
    this.callback = props.callback
    this.getDifficultyList();
  }
  getDifficultyList(){
    fetch(Config.URl_GET_DIFFICULTY).then((response)=>response.json()).then((responseJson)=>{
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1._id !== r2._id});
      this.setState({
        isLoading: false,
        dataSource: ds.cloneWithRows(responseJson.data),
      });
    });
  }
  renderDifficulty(difficulty){
    return(
      <Text onPress={()=>this.callback(difficulty)} style={styles.displayListData}>{difficulty.name}</Text>
    );
  }
  render() {
    if (this.state.isLoading) {
         return (
           <View>
             <ActivityIndicator />
           </View>
         );
       }

       return (
         <View>
           <ListView
             dataSource={this.state.dataSource}
             renderRow={this.renderDifficulty.bind(this)}
           />
         </View>
       );
  }
}

class ListCountry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading : true,
      country_selected : {}
    };
    this.callback = props.callback;
  }
  getCountryList(code){
    fetch(Config.URl_GET_COUNTRY+"/"+code).then((response)=>response.json()).then((responseJson)=>{
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1._id !== r2._id});
      this.setState({
        dataSource: ds.cloneWithRows(responseJson.data),
        country_selected : {}
      });
    });
  }
  renderCountry(country){
    return(
      <Text onPress={()=>this.callback(country)} style={styles.displayListData}>{country.info.name}</Text>
    );
  }
  render() {
       const mainInformation = [];
       for (var i=0; i <Config.continents.length; i++) {
         const code = Config.continents[i].code;
           mainInformation.push(<Button key={i} onPress={()=>this.getCountryList(code)} title={Config.continents[i].name} color="#9E9E9E"/>);
       }
       return (
          <View >
         <ScrollView horizontal={true}>
          <View style={styles.mainInformation}>
            {mainInformation}
          </View>
         </ScrollView>
         {this.state.dataSource &&
           <ListView enableEmptySections={true}
             dataSource={this.state.dataSource}
             renderRow={this.renderCountry.bind(this)}
           />
           }
         </View>
       );
  }

}

class Remark extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      remarks : props.remarks?props.remarks:[]
    }
  }

  getRemarks(){
    return this.state.remarks;
  }

  updateValueArray(index,text){
    const newArray = this.state.remarks;
    newArray[index] = text;
    this.setState({ remarks: newArray });
  }

  removeAtIndex(index){
    const newArray = this.state.remarks;
    newArray.splice(index,1);
    this.setState({ remarks: newArray });
  }

  render() {
       return (
         <View style={styles.remarkContain}>
           {
             this.state.remarks.map((data,i)=>(
<View key={i} style={styles.displayElementCanClose}><View style={{flexGrow:8}}><TextInput style={styles.textInputStep} underlineColorAndroid={"transparent"} onChangeText={(text) =>this.updateValueArray(i,text)} value={this.state.remarks[i]}/></View><View style={{flexGrow:1}}><View style={{width:40}}><TouchableHighlight onPress={()=>{this.removeAtIndex(i)}} style={{padding:10}} underlayColor={"#E1E1E1"}><View><Icon name="md-close" size={24} color="red" /></View></TouchableHighlight></View></View></View>
             ))
           }
           <Button
            onPress={()=>this.setState({remarks: this.state.remarks.concat([""])})}
            title="ajouter remarque"
            color="#9E9E9E"
            />
         </View>
      );
  }
}

class FileManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files : props.files?props.files:[]
    }
    if(props.idrecipe){
      this.getExistingFile(props.idrecipe);
    }
  }

  getFiles(){
    return this.state.files;
  }

  addFile(file){
    const newArray = this.state.files;
    newArray.push(file);
    this.setState({ files: newArray });
  }

  setUploadFile(index){
    const newArray = this.state.files;
    newArray[index].creation_date=Date.now();
    newArray[index]._id=Date.now();
    this.setState({ files: newArray });
  }

  removeAtIndex(index){
    const newArray = this.state.files;
    if(newArray[index].creation_date){
      const bodySend = JSON.stringify({idFile:newArray[index]._id});
      fetch(Config.URl_REMOVE_FILE, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: bodySend
      }).then((res) => {
        const resJson = JSON.parse(res._bodyText)
        if(resJson.error==Config.NO_ERROR){
          newArray.splice(index,1);
          this.setState({ files: newArray });
        }
        else{
          ToastAndroid.show("Une erreur c'est produite. Veuillez réessayer ultérieurement", ToastAndroid.SHORT);
        }
      }).catch((error) => {
          ToastAndroid.show("Une erreur c'est produite. Veuillez réessayer ultérieurement", ToastAndroid.SHORT);
      });
    }else{
      newArray.splice(index,1);
      this.setState({ files: newArray });
    }
  }

  getExistingFile(idRecipe){
    fetch(Config.URl_GET_EXISTING_FILE+"/"+idRecipe).then((response)=>response.json()).then((responseJson)=>{
      if(responseJson.error==Config.NO_ERROR){
        if(responseJson.data){
          this.setState({files:responseJson.data})
        }
      }
      else{
        ToastAndroid.show("Une erreur c'est produite. Veuillez réessayer ultérieurement", ToastAndroid.SHORT);
      }
    });
  }

  selectFile(){
    const self = this;
    DocumentPicker.show({
        filetype: ["all"],
      },(error,res) => {
        if(!error && res && res.uri){
          const file={
            uri : res.uri,
            type : res.type,
            name : res.fileName,
            size:res.fileSize
          }
          this.addFile(file);
        }
      });
  }

  render() {
       return (
         <View style={styles.remarkContain}>
           {
             this.state.files.map((file,i)=>(
               <View key={i} style={styles.displayElementCanClose}><View><Text style={styles.displayListData}>{file.name}</Text></View><View><TouchableHighlight onPress={()=>{this.removeAtIndex(i)}} style={{padding:10}} underlayColor={"#E1E1E1"}><View><Icon name="md-close" size={24} color="red" /></View></TouchableHighlight></View>{ file.creation_date && <Text style={styles.displayListData}>uploaded</Text>}</View>
             ))
           }
           <Button
            onPress={()=>this.selectFile()}
            title="ajouter fichier"
            color="#9E9E9E"
            />
         </View>
      );
  }
}

const styles = StyleSheet.create({
  remarkContain:{
    marginTop:20,
    marginBottom:20,
  },
  textInputStep:{
    height:40,
    borderColor: 'white',
    borderWidth: 1,
    color:"white",
    marginBottom:10,
    fontSize:15
  },
  displayListData:{
    color:'white',
    fontSize:15,
    marginBottom:5
  },
  displayElementCanClose:{
    flexDirection: 'row',
    alignItems:"center",
    flex:1
  },
  mainInformation:{
    flexDirection: 'row',
  }
});

export {ListCategory,ListCountry,Remark,FileManager,ListDifficulty}
