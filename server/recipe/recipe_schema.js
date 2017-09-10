var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecipeSchema = new Schema({
	name: { type: String},
  recipe_country_id : {type: mongoose.Schema.Types.ObjectId, ref: 'Country'},
  creation_date : {type: Date, default: Date.now},
  update_date : {type:Date},
  delete_date : {type: Date, default: null},
	recipe_category_id : {type: mongoose.Schema.Types.ObjectId, ref: 'RecipeCategory'},
	remarks : {type:[String]},
	time : {preparation:{hour:{type:Number},minute:{type:Number}},cooking:{hour:{type:Number},minute:{type:Number}}},
	people:{type:Number},
	recipe_difficulty_id : {type: mongoose.Schema.Types.ObjectId, ref: 'RecipeDifficulty'},
});



module.exports = mongoose.model('Recipe', RecipeSchema);
