var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecipeFileSchema = new Schema({
	name: { type: String},
	recipe_id : {type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'},
  creation_date : {type: Date, default: Date.now},
  update_date : {type:Date},
});

module.exports = mongoose.model('RecipeFile', RecipeFileSchema);
