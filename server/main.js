var express = require('express');
var app = express();


///Recipe
var recipe = require('./recipe/recipe');
app.use('/recipe', birds);

app.listen(3000, function () {
});