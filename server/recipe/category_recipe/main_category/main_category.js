var express = require('express');
var router = express.Router();
var RecipeMainCategory = app_require('recipe/category_recipe/main_category/main_category_schema');
var Config = app_require('config/config');

router.get('/get', function (req, res) {
  RecipeMainCategory.find({}, null, {sort: {name: -1}},function(err,recipeMainCategories){
    if(err){
      let jsonAnswer = {"data":null,"error":Config.ERROR_INTERNAL};
      res.send(jsonAnswer);
    }
    else{
      let jsonAnswer = {"data":recipeMainCategories,"error":Config.NO_ERROR};
      res.send(jsonAnswer);
    }
  })
})

module.exports = router;
