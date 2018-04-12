var express = require('express');
var route = express();

var index = require('./index');

route.use('/', index);

module.exports = route;