var mongoose = require('mongoose');
const config = app_require('config/config');
const log = app_require('utils/log');
var MongoManager = {};

MongoManager.connectToServer = function(callback){
	mongoose.connect(config.MONGO_URI,function(err){
		if(err){
			log.writeErr("mongoConnection","error to connect mongoose " + err);
		}
		else{
			callback();
		}
	});
}




module.exports = MongoManager;
