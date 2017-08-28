import React , { Component }from 'react';
import { TouchableHighlight,Button,StyleSheet, TextInput,  ActivityIndicator, ListView, Text, View } from 'react-native';
import Config from 'VilRecipes/config/config';

class ListCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading : true
    }
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
             renderRow={(rowData) => <Text style={styles.displayListData}>{rowData.name}</Text>}
           />
         </View>
       );
  }
}

class ListCountry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading : true
    }
    this.getCountryList();
  }
  getCountryList(){
    fetch(Config.URl_GET_COUNTRY).then((response)=>response.json()).then((responseJson)=>{
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1._id !== r2._id});
      this.setState({
        isLoading: false,
        dataSource: ds.cloneWithRows(responseJson.data),
      });
    });
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
             renderRow={(rowData) => <Text style={styles.displayListData}>{rowData.name}</Text>}
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

  render() {
       return (
         <View style={styles.remarkContain}>
           {
             this.state.remarks.map((data,i)=>(
               <View key={i}><TextInput style={styles.textInputStep} underlineColorAndroid={"transparent"} onChangeText={(text) =>this.updateValueArray(i,text)} value={this.state.remarks[i]}/></View>
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

const styles = StyleSheet.create({
  remarkContain:{
    marginTop:20,
    marginBottom:20
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
  }
});

export {ListCategory,ListCountry,Remark}
