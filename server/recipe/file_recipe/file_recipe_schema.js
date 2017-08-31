var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var fs = require('fs');
var Config = app_require('config/config');

var RecipeFileSchema = new Schema({
	name: { type: String},
	recipe_id : {type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'},
  creation_date : {type: Date, default: Date.now},
  update_date : {type:Date},
});


RecipeFileSchema.statics.saveRecipeFile = function(file,filename,recipeName,recipeId,res){
	const ext = filename.split("\.");
	const nameRecipe = recipeName+"."+ ext[ext.length-1] ;
	const fstream = fs.createWriteStream(path_work('public/recipe/' + nameRecipe));
	file.pipe(fstream);
	console.log("pipe");
	const self = this;
	fstream.on('close', function () {
		console.log("pipe close");
		const fileRecipe = new self({
			name:nameRecipe,
			recipe_id:recipeId,
		});
		fileRecipe.save(function(err,recipe){
      if(err){
        jsonAnswer = {"data":null,"error":Config.ERROR_DB};
        res.send(jsonAnswer);
      }
      else{
        jsonAnswer = {"data":recipe,"error":Config.NO_ERROR};
        res.send(jsonAnswer);
      }
    });
	})
};

module.exports = mongoose.model('RecipeFile', RecipeFileSchema);
