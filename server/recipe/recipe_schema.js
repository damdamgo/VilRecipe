var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecipeSchema = new Schema({
	name: { type: String},
  recipe_country_id : {type: mongoose.Schema.Types.ObjectId, ref: 'Country'},
  creation_date : {type: Date, default: Date.now},
  update_date : {type:Date},
  delete_date : {type: Date, default: null},
	recipe_category_id : {type: mongoose.Schema.Types.ObjectId, ref: 'RecipeCategory'},
	remarks : {type:[String]}
});



module.exports = mongoose.model('Recipe', RecipeSchema);
