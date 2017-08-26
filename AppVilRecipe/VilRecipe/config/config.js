Config = {};

Config.KEY_ACCESS_V1 = "3689D3A12EF6CFF358395A6AAEDB5";

Config.URL_START = "http://localhost:3000";

Config.URl_API_V1 = Config.URL_START+ "/v1/"+Config.KEY_ACCESS_V1;

Config.URl_GET_RECIPE =Config.URl_API_V1+"/recipe/get";

/**
ERROR
*/
Config.ERROR_URL = 100;


module.exports = Config;
