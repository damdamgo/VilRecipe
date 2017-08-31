var express = require('express');
var router = express.Router();
var Recipe = app_require('recipe/recipe_schema');
var RecipeFile = app_require('recipe/file_recipe/file_recipe_schema');
var Config = app_require('config/config');

router.post('/add/file/:ID_RECIPE', function (req, res) {
  console.log("addRecipe");
  if (req.busboy && req.params.ID_RECIPE) {
      req.busboy.on('file', function(fieldname, f, fname, encoding, mimetype){
        const file = f;
        const filename = fname;
        Recipe.findOne({_id:req.params.ID_RECIPE},function(err,recipe){
          if(err || !recipe){
            jsonAnswer = {"data":null,"error":Config.ERROR_DB};
            res.send(jsonAnswer);
          }
          else{
              RecipeFile.saveRecipeFile(file,filename,recipe._id+"_" +Date.now()+"_" +recipe.name,recipe._id,res);
          }
        })
      });
      req.pipe(req.busboy);
      }
})

router.post('/remove/file',function(req,res){

})

router.post('/add/recipe',function(req,res){
  if(req.body && req.body.recipe){
    let recipeReq = req.body.recipe;
    let newRecipe = new Recipe({
      name:recipeReq.name,
      recipe_country_id:recipeReq.country._id,
      recipe_category_id:recipeReq.category._id,
      remarks:recipeReq.remarks
    });
    newRecipe.save(function(err,recipe){
          if(err){
            jsonAnswer = {"data":null,"error":Config.ERROR_DB};
            res.send(jsonAnswer);
          }
          else{
            jsonAnswer = {"data":recipe,"error":Config.NO_ERROR};
            res.send(jsonAnswer);
          }
        });
  }
  else{
    let jsonAnswer = {"data":recipes,"error":Config.DATA_EXPECTED};
    res.send(jsonAnswer);
  }
});

router.post('update/recipe',function(req,res){
  
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
