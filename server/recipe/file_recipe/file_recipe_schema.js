var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var fs = require('fs');
var Config = app_require('config/config');
var mkdirp = require('mkdirp');

var RecipeFileSchema = new Schema({
	name: { type: String},
	recipe_id : {type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'},
  creation_date : {type: Date, default: Date.now},
  update_date : {type:Date},
	delete_date : {type: Date, default: null},
});


RecipeFileSchema.statics.saveRecipeFile = function(file,filename,recipeName,recipeId,res){
	const self = this;
	mkdirp(path_work('public/recipe/'+recipeId), function(err) {
		const ext = filename.split("\.");
		const nameRecipe = recipeName+"."+ ext[ext.length-1] ;
		if(fs.existsSync(path_work('public/recipe/'+recipeId+'/' + nameRecipe))) {
		   fs.unlink(path_work('public/recipe/'+recipeId+'/' + nameRecipe));
		}
		const fstream = fs.createWriteStream(path_work('public/recipe/'+recipeId+'/' + nameRecipe));
		file.pipe(fstream);
		fstream.on('close', function () {
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

	});

};

module.exports = mongoose.model('RecipeFile', RecipeFileSchema);
