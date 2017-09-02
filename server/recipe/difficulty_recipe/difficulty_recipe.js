var express = require('express');
var router = express.Router();
var RecipeDifficulty = app_require('recipe/difficulty_recipe/difficulty_recipe_schema');
var Config = app_require('config/config');

router.get('/get', function (req, res) {
  RecipeDifficulty.find({},function(err,recipeDifficulty){
    if(err){
      let jsonAnswer = {"data":null,"error":Config.ERROR_INTERNAL};
      res.send(jsonAnswer);
    }
    else{
      let jsonAnswer = {"data":recipeDifficulty,"error":Config.NO_ERROR};
      res.send(jsonAnswer);
    }
  })
})

module.exports = router;
