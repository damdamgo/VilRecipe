var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecipeSchema = new Schema({
	name: { type: String},
  country : {type:String},
  creation_date : {type: Date, default: Date.now},
  update_date : {type:Date},
  delete_date : {type: Date, default: null},
	recipe_category_id : {type: mongoose.Schema.Types.ObjectId, ref: 'RecipeCategory'},
	remark : {type:String}
});



module.exports = mongoose.model('Recipe', RecipeSchema);
