global.app_require = function(name) {
    return require(__dirname + '/' + name);
}
global.path_work = function(name){
  return __dirname + '/' + name;
}
var Config = app_require('config/config');
var mongoManager = app_require('mongo_manager/mongo_manager');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var busboy = require('connect-busboy');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(busboy());

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
  var recipe = app_require('recipe/recipe');
  app.use('/api/v1/:ACCESS_CODE/recipe', recipe);
  //category_recipe
  var recipeCategories = app_require("recipe/category_recipe/category_recipe");
  app.use('/api/v1/:ACCESS_CODE/category', recipeCategories);
  //country
  var recipeCountry = app_require("country/country");
  app.use('/api/v1/:ACCESS_CODE/country', recipeCountry);
  //file recipe
  var recipeFile = app_require("recipe/file_recipe/file_recipe");
  app.use('/api/v1/:ACCESS_CODE/file', recipeFile);
  //recipe difficulty_recipe
  var recipeDifficulty = app_require("recipe/difficulty_recipe/difficulty_recipe");
  app.use('/api/v1/:ACCESS_CODE/difficulty', recipeDifficulty);
  //defaut
  app.get('/', function (req, res) {
    res.render({"default":"default"});
  });
  //launch the server
  app.listen(3000, '0.0.0.0', function () {
  });
}
