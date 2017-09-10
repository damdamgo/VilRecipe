var express = require('express');
var router = express.Router();
var RecipeCategory = app_require('recipe/category_recipe/category_recipe_schema');
var Config = app_require('config/config');

router.get('/get/all', function (req, res) {
  RecipeCategory.find({}, null, {sort: {name: 1}},function(err,recipeCategories){
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

router.get('/get/:ID_MAIN_CATEGORY',function(req,res){
  RecipeCategory.find({main_category_id:req.params.ID_MAIN_CATEGORY}, null, {sort: {name: 1}},function(err,recipeCategories){
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
