var express = require('express');
var router = express.Router();
var Recipe = app_require('recipe/recipe_schema');
var Config = app_require('config/config');

router.post('/add',function(req,res){
  if(req.body && req.body.recipe){
    let recipeReq = req.body.recipe;
    let newRecipe = new Recipe({
      name:recipeReq.name,
      recipe_country_id:recipeReq.country._id,
      recipe_category_id:recipeReq.category._id,
      recipe_difficulty_id:recipeReq.difficulty._id,
      remarks:recipeReq.remarks,
      cost:recipeReq.cost,
      time:recipeReq.time,
      people:recipeReq.people
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

router.post('/update',function(req,res){
  if(req.body && req.body.recipe){
    let recipeReq = req.body.recipe;
    Recipe.update({ _id: recipeReq._id }, { $set: { name: recipeReq.name,recipe_country_id:recipeReq.country._id,recipe_category_id:recipeReq.category._id,remarks:recipeReq.remarks ,time:recipeReq.time,cost:recipeReq.cost,people:recipeReq.people,  recipe_difficulty_id:recipeReq.difficulty._id}}, function(err,recipe){
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

router.get('/get', function (req, res) {
  Recipe.find({}).populate('recipe_country_id').populate('recipe_category_id').populate('recipe_difficulty_id').exec(function(err,recipes){
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
