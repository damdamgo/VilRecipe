var express = require('express');
var router = express.Router();
var Country = app_require('country/country_schema');
var Config = app_require('config/config');

router.get('/get/all', function (req, res) {
  Country.find({}, null, {sort: {"info.name": 1}},function(err,countries){
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

router.get('/get/:CODE_CONTINENT', function (req, res) {
  Country.find({"info.continent":req.params.CODE_CONTINENT}, null, {sort: {"info.name": 1}},function(err,countries){
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
