var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecipeDifficultySchema = new Schema({
	name: { type: String},
  level : {type:Number},
  creation_date : {type: Date, default: Date.now},
  update_date : {type:Date},
});

module.exports = mongoose.model('RecipeDifficulty', RecipeDifficultySchema);
