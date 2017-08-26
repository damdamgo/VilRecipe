var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecipeCategorySchema = new Schema({
	name: { type: String},
  creation_date : {type: Date, default: Date.now},
  update_date : {type:Date},
});

module.exports = mongoose.model('RecipeCategory', RecipeCategorySchema);
