var express = require('express');
var router = express.Router();
var Country = app_require('country/country_schema');
var Config = app_require('config/config');

router.get('/get', function (req, res) {
  Country.find({},function(err,countries){
    if(err){
      let jsonAnswer = {"data":null,"error":Config.ERROR_INTERNAL};
      res.send(jsonAnswer);
    }
    else{
      let jsonAnswer = {"data":countries,"error":Config.NO_ERROR};
      res.send(jsonAnswer);
    }
  })
})

module.exports = router;
