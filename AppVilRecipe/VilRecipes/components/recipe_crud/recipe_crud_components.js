import React , { Component }from 'react';
import { TouchableHighlight,Button,StyleSheet, TextInput,  ActivityIndicator, ListView, Text, View } from 'react-native';
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
    this.getCateogryList();
  }
  getCateogryList(){
    fetch(Config.URl_GET_CATEGORY).then((response)=>response.json()).then((responseJson)=>{
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1._id !== r2._id});
      this.setState({
        isLoading: false,
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

       return (
         <View>
           <ListView
             dataSource={this.state.dataSource}
             renderRow={this.renderCategory.bind(this)}
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
    this.getCountryList();
  }
  getCountryList(){
    fetch(Config.URl_GET_COUNTRY).then((response)=>response.json()).then((responseJson)=>{
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1._id !== r2._id});
      this.setState({
        isLoading: false,
        dataSource: ds.cloneWithRows(responseJson.data),
        country_selected : {}
      });
    });
  }
  renderCountry(country){
    return(
      <Text onPress={()=>this.callback(country)} style={styles.displayListData}>{country.name}</Text>
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
         <View >
           <ListView
             dataSource={this.state.dataSource}
             renderRow={this.renderCountry.bind(this)}
           />
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
    this.setState({ files: newArray });
  }

  removeAtIndex(index){
    const newArray = this.state.files;
    newArray.splice(index,1);
    this.setState({ files: newArray });
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
  }
});

export {ListCategory,ListCountry,Remark,FileManager}
