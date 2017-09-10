var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecipeCategorySchema = new Schema({
	name: { type: String},
  creation_date : {type: Date, default: Date.now},
  update_date : {type:Date},
	main_category_id : {type: mongoose.Schema.Types.ObjectId, ref: 'RecipeMainCategory'},
});

module.exports = mongoose.model('RecipeCategory', RecipeCategorySchema);
