global.app_require = function(name) {
    return require(__dirname + '/' + name);
}
var Config = app_require('config/config');
var mongoManager = app_require('mongo_manager/mongo_manager');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

mongoManager.connectToServer(function(){
  startServer();
});

function startServer(){
  //check connection
  app.use('/api/v1/:ACCESS_CODE/*',function(req,res,next){
    if(req.params.ACCESS_CODE!==Config.KEY_ACCESS_V1 ){
      let jsonAnswer = {"data":null,"error":Config.ERROR_URL};
      res.send(jsonAnswer);
    }
    else next();
  })
  ///Recipe
  var recipe = app_require('./recipe/recipe');
  app.use('/api/v1/:ACCESS_CODE/recipe', recipe);
  //launch the server
  app.listen(3000, function () {
  });
}
