var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CountrySchema = new Schema({
	name: { type: String},
  code : {type:String},
  creation_date : {type: Date, default: Date.now},
  update_date : {type:Date},
});

module.exports = mongoose.model('Country', CountrySchema);
