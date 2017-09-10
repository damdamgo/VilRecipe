global.app_require = function(name) {
    return require(__dirname + '/../' + name);
}
var Config = app_require('config/config');
var mongoManager = app_require('mongo_manager/mongo_manager');
var RecipeCategory = app_require('recipe/category_recipe/category_recipe_schema');
var RecipeDifficulty = app_require('recipe/difficulty_recipe/difficulty_recipe_schema');
var Country = app_require('country/country_schema');
var RecipeMainCategory = app_require('recipe/category_recipe/main_category/main_category_schema');

mongoManager.connectToServer(function(){
  dropTable();
});



/*

WARNING RUN THIS CODE ONLY ONCE BECAUSE THE ID ARE USED IN RECIPE

*/
function dropTable(){
  RecipeMainCategory.remove({},function(err,res){
    RecipeCategory.remove({},function(err,res){
      Country.remove({},function(err,res){
        RecipeDifficulty.remove({},function(err,res){
          insertTable();
        });
      });
    });
  });
  //insertTable();
}

function insertTable(){

  RecipeMainCategory.create({"name":"Apéro"},function(err,mainCategory){
    const idMain = mainCategory._id;
    RecipeCategory.create({"name":"Cocktail",main_category_id:idMain});
    RecipeCategory.create({"name":"Verrine",main_category_id:idMain});
    RecipeCategory.create({"name":"Amuse bouche",main_category_id:idMain});
    RecipeCategory.create({"name":"Apéro",main_category_id:idMain});
  })
  RecipeMainCategory.create({"name":"Entrée"},function(err,mainCategory){
    const idMain = mainCategory._id;
    RecipeCategory.create({"name":"Entrée",main_category_id:idMain});
    RecipeCategory.create({"name":"Cake salé",main_category_id:idMain});
    RecipeCategory.create({"name":"Tarte salée",main_category_id:idMain});
    RecipeCategory.create({"name":"Soupe",main_category_id:idMain});
    RecipeCategory.create({"name":"Salade",main_category_id:idMain});
  })
  RecipeMainCategory.create({"name":"Plat"},function(err,mainCategory){
    const idMain = mainCategory._id;
    RecipeCategory.create({"name":"Plat",main_category_id:idMain});
    RecipeCategory.create({"name":"Crustacé",main_category_id:idMain});
    RecipeCategory.create({"name":"Poisson",main_category_id:idMain});
    RecipeCategory.create({"name":"Gibier",main_category_id:idMain});
    RecipeCategory.create({"name":"Volaille",main_category_id:idMain});
    RecipeCategory.create({"name":"Porc",main_category_id:idMain});
    RecipeCategory.create({"name":"Boeuf",main_category_id:idMain});
    RecipeCategory.create({"name":"Mouton",main_category_id:idMain});
    RecipeCategory.create({"name":"Accompagnement",main_category_id:idMain});
  })
  RecipeMainCategory.create({"name":"Sauce"},function(err,mainCategory){
    const idMain = mainCategory._id;
    RecipeCategory.create({"name":"Sauce",main_category_id:idMain});

  })
  RecipeMainCategory.create({"name":"Dessert"},function(err,mainCategory){
    const idMain = mainCategory._id;
    RecipeCategory.create({"name":"Dessert",main_category_id:idMain});
    RecipeCategory.create({"name":"Gâteau",main_category_id:idMain});
    RecipeCategory.create({"name":"Tarte",main_category_id:idMain});
    RecipeCategory.create({"name":"Entremet",main_category_id:idMain});
    RecipeCategory.create({"name":"Glace/Sorbet",main_category_id:idMain});
    RecipeCategory.create({"name":"Pâtisserie",main_category_id:idMain});
    RecipeCategory.create({"name":"Viennoiserie",main_category_id:idMain});
  })

  const arrayDifficulty = [{
    name:"Très Facile",
    level:1
  },{
    name:"Facile",
    level:2
  },{
    name:"Moyen",
    level:3
  },{
    name:"Difficile",
    level:4
  },{
    name:"Confirmé",
    level:5
  }]
  arrayDifficulty.forEach(function(data){
    RecipeDifficulty.create(data);
  });

  const arrayCountry = [
  {code:"AD",info: {
    "name": "Andorra",
    "native": "Andorra",
    "phone": "376",
    "continent": "EU",
    "capital": "Andorra la Vella",
    "currency": "EUR",
    "languages": [
      "ca"
  ]}},{code:"AE",info: {
    "name": "United Arab Emirates",
    "native": "دولة الإمارات العربية المتحدة",
    "phone": "971",
    "continent": "AS",
    "capital": "Abu Dhabi",
    "currency": "AED",
    "languages": [
      "ar"
  ]}},{code:"AF",info: {
    "name": "Afghanistan",
    "native": "افغانستان",
    "phone": "93",
    "continent": "AS",
    "capital": "Kabul",
    "currency": "AFN",
    "languages": [
      "ps",
      "uz",
      "tk"
  ]}},{code:"AG",info: {
    "name": "Antigua and Barbuda",
    "native": "Antigua and Barbuda",
    "phone": "1268",
    "continent": "NA",
    "capital": "Saint John's",
    "currency": "XCD",
    "languages": [
      "en"
  ]}},{code:"AI",info: {
    "name": "Anguilla",
    "native": "Anguilla",
    "phone": "1264",
    "continent": "NA",
    "capital": "The Valley",
    "currency": "XCD",
    "languages": [
      "en"
  ]}},{code:"AL",info: {
    "name": "Albania",
    "native": "Shqipëria",
    "phone": "355",
    "continent": "EU",
    "capital": "Tirana",
    "currency": "ALL",
    "languages": [
      "sq"
  ]}},{code:"AM",info: {
    "name": "Armenia",
    "native": "Հայաստան",
    "phone": "374",
    "continent": "AS",
    "capital": "Yerevan",
    "currency": "AMD",
    "languages": [
      "hy",
      "ru"
  ]}},{code:"AO",info: {
    "name": "Angola",
    "native": "Angola",
    "phone": "244",
    "continent": "AF",
    "capital": "Luanda",
    "currency": "AOA",
    "languages": [
      "pt"
  ]}},{code:"AQ",info: {
    "name": "Antarctica",
    "native": "Antarctica",
    "phone": "",
    "continent": "AN",
    "capital": "",
    "currency": "",
    "languages": []}},
    {code:"AR",info: {
    "name": "Argentina",
    "native": "Argentina",
    "phone": "54",
    "continent": "SA",
    "capital": "Buenos Aires",
    "currency": "ARS",
    "languages": [
      "es",
      "gn"
  ]}},{code:"AS",info: {
    "name": "American Samoa",
    "native": "American Samoa",
    "phone": "1684",
    "continent": "OC",
    "capital": "Pago Pago",
    "currency": "USD",
    "languages": [
      "en",
      "sm"
  ]}},{code:"AT",info: {
    "name": "Austria",
    "native": "Österreich",
    "phone": "43",
    "continent": "EU",
    "capital": "Vienna",
    "currency": "EUR",
    "languages": [
      "de"
  ]}},{code:"AU",info: {
    "name": "Australia",
    "native": "Australia",
    "phone": "61",
    "continent": "OC",
    "capital": "Canberra",
    "currency": "AUD",
    "languages": [
      "en"
  ]}},{code:"AW",info: {
    "name": "Aruba",
    "native": "Aruba",
    "phone": "297",
    "continent": "NA",
    "capital": "Oranjestad",
    "currency": "AWG",
    "languages": [
      "nl",
      "pa"
  ]}},{code:"AX",info: {
    "name": "Åland",
    "native": "Åland",
    "phone": "358",
    "continent": "EU",
    "capital": "Mariehamn",
    "currency": "EUR",
    "languages": [
      "sv"
  ]}},{code:"AZ",info: {
    "name": "Azerbaijan",
    "native": "Azərbaycan",
    "phone": "994",
    "continent": "AS",
    "capital": "Baku",
    "currency": "AZN",
    "languages": [
      "az"
  ]}},{code:"BA",info: {
    "name": "Bosnia and Herzegovina",
    "native": "Bosna i Hercegovina",
    "phone": "387",
    "continent": "EU",
    "capital": "Sarajevo",
    "currency": "BAM",
    "languages": [
      "bs",
      "hr",
      "sr"
  ]}},{code:"BB",info: {
    "name": "Barbados",
    "native": "Barbados",
    "phone": "1246",
    "continent": "NA",
    "capital": "Bridgetown",
    "currency": "BBD",
    "languages": [
      "en"
  ]}},{code:"BD",info: {
    "name": "Bangladesh",
    "native": "Bangladesh",
    "phone": "880",
    "continent": "AS",
    "capital": "Dhaka",
    "currency": "BDT",
    "languages": [
      "bn"
  ]}},{code:"BE",info: {
    "name": "Belgium",
    "native": "België",
    "phone": "32",
    "continent": "EU",
    "capital": "Brussels",
    "currency": "EUR",
    "languages": [
      "nl",
      "fr",
      "de"
  ]}},{code:"BF",info: {
    "name": "Burkina Faso",
    "native": "Burkina Faso",
    "phone": "226",
    "continent": "AF",
    "capital": "Ouagadougou",
    "currency": "XOF",
    "languages": [
      "fr",
      "ff"
  ]}},{code:"BG",info: {
    "name": "Bulgaria",
    "native": "България",
    "phone": "359",
    "continent": "EU",
    "capital": "Sofia",
    "currency": "BGN",
    "languages": [
      "bg"
  ]}},{code:"BH",info: {
    "name": "Bahrain",
    "native": "‏البحرين",
    "phone": "973",
    "continent": "AS",
    "capital": "Manama",
    "currency": "BHD",
    "languages": [
      "ar"
  ]}},{code:"BI",info: {
    "name": "Burundi",
    "native": "Burundi",
    "phone": "257",
    "continent": "AF",
    "capital": "Bujumbura",
    "currency": "BIF",
    "languages": [
      "fr",
      "rn"
  ]}},{code:"BJ",info: {
    "name": "Benin",
    "native": "Bénin",
    "phone": "229",
    "continent": "AF",
    "capital": "Porto-Novo",
    "currency": "XOF",
    "languages": [
      "fr"
  ]}},{code:"BL",info: {
    "name": "Saint Barthélemy",
    "native": "Saint-Barthélemy",
    "phone": "590",
    "continent": "NA",
    "capital": "Gustavia",
    "currency": "EUR",
    "languages": [
      "fr"
  ]}},{code:"BM",info: {
    "name": "Bermuda",
    "native": "Bermuda",
    "phone": "1441",
    "continent": "NA",
    "capital": "Hamilton",
    "currency": "BMD",
    "languages": [
      "en"
  ]}},{code:"BN",info: {
    "name": "Brunei",
    "native": "Negara Brunei Darussalam",
    "phone": "673",
    "continent": "AS",
    "capital": "Bandar Seri Begawan",
    "currency": "BND",
    "languages": [
      "ms"
  ]}},{code:"BO",info: {
    "name": "Bolivia",
    "native": "Bolivia",
    "phone": "591",
    "continent": "SA",
    "capital": "Sucre",
    "currency": "BOB,BOV",
    "languages": [
      "es",
      "ay",
      "qu"
  ]}},{code:"BQ",info: {
    "name": "Bonaire",
    "native": "Bonaire",
    "phone": "5997",
    "continent": "NA",
    "capital": "Kralendijk",
    "currency": "USD",
    "languages": [
      "nl"
  ]}},{code:"BR",info: {
    "name": "Brazil",
    "native": "Brasil",
    "phone": "55",
    "continent": "SA",
    "capital": "Brasília",
    "currency": "BRL",
    "languages": [
      "pt"
  ]}},{code:"BS",info: {
    "name": "Bahamas",
    "native": "Bahamas",
    "phone": "1242",
    "continent": "NA",
    "capital": "Nassau",
    "currency": "BSD",
    "languages": [
      "en"
  ]}},{code:"BT",info: {
    "name": "Bhutan",
    "native": "ʼbrug-yul",
    "phone": "975",
    "continent": "AS",
    "capital": "Thimphu",
    "currency": "BTN,INR",
    "languages": [
      "dz"
  ]}},{code:"BV",info: {
    "name": "Bouvet Island",
    "native": "Bouvetøya",
    "phone": "",
    "continent": "AN",
    "capital": "",
    "currency": "NOK",
    "languages": []}},{code:"BW",info: {
    "name": "Botswana",
    "native": "Botswana",
    "phone": "267",
    "continent": "AF",
    "capital": "Gaborone",
    "currency": "BWP",
    "languages": [
      "en",
      "tn"
  ]}},{code:"BY",info: {
    "name": "Belarus",
    "native": "Белару́сь",
    "phone": "375",
    "continent": "EU",
    "capital": "Minsk",
    "currency": "BYR",
    "languages": [
      "be",
      "ru"
  ]}},{code:"BZ",info: {
    "name": "Belize",
    "native": "Belize",
    "phone": "501",
    "continent": "NA",
    "capital": "Belmopan",
    "currency": "BZD",
    "languages": [
      "en",
      "es"
  ]}},{code:"CA",info: {
    "name": "Canada",
    "native": "Canada",
    "phone": "1",
    "continent": "NA",
    "capital": "Ottawa",
    "currency": "CAD",
    "languages": [
      "en",
      "fr"
  ]}},{code:"CC",info: {
    "name": "Cocos [Keeling] Islands",
    "native": "Cocos (Keeling) Islands",
    "phone": "61",
    "continent": "AS",
    "capital": "West Island",
    "currency": "AUD",
    "languages": [
      "en"
  ]}},{code:"CD",info: {
    "name": "Democratic Republic of the Congo",
    "native": "République démocratique du Congo",
    "phone": "243",
    "continent": "AF",
    "capital": "Kinshasa",
    "currency": "CDF",
    "languages": [
      "fr",
      "ln",
      "kg",
      "sw",
      "lu"
  ]}},{code:"CF",info: {
    "name": "Central African Republic",
    "native": "Ködörösêse tî Bêafrîka",
    "phone": "236",
    "continent": "AF",
    "capital": "Bangui",
    "currency": "XAF",
    "languages": [
      "fr",
      "sg"
  ]}},{code:"CG",info: {
    "name": "Republic of the Congo",
    "native": "République du Congo",
    "phone": "242",
    "continent": "AF",
    "capital": "Brazzaville",
    "currency": "XAF",
    "languages": [
      "fr",
      "ln"
  ]}},{code:"CH",info: {
    "name": "Switzerland",
    "native": "Schweiz",
    "phone": "41",
    "continent": "EU",
    "capital": "Bern",
    "currency": "CHE,CHF,CHW",
    "languages": [
      "de",
      "fr",
      "it"
  ]}},{code:"CI",info: {
    "name": "Ivory Coast",
    "native": "Côte d'Ivoire",
    "phone": "225",
    "continent": "AF",
    "capital": "Yamoussoukro",
    "currency": "XOF",
    "languages": [
      "fr"
  ]}},{code:"CK",info: {
    "name": "Cook Islands",
    "native": "Cook Islands",
    "phone": "682",
    "continent": "OC",
    "capital": "Avarua",
    "currency": "NZD",
    "languages": [
      "en"
  ]}},{code:"CL",info: {
    "name": "Chile",
    "native": "Chile",
    "phone": "56",
    "continent": "SA",
    "capital": "Santiago",
    "currency": "CLF,CLP",
    "languages": [
      "es"
  ]}},{code:"CM",info: {
    "name": "Cameroon",
    "native": "Cameroon",
    "phone": "237",
    "continent": "AF",
    "capital": "Yaoundé",
    "currency": "XAF",
    "languages": [
      "en",
      "fr"
  ]}},{code:"CN",info: {
    "name": "China",
    "native": "中国",
    "phone": "86",
    "continent": "AS",
    "capital": "Beijing",
    "currency": "CNY",
    "languages": [
      "zh"
  ]}},{code:"CO",info: {
    "name": "Colombia",
    "native": "Colombia",
    "phone": "57",
    "continent": "SA",
    "capital": "Bogotá",
    "currency": "COP",
    "languages": [
      "es"
  ]}},{code:"CR",info: {
    "name": "Costa Rica",
    "native": "Costa Rica",
    "phone": "506",
    "continent": "NA",
    "capital": "San José",
    "currency": "CRC",
    "languages": [
      "es"
  ]}},{code:"CU",info: {
    "name": "Cuba",
    "native": "Cuba",
    "phone": "53",
    "continent": "NA",
    "capital": "Havana",
    "currency": "CUC,CUP",
    "languages": [
      "es"
  ]}},{code:"CV",info: {
    "name": "Cape Verde",
    "native": "Cabo Verde",
    "phone": "238",
    "continent": "AF",
    "capital": "Praia",
    "currency": "CVE",
    "languages": [
      "pt"
  ]}},{code:"CW",info: {
    "name": "Curacao",
    "native": "Curaçao",
    "phone": "5999",
    "continent": "NA",
    "capital": "Willemstad",
    "currency": "ANG",
    "languages": [
      "nl",
      "pa",
      "en"
  ]}},{code:"CX",info: {
    "name": "Christmas Island",
    "native": "Christmas Island",
    "phone": "61",
    "continent": "AS",
    "capital": "Flying Fish Cove",
    "currency": "AUD",
    "languages": [
      "en"
  ]}},{code:"CY",info: {
    "name": "Cyprus",
    "native": "Κύπρος",
    "phone": "357",
    "continent": "EU",
    "capital": "Nicosia",
    "currency": "EUR",
    "languages": [
      "el",
      "tr",
      "hy"
  ]}},{code:"CZ",info: {
    "name": "Czech Republic",
    "native": "Česká republika",
    "phone": "420",
    "continent": "EU",
    "capital": "Prague",
    "currency": "CZK",
    "languages": [
      "cs",
      "sk"
  ]}},{code:"DE",info: {
    "name": "Germany",
    "native": "Deutschland",
    "phone": "49",
    "continent": "EU",
    "capital": "Berlin",
    "currency": "EUR",
    "languages": [
      "de"
  ]}},{code:"DJ",info: {
    "name": "Djibouti",
    "native": "Djibouti",
    "phone": "253",
    "continent": "AF",
    "capital": "Djibouti",
    "currency": "DJF",
    "languages": [
      "fr",
      "ar"
  ]}},{code:"DK",info: {
    "name": "Denmark",
    "native": "Danmark",
    "phone": "45",
    "continent": "EU",
    "capital": "Copenhagen",
    "currency": "DKK",
    "languages": [
      "da"
  ]}},{code:"DM",info: {
    "name": "Dominica",
    "native": "Dominica",
    "phone": "1767",
    "continent": "NA",
    "capital": "Roseau",
    "currency": "XCD",
    "languages": [
      "en"
  ]}},{code:"DO",info: {
    "name": "Dominican Republic",
    "native": "República Dominicana",
    "phone": "1809,1829,1849",
    "continent": "NA",
    "capital": "Santo Domingo",
    "currency": "DOP",
    "languages": [
      "es"
  ]}},{code:"DZ",info: {
    "name": "Algeria",
    "native": "الجزائر",
    "phone": "213",
    "continent": "AF",
    "capital": "Algiers",
    "currency": "DZD",
    "languages": [
      "ar"
  ]}},{code:"EC",info: {
    "name": "Ecuador",
    "native": "Ecuador",
    "phone": "593",
    "continent": "SA",
    "capital": "Quito",
    "currency": "USD",
    "languages": [
      "es"
  ]}},{code:"EE",info: {
    "name": "Estonia",
    "native": "Eesti",
    "phone": "372",
    "continent": "EU",
    "capital": "Tallinn",
    "currency": "EUR",
    "languages": [
      "et"
  ]}},{code:"EG",info: {
    "name": "Egypt",
    "native": "مصر‎",
    "phone": "20",
    "continent": "AF",
    "capital": "Cairo",
    "currency": "EGP",
    "languages": [
      "ar"
  ]}},{code:"EH",info: {
    "name": "Western Sahara",
    "native": "الصحراء الغربية",
    "phone": "212",
    "continent": "AF",
    "capital": "El Aaiún",
    "currency": "MAD,DZD,MRO",
    "languages": [
      "es"
  ]}},{code:"ER",info: {
    "name": "Eritrea",
    "native": "ኤርትራ",
    "phone": "291",
    "continent": "AF",
    "capital": "Asmara",
    "currency": "ERN",
    "languages": [
      "ti",
      "ar",
      "en"
  ]}},{code:"ES",info: {
    "name": "Spain",
    "native": "España",
    "phone": "34",
    "continent": "EU",
    "capital": "Madrid",
    "currency": "EUR",
    "languages": [
      "es",
      "eu",
      "ca",
      "gl",
      "oc"
  ]}},{code:"ET",info: {
    "name": "Ethiopia",
    "native": "ኢትዮጵያ",
    "phone": "251",
    "continent": "AF",
    "capital": "Addis Ababa",
    "currency": "ETB",
    "languages": [
      "am"
  ]}},{code:"FI",info: {
    "name": "Finland",
    "native": "Suomi",
    "phone": "358",
    "continent": "EU",
    "capital": "Helsinki",
    "currency": "EUR",
    "languages": [
      "fi",
      "sv"
  ]}},{code:"FJ",info: {
    "name": "Fiji",
    "native": "Fiji",
    "phone": "679",
    "continent": "OC",
    "capital": "Suva",
    "currency": "FJD",
    "languages": [
      "en",
      "fj",
      "hi",
      "ur"
  ]}},{code:"FK",info: {
    "name": "Falkland Islands",
    "native": "Falkland Islands",
    "phone": "500",
    "continent": "SA",
    "capital": "Stanley",
    "currency": "FKP",
    "languages": [
      "en"
  ]}},{code:"FM",info: {
    "name": "Micronesia",
    "native": "Micronesia",
    "phone": "691",
    "continent": "OC",
    "capital": "Palikir",
    "currency": "USD",
    "languages": [
      "en"
  ]}},{code:"FO",info: {
    "name": "Faroe Islands",
    "native": "Føroyar",
    "phone": "298",
    "continent": "EU",
    "capital": "Tórshavn",
    "currency": "DKK",
    "languages": [
      "fo"
  ]}},{code:"FR",info: {
    "name": "France",
    "native": "France",
    "phone": "33",
    "continent": "EU",
    "capital": "Paris",
    "currency": "EUR",
    "languages": [
      "fr"
  ]}},{code:"GA",info: {
    "name": "Gabon",
    "native": "Gabon",
    "phone": "241",
    "continent": "AF",
    "capital": "Libreville",
    "currency": "XAF",
    "languages": [
      "fr"
  ]}},{code:"GB",info: {
    "name": "United Kingdom",
    "native": "United Kingdom",
    "phone": "44",
    "continent": "EU",
    "capital": "London",
    "currency": "GBP",
    "languages": [
      "en"
  ]}},{code:"GD",info: {
    "name": "Grenada",
    "native": "Grenada",
    "phone": "1473",
    "continent": "NA",
    "capital": "St. George's",
    "currency": "XCD",
    "languages": [
      "en"
  ]}},{code:"GE",info: {
    "name": "Georgia",
    "native": "საქართველო",
    "phone": "995",
    "continent": "AS",
    "capital": "Tbilisi",
    "currency": "GEL",
    "languages": [
      "ka"
  ]}},{code:"GF",info: {
    "name": "French Guiana",
    "native": "Guyane française",
    "phone": "594",
    "continent": "SA",
    "capital": "Cayenne",
    "currency": "EUR",
    "languages": [
      "fr"
  ]}},{code:"GG",info: {
    "name": "Guernsey",
    "native": "Guernsey",
    "phone": "44",
    "continent": "EU",
    "capital": "St. Peter Port",
    "currency": "GBP",
    "languages": [
      "en",
      "fr"
  ]}},{code:"GH",info: {
    "name": "Ghana",
    "native": "Ghana",
    "phone": "233",
    "continent": "AF",
    "capital": "Accra",
    "currency": "GHS",
    "languages": [
      "en"
  ]}},{code:"GI",info: {
    "name": "Gibraltar",
    "native": "Gibraltar",
    "phone": "350",
    "continent": "EU",
    "capital": "Gibraltar",
    "currency": "GIP",
    "languages": [
      "en"
  ]}},{code:"GL",info: {
    "name": "Greenland",
    "native": "Kalaallit Nunaat",
    "phone": "299",
    "continent": "NA",
    "capital": "Nuuk",
    "currency": "DKK",
    "languages": [
      "kl"
  ]}},{code:"GM",info: {
    "name": "Gambia",
    "native": "Gambia",
    "phone": "220",
    "continent": "AF",
    "capital": "Banjul",
    "currency": "GMD",
    "languages": [
      "en"
  ]}},{code:"GN",info: {
    "name": "Guinea",
    "native": "Guinée",
    "phone": "224",
    "continent": "AF",
    "capital": "Conakry",
    "currency": "GNF",
    "languages": [
      "fr",
      "ff"
  ]}},{code:"GP",info: {
    "name": "Guadeloupe",
    "native": "Guadeloupe",
    "phone": "590",
    "continent": "NA",
    "capital": "Basse-Terre",
    "currency": "EUR",
    "languages": [
      "fr"
  ]}},{code:"GQ",info: {
    "name": "Equatorial Guinea",
    "native": "Guinea Ecuatorial",
    "phone": "240",
    "continent": "AF",
    "capital": "Malabo",
    "currency": "XAF",
    "languages": [
      "es",
      "fr"
  ]}},{code:"GR",info: {
    "name": "Greece",
    "native": "Ελλάδα",
    "phone": "30",
    "continent": "EU",
    "capital": "Athens",
    "currency": "EUR",
    "languages": [
      "el"
  ]}},{code:"GS",info: {
    "name": "South Georgia and the South Sandwich Islands",
    "native": "South Georgia",
    "phone": "500",
    "continent": "AN",
    "capital": "King Edward Point",
    "currency": "GBP",
    "languages": [
      "en"
  ]}},{code:"GT",info: {
    "name": "Guatemala",
    "native": "Guatemala",
    "phone": "502",
    "continent": "NA",
    "capital": "Guatemala City",
    "currency": "GTQ",
    "languages": [
      "es"
  ]}},{code:"GU",info: {
    "name": "Guam",
    "native": "Guam",
    "phone": "1671",
    "continent": "OC",
    "capital": "Hagåtña",
    "currency": "USD",
    "languages": [
      "en",
      "ch",
      "es"
  ]}},{code:"GW",info: {
    "name": "Guinea-Bissau",
    "native": "Guiné-Bissau",
    "phone": "245",
    "continent": "AF",
    "capital": "Bissau",
    "currency": "XOF",
    "languages": [
      "pt"
  ]}},{code:"GY",info: {
    "name": "Guyana",
    "native": "Guyana",
    "phone": "592",
    "continent": "SA",
    "capital": "Georgetown",
    "currency": "GYD",
    "languages": [
      "en"
  ]}},{code:"HK",info: {
    "name": "Hong Kong",
    "native": "香港",
    "phone": "852",
    "continent": "AS",
    "capital": "City of Victoria",
    "currency": "HKD",
    "languages": [
      "zh",
      "en"
  ]}},{code:"HM",info: {
    "name": "Heard Island and McDonald Islands",
    "native": "Heard Island and McDonald Islands",
    "phone": "",
    "continent": "AN",
    "capital": "",
    "currency": "AUD",
    "languages": [
      "en"
  ]}},{code:"HN",info: {
    "name": "Honduras",
    "native": "Honduras",
    "phone": "504",
    "continent": "NA",
    "capital": "Tegucigalpa",
    "currency": "HNL",
    "languages": [
      "es"
  ]}},{code:"HR",info: {
    "name": "Croatia",
    "native": "Hrvatska",
    "phone": "385",
    "continent": "EU",
    "capital": "Zagreb",
    "currency": "HRK",
    "languages": [
      "hr"
  ]}},{code:"HT",info: {
    "name": "Haiti",
    "native": "Haïti",
    "phone": "509",
    "continent": "NA",
    "capital": "Port-au-Prince",
    "currency": "HTG,USD",
    "languages": [
      "fr",
      "ht"
  ]}},{code:"HU",info: {
    "name": "Hungary",
    "native": "Magyarország",
    "phone": "36",
    "continent": "EU",
    "capital": "Budapest",
    "currency": "HUF",
    "languages": [
      "hu"
  ]}},{code:"ID",info: {
    "name": "Indonesia",
    "native": "Indonesia",
    "phone": "62",
    "continent": "AS",
    "capital": "Jakarta",
    "currency": "IDR",
    "languages": [
      "id"
  ]}},{code:"IE",info: {
    "name": "Ireland",
    "native": "Éire",
    "phone": "353",
    "continent": "EU",
    "capital": "Dublin",
    "currency": "EUR",
    "languages": [
      "ga",
      "en"
  ]}},{code:"IL",info: {
    "name": "Israel",
    "native": "יִשְׂרָאֵל",
    "phone": "972",
    "continent": "AS",
    "capital": "Jerusalem",
    "currency": "ILS",
    "languages": [
      "he",
      "ar"
  ]}},{code:"IM",info: {
    "name": "Isle of Man",
    "native": "Isle of Man",
    "phone": "44",
    "continent": "EU",
    "capital": "Douglas",
    "currency": "GBP",
    "languages": [
      "en",
      "gv"
  ]}},{code:"IN",info: {
    "name": "India",
    "native": "भारत",
    "phone": "91",
    "continent": "AS",
    "capital": "New Delhi",
    "currency": "INR",
    "languages": [
      "hi",
      "en"
  ]}},{code:"IO",info: {
    "name": "British Indian Ocean Territory",
    "native": "British Indian Ocean Territory",
    "phone": "246",
    "continent": "AS",
    "capital": "Diego Garcia",
    "currency": "USD",
    "languages": [
      "en"
  ]}},{code:"IQ",info: {
    "name": "Iraq",
    "native": "العراق",
    "phone": "964",
    "continent": "AS",
    "capital": "Baghdad",
    "currency": "IQD",
    "languages": [
      "ar",
      "ku"
  ]}},{code:"IR",info: {
    "name": "Iran",
    "native": "ایران",
    "phone": "98",
    "continent": "AS",
    "capital": "Tehran",
    "currency": "IRR",
    "languages": [
      "fa"
  ]}},{code:"IS",info: {
    "name": "Iceland",
    "native": "Ísland",
    "phone": "354",
    "continent": "EU",
    "capital": "Reykjavik",
    "currency": "ISK",
    "languages": [
      "is"
  ]}},{code:"IT",info: {
    "name": "Italy",
    "native": "Italia",
    "phone": "39",
    "continent": "EU",
    "capital": "Rome",
    "currency": "EUR",
    "languages": [
      "it"
  ]}},{code:"JE",info: {
    "name": "Jersey",
    "native": "Jersey",
    "phone": "44",
    "continent": "EU",
    "capital": "Saint Helier",
    "currency": "GBP",
    "languages": [
      "en",
      "fr"
  ]}},{code:"JM",info: {
    "name": "Jamaica",
    "native": "Jamaica",
    "phone": "1876",
    "continent": "NA",
    "capital": "Kingston",
    "currency": "JMD",
    "languages": [
      "en"
  ]}},{code:"JO",info: {
    "name": "Jordan",
    "native": "الأردن",
    "phone": "962",
    "continent": "AS",
    "capital": "Amman",
    "currency": "JOD",
    "languages": [
      "ar"
  ]}},{code:"JP",info: {
    "name": "Japan",
    "native": "日本",
    "phone": "81",
    "continent": "AS",
    "capital": "Tokyo",
    "currency": "JPY",
    "languages": [
      "ja"
  ]}},{code:"KE",info: {
    "name": "Kenya",
    "native": "Kenya",
    "phone": "254",
    "continent": "AF",
    "capital": "Nairobi",
    "currency": "KES",
    "languages": [
      "en",
      "sw"
  ]}},{code:"KG",info: {
    "name": "Kyrgyzstan",
    "native": "Кыргызстан",
    "phone": "996",
    "continent": "AS",
    "capital": "Bishkek",
    "currency": "KGS",
    "languages": [
      "ky",
      "ru"
  ]}},{code:"KH",info: {
    "name": "Cambodia",
    "native": "Kâmpŭchéa",
    "phone": "855",
    "continent": "AS",
    "capital": "Phnom Penh",
    "currency": "KHR",
    "languages": [
      "km"
  ]}},{code:"KI",info: {
    "name": "Kiribati",
    "native": "Kiribati",
    "phone": "686",
    "continent": "OC",
    "capital": "South Tarawa",
    "currency": "AUD",
    "languages": [
      "en"
  ]}},{code:"KM",info: {
    "name": "Comoros",
    "native": "Komori",
    "phone": "269",
    "continent": "AF",
    "capital": "Moroni",
    "currency": "KMF",
    "languages": [
      "ar",
      "fr"
  ]}},{code:"KN",info: {
    "name": "Saint Kitts and Nevis",
    "native": "Saint Kitts and Nevis",
    "phone": "1869",
    "continent": "NA",
    "capital": "Basseterre",
    "currency": "XCD",
    "languages": [
      "en"
  ]}},{code:"KP",info: {
    "name": "North Korea",
    "native": "북한",
    "phone": "850",
    "continent": "AS",
    "capital": "Pyongyang",
    "currency": "KPW",
    "languages": [
      "ko"
  ]}},{code:"KR",info: {
    "name": "South Korea",
    "native": "대한민국",
    "phone": "82",
    "continent": "AS",
    "capital": "Seoul",
    "currency": "KRW",
    "languages": [
      "ko"
  ]}},{code:"KW",info: {
    "name": "Kuwait",
    "native": "الكويت",
    "phone": "965",
    "continent": "AS",
    "capital": "Kuwait City",
    "currency": "KWD",
    "languages": [
      "ar"
  ]}},{code:"KY",info: {
    "name": "Cayman Islands",
    "native": "Cayman Islands",
    "phone": "1345",
    "continent": "NA",
    "capital": "George Town",
    "currency": "KYD",
    "languages": [
      "en"
  ]}},{code:"KZ",info: {
    "name": "Kazakhstan",
    "native": "Қазақстан",
    "phone": "76,77",
    "continent": "AS",
    "capital": "Astana",
    "currency": "KZT",
    "languages": [
      "kk",
      "ru"
  ]}},{code:"LA",info: {
    "name": "Laos",
    "native": "ສປປລາວ",
    "phone": "856",
    "continent": "AS",
    "capital": "Vientiane",
    "currency": "LAK",
    "languages": [
      "lo"
  ]}},{code:"LB",info: {
    "name": "Lebanon",
    "native": "لبنان",
    "phone": "961",
    "continent": "AS",
    "capital": "Beirut",
    "currency": "LBP",
    "languages": [
      "ar",
      "fr"
  ]}},{code:"LC",info: {
    "name": "Saint Lucia",
    "native": "Saint Lucia",
    "phone": "1758",
    "continent": "NA",
    "capital": "Castries",
    "currency": "XCD",
    "languages": [
      "en"
  ]}},{code:"LI",info: {
    "name": "Liechtenstein",
    "native": "Liechtenstein",
    "phone": "423",
    "continent": "EU",
    "capital": "Vaduz",
    "currency": "CHF",
    "languages": [
      "de"
  ]}},{code:"LK",info: {
    "name": "Sri Lanka",
    "native": "śrī laṃkāva",
    "phone": "94",
    "continent": "AS",
    "capital": "Colombo",
    "currency": "LKR",
    "languages": [
      "si",
      "ta"
  ]}},{code:"LR",info: {
    "name": "Liberia",
    "native": "Liberia",
    "phone": "231",
    "continent": "AF",
    "capital": "Monrovia",
    "currency": "LRD",
    "languages": [
      "en"
  ]}},{code:"LS",info: {
    "name": "Lesotho",
    "native": "Lesotho",
    "phone": "266",
    "continent": "AF",
    "capital": "Maseru",
    "currency": "LSL,ZAR",
    "languages": [
      "en",
      "st"
  ]}},{code:"LT",info: {
    "name": "Lithuania",
    "native": "Lietuva",
    "phone": "370",
    "continent": "EU",
    "capital": "Vilnius",
    "currency": "LTL",
    "languages": [
      "lt"
  ]}},{code:"LU",info: {
    "name": "Luxembourg",
    "native": "Luxembourg",
    "phone": "352",
    "continent": "EU",
    "capital": "Luxembourg",
    "currency": "EUR",
    "languages": [
      "fr",
      "de",
      "lb"
  ]}},{code:"LV",info: {
    "name": "Latvia",
    "native": "Latvija",
    "phone": "371",
    "continent": "EU",
    "capital": "Riga",
    "currency": "EUR",
    "languages": [
      "lv"
  ]}},{code:"LY",info: {
    "name": "Libya",
    "native": "‏ليبيا",
    "phone": "218",
    "continent": "AF",
    "capital": "Tripoli",
    "currency": "LYD",
    "languages": [
      "ar"
  ]}},{code:"MA",info: {
    "name": "Morocco",
    "native": "المغرب",
    "phone": "212",
    "continent": "AF",
    "capital": "Rabat",
    "currency": "MAD",
    "languages": [
      "ar"
  ]}},{code:"MC",info: {
    "name": "Monaco",
    "native": "Monaco",
    "phone": "377",
    "continent": "EU",
    "capital": "Monaco",
    "currency": "EUR",
    "languages": [
      "fr"
  ]}},{code:"MD",info: {
    "name": "Moldova",
    "native": "Moldova",
    "phone": "373",
    "continent": "EU",
    "capital": "Chișinău",
    "currency": "MDL",
    "languages": [
      "ro"
  ]}},{code:"ME",info: {
    "name": "Montenegro",
    "native": "Црна Гора",
    "phone": "382",
    "continent": "EU",
    "capital": "Podgorica",
    "currency": "EUR",
    "languages": [
      "sr",
      "bs",
      "sq",
      "hr"
  ]}},{code:"MF",info: {
    "name": "Saint Martin",
    "native": "Saint-Martin",
    "phone": "590",
    "continent": "NA",
    "capital": "Marigot",
    "currency": "EUR",
    "languages": [
      "en",
      "fr",
      "nl"
  ]}},{code:"MG",info: {
    "name": "Madagascar",
    "native": "Madagasikara",
    "phone": "261",
    "continent": "AF",
    "capital": "Antananarivo",
    "currency": "MGA",
    "languages": [
      "fr",
      "mg"
  ]}},{code:"MH",info: {
    "name": "Marshall Islands",
    "native": "M̧ajeļ",
    "phone": "692",
    "continent": "OC",
    "capital": "Majuro",
    "currency": "USD",
    "languages": [
      "en",
      "mh"
  ]}},{code:"MK",info: {
    "name": "Macedonia",
    "native": "Македонија",
    "phone": "389",
    "continent": "EU",
    "capital": "Skopje",
    "currency": "MKD",
    "languages": [
      "mk"
  ]}},{code:"ML",info: {
    "name": "Mali",
    "native": "Mali",
    "phone": "223",
    "continent": "AF",
    "capital": "Bamako",
    "currency": "XOF",
    "languages": [
      "fr"
  ]}},{code:"MM",info: {
    "name": "Myanmar [Burma]",
    "native": "Myanma",
    "phone": "95",
    "continent": "AS",
    "capital": "Naypyidaw",
    "currency": "MMK",
    "languages": [
      "my"
  ]}},{code:"MN",info: {
    "name": "Mongolia",
    "native": "Монгол улс",
    "phone": "976",
    "continent": "AS",
    "capital": "Ulan Bator",
    "currency": "MNT",
    "languages": [
      "mn"
  ]}},{code:"MO",info: {
    "name": "Macao",
    "native": "澳門",
    "phone": "853",
    "continent": "AS",
    "capital": "",
    "currency": "MOP",
    "languages": [
      "zh",
      "pt"
  ]}},{code:"MP",info: {
    "name": "Northern Mariana Islands",
    "native": "Northern Mariana Islands",
    "phone": "1670",
    "continent": "OC",
    "capital": "Saipan",
    "currency": "USD",
    "languages": [
      "en",
      "ch"
  ]}},{code:"MQ",info: {
    "name": "Martinique",
    "native": "Martinique",
    "phone": "596",
    "continent": "NA",
    "capital": "Fort-de-France",
    "currency": "EUR",
    "languages": [
      "fr"
  ]}},{code:"MR",info: {
    "name": "Mauritania",
    "native": "موريتانيا",
    "phone": "222",
    "continent": "AF",
    "capital": "Nouakchott",
    "currency": "MRO",
    "languages": [
      "ar"
  ]}},{code:"MS",info: {
    "name": "Montserrat",
    "native": "Montserrat",
    "phone": "1664",
    "continent": "NA",
    "capital": "Plymouth",
    "currency": "XCD",
    "languages": [
      "en"
  ]}},{code:"MT",info: {
    "name": "Malta",
    "native": "Malta",
    "phone": "356",
    "continent": "EU",
    "capital": "Valletta",
    "currency": "EUR",
    "languages": [
      "mt",
      "en"
  ]}},{code:"MU",info: {
    "name": "Mauritius",
    "native": "Maurice",
    "phone": "230",
    "continent": "AF",
    "capital": "Port Louis",
    "currency": "MUR",
    "languages": [
      "en"
  ]}},{code:"MV",info: {
    "name": "Maldives",
    "native": "Maldives",
    "phone": "960",
    "continent": "AS",
    "capital": "Malé",
    "currency": "MVR",
    "languages": [
      "dv"
  ]}},{code:"MW",info: {
    "name": "Malawi",
    "native": "Malawi",
    "phone": "265",
    "continent": "AF",
    "capital": "Lilongwe",
    "currency": "MWK",
    "languages": [
      "en",
      "ny"
  ]}},{code:"MX",info: {
    "name": "Mexico",
    "native": "México",
    "phone": "52",
    "continent": "NA",
    "capital": "Mexico City",
    "currency": "MXN",
    "languages": [
      "es"
  ]}},{code:"MY",info: {
    "name": "Malaysia",
    "native": "Malaysia",
    "phone": "60",
    "continent": "AS",
    "capital": "Kuala Lumpur",
    "currency": "MYR",
    "languages": []}},{code:"MZ",info: {
    "name": "Mozambique",
    "native": "Moçambique",
    "phone": "258",
    "continent": "AF",
    "capital": "Maputo",
    "currency": "MZN",
    "languages": [
      "pt"
  ]}},{code:"NA",info: {
    "name": "Namibia",
    "native": "Namibia",
    "phone": "264",
    "continent": "AF",
    "capital": "Windhoek",
    "currency": "NAD,ZAR",
    "languages": [
      "en",
      "af"
  ]}},{code:"NC",info: {
    "name": "New Caledonia",
    "native": "Nouvelle-Calédonie",
    "phone": "687",
    "continent": "OC",
    "capital": "Nouméa",
    "currency": "XPF",
    "languages": [
      "fr"
  ]}},{code:"NE",info: {
    "name": "Niger",
    "native": "Niger",
    "phone": "227",
    "continent": "AF",
    "capital": "Niamey",
    "currency": "XOF",
    "languages": [
      "fr"
  ]}},{code:"NF",info: {
    "name": "Norfolk Island",
    "native": "Norfolk Island",
    "phone": "672",
    "continent": "OC",
    "capital": "Kingston",
    "currency": "AUD",
    "languages": [
      "en"
  ]}},{code:"NG",info: {
    "name": "Nigeria",
    "native": "Nigeria",
    "phone": "234",
    "continent": "AF",
    "capital": "Abuja",
    "currency": "NGN",
    "languages": [
      "en"
  ]}},{code:"NI",info: {
    "name": "Nicaragua",
    "native": "Nicaragua",
    "phone": "505",
    "continent": "NA",
    "capital": "Managua",
    "currency": "NIO",
    "languages": [
      "es"
  ]}},{code:"NL",info: {
    "name": "Netherlands",
    "native": "Nederland",
    "phone": "31",
    "continent": "EU",
    "capital": "Amsterdam",
    "currency": "EUR",
    "languages": [
      "nl"
  ]}},{code:"NO",info: {
    "name": "Norway",
    "native": "Norge",
    "phone": "47",
    "continent": "EU",
    "capital": "Oslo",
    "currency": "NOK",
    "languages": [
      "no",
      "nb",
      "nn"
  ]}},{code:"NP",info: {
    "name": "Nepal",
    "native": "नपल",
    "phone": "977",
    "continent": "AS",
    "capital": "Kathmandu",
    "currency": "NPR",
    "languages": [
      "ne"
  ]}},{code:"NR",info: {
    "name": "Nauru",
    "native": "Nauru",
    "phone": "674",
    "continent": "OC",
    "capital": "Yaren",
    "currency": "AUD",
    "languages": [
      "en",
      "na"
  ]}},{code:"NU",info: {
    "name": "Niue",
    "native": "Niuē",
    "phone": "683",
    "continent": "OC",
    "capital": "Alofi",
    "currency": "NZD",
    "languages": [
      "en"
  ]}},{code:"NZ",info: {
    "name": "New Zealand",
    "native": "New Zealand",
    "phone": "64",
    "continent": "OC",
    "capital": "Wellington",
    "currency": "NZD",
    "languages": [
      "en",
      "mi"
  ]}},{code:"OM",info: {
    "name": "Oman",
    "native": "عمان",
    "phone": "968",
    "continent": "AS",
    "capital": "Muscat",
    "currency": "OMR",
    "languages": [
      "ar"
  ]}},{code:"PA",info: {
    "name": "Panama",
    "native": "Panamá",
    "phone": "507",
    "continent": "NA",
    "capital": "Panama City",
    "currency": "PAB,USD",
    "languages": [
      "es"
  ]}},{code:"PE",info: {
    "name": "Peru",
    "native": "Perú",
    "phone": "51",
    "continent": "SA",
    "capital": "Lima",
    "currency": "PEN",
    "languages": [
      "es"
  ]}},{code:"PF",info: {
    "name": "French Polynesia",
    "native": "Polynésie française",
    "phone": "689",
    "continent": "OC",
    "capital": "Papeetē",
    "currency": "XPF",
    "languages": [
      "fr"
  ]}},{code:"PG",info: {
    "name": "Papua New Guinea",
    "native": "Papua Niugini",
    "phone": "675",
    "continent": "OC",
    "capital": "Port Moresby",
    "currency": "PGK",
    "languages": [
      "en"
  ]}},{code:"PH",info: {
    "name": "Philippines",
    "native": "Pilipinas",
    "phone": "63",
    "continent": "AS",
    "capital": "Manila",
    "currency": "PHP",
    "languages": [
      "en"
  ]}},{code:"PK",info: {
    "name": "Pakistan",
    "native": "Pakistan",
    "phone": "92",
    "continent": "AS",
    "capital": "Islamabad",
    "currency": "PKR",
    "languages": [
      "en",
      "ur"
  ]}},{code:"PL",info: {
    "name": "Poland",
    "native": "Polska",
    "phone": "48",
    "continent": "EU",
    "capital": "Warsaw",
    "currency": "PLN",
    "languages": [
      "pl"
  ]}},{code:"PM",info: {
    "name": "Saint Pierre and Miquelon",
    "native": "Saint-Pierre-et-Miquelon",
    "phone": "508",
    "continent": "NA",
    "capital": "Saint-Pierre",
    "currency": "EUR",
    "languages": [
      "fr"
  ]}},{code:"PN",info: {
    "name": "Pitcairn Islands",
    "native": "Pitcairn Islands",
    "phone": "64",
    "continent": "OC",
    "capital": "Adamstown",
    "currency": "NZD",
    "languages": [
      "en"
  ]}},{code:"PR",info: {
    "name": "Puerto Rico",
    "native": "Puerto Rico",
    "phone": "1787,1939",
    "continent": "NA",
    "capital": "San Juan",
    "currency": "USD",
    "languages": [
      "es",
      "en"
  ]}},{code:"PS",info: {
    "name": "Palestine",
    "native": "فلسطين",
    "phone": "970",
    "continent": "AS",
    "capital": "Ramallah",
    "currency": "ILS",
    "languages": [
      "ar"
  ]}},{code:"PT",info: {
    "name": "Portugal",
    "native": "Portugal",
    "phone": "351",
    "continent": "EU",
    "capital": "Lisbon",
    "currency": "EUR",
    "languages": [
      "pt"
  ]}},{code:"PW",info: {
    "name": "Palau",
    "native": "Palau",
    "phone": "680",
    "continent": "OC",
    "capital": "Ngerulmud",
    "currency": "USD",
    "languages": [
      "en"
  ]}},{code:"PY",info: {
    "name": "Paraguay",
    "native": "Paraguay",
    "phone": "595",
    "continent": "SA",
    "capital": "Asunción",
    "currency": "PYG",
    "languages": [
      "es",
      "gn"
  ]}},{code:"QA",info: {
    "name": "Qatar",
    "native": "قطر",
    "phone": "974",
    "continent": "AS",
    "capital": "Doha",
    "currency": "QAR",
    "languages": [
      "ar"
  ]}},{code:"RE",info: {
    "name": "Réunion",
    "native": "La Réunion",
    "phone": "262",
    "continent": "AF",
    "capital": "Saint-Denis",
    "currency": "EUR",
    "languages": [
      "fr"
  ]}},{code:"RO",info: {
    "name": "Romania",
    "native": "România",
    "phone": "40",
    "continent": "EU",
    "capital": "Bucharest",
    "currency": "RON",
    "languages": [
      "ro"
  ]}},{code:"RS",info: {
    "name": "Serbia",
    "native": "Србија",
    "phone": "381",
    "continent": "EU",
    "capital": "Belgrade",
    "currency": "RSD",
    "languages": [
      "sr"
  ]}},{code:"RU",info: {
    "name": "Russia",
    "native": "Россия",
    "phone": "7",
    "continent": "EU",
    "capital": "Moscow",
    "currency": "RUB",
    "languages": [
      "ru"
  ]}},{code:"RW",info: {
    "name": "Rwanda",
    "native": "Rwanda",
    "phone": "250",
    "continent": "AF",
    "capital": "Kigali",
    "currency": "RWF",
    "languages": [
      "rw",
      "en",
      "fr"
  ]}},{code:"SA",info: {
    "name": "Saudi Arabia",
    "native": "العربية السعودية",
    "phone": "966",
    "continent": "AS",
    "capital": "Riyadh",
    "currency": "SAR",
    "languages": [
      "ar"
  ]}},{code:"SB",info: {
    "name": "Solomon Islands",
    "native": "Solomon Islands",
    "phone": "677",
    "continent": "OC",
    "capital": "Honiara",
    "currency": "SBD",
    "languages": [
      "en"
  ]}},{code:"SC",info: {
    "name": "Seychelles",
    "native": "Seychelles",
    "phone": "248",
    "continent": "AF",
    "capital": "Victoria",
    "currency": "SCR",
    "languages": [
      "fr",
      "en"
  ]}},{code:"SD",info: {
    "name": "Sudan",
    "native": "السودان",
    "phone": "249",
    "continent": "AF",
    "capital": "Khartoum",
    "currency": "SDG",
    "languages": [
      "ar",
      "en"
  ]}},{code:"SE",info: {
    "name": "Sweden",
    "native": "Sverige",
    "phone": "46",
    "continent": "EU",
    "capital": "Stockholm",
    "currency": "SEK",
    "languages": [
      "sv"
  ]}},{code:"SG",info: {
    "name": "Singapore",
    "native": "Singapore",
    "phone": "65",
    "continent": "AS",
    "capital": "Singapore",
    "currency": "SGD",
    "languages": [
      "en",
      "ms",
      "ta",
      "zh"
  ]}},{code:"SH",info: {
    "name": "Saint Helena",
    "native": "Saint Helena",
    "phone": "290",
    "continent": "AF",
    "capital": "Jamestown",
    "currency": "SHP",
    "languages": [
      "en"
  ]}},{code:"SI",info: {
    "name": "Slovenia",
    "native": "Slovenija",
    "phone": "386",
    "continent": "EU",
    "capital": "Ljubljana",
    "currency": "EUR",
    "languages": [
      "sl"
  ]}},{code:"SJ",info: {
    "name": "Svalbard and Jan Mayen",
    "native": "Svalbard og Jan Mayen",
    "phone": "4779",
    "continent": "EU",
    "capital": "Longyearbyen",
    "currency": "NOK",
    "languages": [
      "no"
  ]}},{code:"SK",info: {
    "name": "Slovakia",
    "native": "Slovensko",
    "phone": "421",
    "continent": "EU",
    "capital": "Bratislava",
    "currency": "EUR",
    "languages": [
      "sk"
  ]}},{code:"SL",info: {
    "name": "Sierra Leone",
    "native": "Sierra Leone",
    "phone": "232",
    "continent": "AF",
    "capital": "Freetown",
    "currency": "SLL",
    "languages": [
      "en"
  ]}},{code:"SM",info: {
    "name": "San Marino",
    "native": "San Marino",
    "phone": "378",
    "continent": "EU",
    "capital": "City of San Marino",
    "currency": "EUR",
    "languages": [
      "it"
  ]}},{code:"SN",info: {
    "name": "Senegal",
    "native": "Sénégal",
    "phone": "221",
    "continent": "AF",
    "capital": "Dakar",
    "currency": "XOF",
    "languages": [
      "fr"
  ]}},{code:"SO",info: {
    "name": "Somalia",
    "native": "Soomaaliya",
    "phone": "252",
    "continent": "AF",
    "capital": "Mogadishu",
    "currency": "SOS",
    "languages": [
      "so",
      "ar"
  ]}},{code:"SR",info: {
    "name": "Suriname",
    "native": "Suriname",
    "phone": "597",
    "continent": "SA",
    "capital": "Paramaribo",
    "currency": "SRD",
    "languages": [
      "nl"
  ]}},{code:"SS",info: {
    "name": "South Sudan",
    "native": "South Sudan",
    "phone": "211",
    "continent": "AF",
    "capital": "Juba",
    "currency": "SSP",
    "languages": [
      "en"
  ]}},{code:"ST",info: {
    "name": "São Tomé and Príncipe",
    "native": "São Tomé e Príncipe",
    "phone": "239",
    "continent": "AF",
    "capital": "São Tomé",
    "currency": "STD",
    "languages": [
      "pt"
  ]}},{code:"SV",info: {
    "name": "El Salvador",
    "native": "El Salvador",
    "phone": "503",
    "continent": "NA",
    "capital": "San Salvador",
    "currency": "SVC,USD",
    "languages": [
      "es"
  ]}},{code:"SX",info: {
    "name": "Sint Maarten",
    "native": "Sint Maarten",
    "phone": "1721",
    "continent": "NA",
    "capital": "Philipsburg",
    "currency": "ANG",
    "languages": [
      "nl",
      "en"
  ]}},{code:"SY",info: {
    "name": "Syria",
    "native": "سوريا",
    "phone": "963",
    "continent": "AS",
    "capital": "Damascus",
    "currency": "SYP",
    "languages": [
      "ar"
  ]}},{code:"SZ",info: {
    "name": "Swaziland",
    "native": "Swaziland",
    "phone": "268",
    "continent": "AF",
    "capital": "Lobamba",
    "currency": "SZL",
    "languages": [
      "en",
      "ss"
  ]}},{code:"TC",info: {
    "name": "Turks and Caicos Islands",
    "native": "Turks and Caicos Islands",
    "phone": "1649",
    "continent": "NA",
    "capital": "Cockburn Town",
    "currency": "USD",
    "languages": [
      "en"
  ]}},{code:"TD",info: {
    "name": "Chad",
    "native": "Tchad",
    "phone": "235",
    "continent": "AF",
    "capital": "N'Djamena",
    "currency": "XAF",
    "languages": [
      "fr",
      "ar"
  ]}},{code:"TF",info: {
    "name": "French Southern Territories",
    "native": "Territoire des Terres australes et antarctiques fr",
    "phone": "",
    "continent": "AN",
    "capital": "Port-aux-Français",
    "currency": "EUR",
    "languages": [
      "fr"
  ]}},{code:"TG",info: {
    "name": "Togo",
    "native": "Togo",
    "phone": "228",
    "continent": "AF",
    "capital": "Lomé",
    "currency": "XOF",
    "languages": [
      "fr"
  ]}},{code:"TH",info: {
    "name": "Thailand",
    "native": "ประเทศไทย",
    "phone": "66",
    "continent": "AS",
    "capital": "Bangkok",
    "currency": "THB",
    "languages": [
      "th"
  ]}},{code:"TJ",info: {
    "name": "Tajikistan",
    "native": "Тоҷикистон",
    "phone": "992",
    "continent": "AS",
    "capital": "Dushanbe",
    "currency": "TJS",
    "languages": [
      "tg",
      "ru"
  ]}},{code:"TK",info: {
    "name": "Tokelau",
    "native": "Tokelau",
    "phone": "690",
    "continent": "OC",
    "capital": "Fakaofo",
    "currency": "NZD",
    "languages": [
      "en"
  ]}},{code:"TL",info: {
    "name": "East Timor",
    "native": "Timor-Leste",
    "phone": "670",
    "continent": "OC",
    "capital": "Dili",
    "currency": "USD",
    "languages": [
      "pt"
  ]}},{code:"TM",info: {
    "name": "Turkmenistan",
    "native": "Türkmenistan",
    "phone": "993",
    "continent": "AS",
    "capital": "Ashgabat",
    "currency": "TMT",
    "languages": [
      "tk",
      "ru"
  ]}},{code:"TN",info: {
    "name": "Tunisia",
    "native": "تونس",
    "phone": "216",
    "continent": "AF",
    "capital": "Tunis",
    "currency": "TND",
    "languages": [
      "ar"
  ]}},{code:"TO",info: {
    "name": "Tonga",
    "native": "Tonga",
    "phone": "676",
    "continent": "OC",
    "capital": "Nuku'alofa",
    "currency": "TOP",
    "languages": [
      "en",
      "to"
  ]}},{code:"TR",info: {
    "name": "Turkey",
    "native": "Türkiye",
    "phone": "90",
    "continent": "AS",
    "capital": "Ankara",
    "currency": "TRY",
    "languages": [
      "tr"
  ]}},{code:"TT",info: {
    "name": "Trinidad and Tobago",
    "native": "Trinidad and Tobago",
    "phone": "1868",
    "continent": "NA",
    "capital": "Port of Spain",
    "currency": "TTD",
    "languages": [
      "en"
  ]}},{code:"TV",info: {
    "name": "Tuvalu",
    "native": "Tuvalu",
    "phone": "688",
    "continent": "OC",
    "capital": "Funafuti",
    "currency": "AUD",
    "languages": [
      "en"
  ]}},{code:"TW",info: {
    "name": "Taiwan",
    "native": "臺灣",
    "phone": "886",
    "continent": "AS",
    "capital": "Taipei",
    "currency": "TWD",
    "languages": [
      "zh"
  ]}},{code:"TZ",info: {
    "name": "Tanzania",
    "native": "Tanzania",
    "phone": "255",
    "continent": "AF",
    "capital": "Dodoma",
    "currency": "TZS",
    "languages": [
      "sw",
      "en"
  ]}},{code:"UA",info: {
    "name": "Ukraine",
    "native": "Україна",
    "phone": "380",
    "continent": "EU",
    "capital": "Kyiv",
    "currency": "UAH",
    "languages": [
      "uk"
  ]}},{code:"UG",info: {
    "name": "Uganda",
    "native": "Uganda",
    "phone": "256",
    "continent": "AF",
    "capital": "Kampala",
    "currency": "UGX",
    "languages": [
      "en",
      "sw"
  ]}},{code:"UM",info: {
    "name": "U.S. Minor Outlying Islands",
    "native": "United States Minor Outlying Islands",
    "phone": "",
    "continent": "OC",
    "capital": "",
    "currency": "USD",
    "languages": [
      "en"
  ]}},{code:"US",info: {
    "name": "United States",
    "native": "United States",
    "phone": "1",
    "continent": "NA",
    "capital": "Washington D.C.",
    "currency": "USD,USN,USS",
    "languages": [
      "en"
  ]}},{code:"UY",info: {
    "name": "Uruguay",
    "native": "Uruguay",
    "phone": "598",
    "continent": "SA",
    "capital": "Montevideo",
    "currency": "UYI,UYU",
    "languages": [
      "es"
  ]}},{code:"UZ",info: {
    "name": "Uzbekistan",
    "native": "O‘zbekiston",
    "phone": "998",
    "continent": "AS",
    "capital": "Tashkent",
    "currency": "UZS",
    "languages": [
      "uz",
      "ru"
  ]}},{code:"VA",info: {
    "name": "Vatican City",
    "native": "Vaticano",
    "phone": "39066,379",
    "continent": "EU",
    "capital": "Vatican City",
    "currency": "EUR",
    "languages": [
      "it",
      "la"
  ]}},{code:"VC",info: {
    "name": "Saint Vincent and the Grenadines",
    "native": "Saint Vincent and the Grenadines",
    "phone": "1784",
    "continent": "NA",
    "capital": "Kingstown",
    "currency": "XCD",
    "languages": [
      "en"
  ]}},{code:"VE",info: {
    "name": "Venezuela",
    "native": "Venezuela",
    "phone": "58",
    "continent": "SA",
    "capital": "Caracas",
    "currency": "VEF",
    "languages": [
      "es"
  ]}},{code:"VG",info: {
    "name": "British Virgin Islands",
    "native": "British Virgin Islands",
    "phone": "1284",
    "continent": "NA",
    "capital": "Road Town",
    "currency": "USD",
    "languages": [
      "en"
  ]}},{code:"VI",info: {
    "name": "U.S. Virgin Islands",
    "native": "United States Virgin Islands",
    "phone": "1340",
    "continent": "NA",
    "capital": "Charlotte Amalie",
    "currency": "USD",
    "languages": [
      "en"
  ]}},{code:"VN",info: {
    "name": "Vietnam",
    "native": "Việt Nam",
    "phone": "84",
    "continent": "AS",
    "capital": "Hanoi",
    "currency": "VND",
    "languages": [
      "vi"
  ]}},{code:"VU",info: {
    "name": "Vanuatu",
    "native": "Vanuatu",
    "phone": "678",
    "continent": "OC",
    "capital": "Port Vila",
    "currency": "VUV",
    "languages": [
      "bi",
      "en",
      "fr"
  ]}},{code:"WF",info: {
    "name": "Wallis and Futuna",
    "native": "Wallis et Futuna",
    "phone": "681",
    "continent": "OC",
    "capital": "Mata-Utu",
    "currency": "XPF",
    "languages": [
      "fr"
  ]}},{code:"WS",info: {
    "name": "Samoa",
    "native": "Samoa",
    "phone": "685",
    "continent": "OC",
    "capital": "Apia",
    "currency": "WST",
    "languages": [
      "sm",
      "en"
  ]}},{code:"XK",info: {
    "name": "Kosovo",
    "native": "Republika e Kosovës",
    "phone": "377,381,386",
    "continent": "EU",
    "capital": "Pristina",
    "currency": "EUR",
    "languages": [
      "sq",
      "sr"
  ]}},{code:"YE",info: {
    "name": "Yemen",
    "native": "اليَمَن",
    "phone": "967",
    "continent": "AS",
    "capital": "Sana'a",
    "currency": "YER",
    "languages": [
      "ar"
  ]}},{code:"YT",info: {
    "name": "Mayotte",
    "native": "Mayotte",
    "phone": "262",
    "continent": "AF",
    "capital": "Mamoudzou",
    "currency": "EUR",
    "languages": [
      "fr"
  ]}},{code:"ZA",info: {
    "name": "South Africa",
    "native": "South Africa",
    "phone": "27",
    "continent": "AF",
    "capital": "Pretoria",
    "currency": "ZAR",
    "languages": [
      "af",
      "en",
      "nr",
      "st",
      "ss",
      "tn",
      "ts",
      "ve",
      "xh",
      "zu"
  ]}},{code:"ZM",info: {
    "name": "Zambia",
    "native": "Zambia",
    "phone": "260",
    "continent": "AF",
    "capital": "Lusaka",
    "currency": "ZMK",
    "languages": [
      "en"
  ]}},{code:"ZW",info: {
    "name": "Zimbabwe",
    "native": "Zimbabwe",
    "phone": "263",
    "continent": "AF",
    "capital": "Harare",
    "currency": "ZWL",
    "languages": [
      "en",
      "sn",
      "nd"
  ]}}];

  arrayCountry.forEach(function(data){
    Country.create(data);
  });


}
