var express = require('express');
var router = express.Router();
var RecipeFile = app_require('recipe/file_recipe/file_recipe_schema');
var Config = app_require('config/config');
var Recipe = app_require('recipe/recipe_schema');

router.get('/get/:ID_RECIPE', function (req, res) {
  if (req.params.ID_RECIPE) {
    RecipeFile.find({recipe_id:req.params.ID_RECIPE},function(err,fileRecipe){
      if(err){
        let jsonAnswer = {"data":null,"error":Config.ERROR_INTERNAL};
        res.send(jsonAnswer);
      }
      else{
        let jsonAnswer = {"data":fileRecipe,"error":Config.NO_ERROR};
        res.send(jsonAnswer);
      }
    })
  }else{
    let jsonAnswer = {"data":recipes,"error":Config.DATA_EXPECTED};
    res.send(jsonAnswer);
  }
});

router.post('/add/:ID_RECIPE', function (req, res) {
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
              RecipeFile.saveRecipeFile(file,filename,recipe._id+"_" +Date.now(),recipe._id,res);
          }
        })
      });
      req.pipe(req.busboy);
    }else{
      let jsonAnswer = {"data":recipes,"error":Config.DATA_EXPECTED};
      res.send(jsonAnswer);
    }
})

router.post('/remove',function(req,res){
  if(req.body.idFile){
    RecipeFile.update({_id:req.body.idFile}, { $set: { delete_date: new Date()}}, function(err,update) {
      if(err){
        let jsonAnswer = {"data":null,"error":Config.ERROR_INTERNAL};
        res.send(jsonAnswer);
      }
      else{
        let jsonAnswer = {"data":null,"error":Config.NO_ERROR};
        res.send(jsonAnswer);
      }
    });
  }else{
    let jsonAnswer = {"data":recipes,"error":Config.DATA_EXPECTED};
    res.send(jsonAnswer);
  }
})

router.get('/download/:NAME_FILE', function (req, res) {
  if (req.params.NAME_FILE) {
    const nameFile =req.params.NAME_FILE;
    const idRecipe = nameFile.split("_")[0];
    const file = path_work("public/recipe/"+idRecipe+"/"+nameFile);
    res.download(file);
  }
})

module.exports = router;
