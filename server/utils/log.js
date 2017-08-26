/*
log manager to save error, debug and other data
*/
var Log = {};

Log.writeErr = function(name,text){
  console.log("name : "+" text : "+text);
}

module.exports = Log;
