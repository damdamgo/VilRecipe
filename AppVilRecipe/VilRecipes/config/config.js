Config = {};

Config.KEY_ACCESS_V1 = "3689D3A12EF6CFF358395A6AAEDB5";

Config.URL_START = "http://192.168.1.40:3000";

Config.URl_API_V1 = Config.URL_START+ "/api/v1/"+Config.KEY_ACCESS_V1;

Config.URl_ADD_RECIPE = Config.URl_API_V1+"/recipe/add";
Config.URl_GET_RECIPE =Config.URl_API_V1+"/recipe/get";
Config.URl_ADD_FILE_RECIPE =Config.URl_API_V1+"/file/add";
Config.URl_GET_CATEGORY =Config.URl_API_V1+"/category/get";
Config.URl_GET_DIFFICULTY =Config.URl_API_V1+"/difficulty/get";
Config.URl_GET_COUNTRY =Config.URl_API_V1+"/country/get";
Config.URl_GET_EXISTING_FILE = Config.URl_API_V1+"/file/get";
Config.URl_REMOVE_FILE = Config.URl_API_V1+"/file/remove";
Config.URl_UPDATE_RECIPE = Config.URl_API_V1+"/recipe/update";
Config.URL_DOWNLOAD_RECIPE = Config.URl_API_V1+"/file/download";
/**
ERROR
*/
Config.ERROR_URL = 100;
Config.ERROR_INTERNAL = 99;
Config.DATA_EXPECTED = 98;
Config.ERROR_DB = 97;
Config.NO_ERROR = 0;


module.exports = Config;
