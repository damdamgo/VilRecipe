var express = require('express');
var router = express.Router();
var Recipe = app_require('recipe/recipe_schema');
var Config = app_require('config/config');

router.post('/add', function (req, res) {

})

router.get('/get', function (req, res) {
  Recipe.find({},function(err,recipes){
    if(err){
      let jsonAnswer = {"data":null,"error":Config.ERROR_INTERNAL};
      res.send(jsonAnswer);
    }
    else{
      let jsonAnswer = {"data":recipes,"error":Config.NO_ERROR};
      res.send(jsonAnswer);
    }
  })
})


module.exports = router;
