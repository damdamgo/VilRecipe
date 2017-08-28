var express = require('express');
var router = express.Router();
var RecipeCategory = app_require('recipe/category_recipe/category_recipe_schema');
var Config = app_require('config/config');

router.get('/get', function (req, res) {
  RecipeCategory.find({},function(err,recipeCategories){
    if(err){
      let jsonAnswer = {"data":null,"error":Config.ERROR_INTERNAL};
      res.send(jsonAnswer);
    }
    else{
      let jsonAnswer = {"data":recipeCategories,"error":Config.NO_ERROR};
      res.send(jsonAnswer);
    }
  })
})

module.exports = router;
