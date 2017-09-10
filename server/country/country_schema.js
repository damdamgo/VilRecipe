var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CountrySchema = new Schema({
	code:{type:String},
	info: {
		name: {type:String},
		native: {type:String},
		phone: {type:String},
		continent: {type:String},
		capital: {type:String},
		currency: {type:String},
		languages: {type:[String]}
	},
  creation_date : {type: Date, default: Date.now},
  update_date : {type:Date},
});

module.exports = mongoose.model('Country', CountrySchema);
