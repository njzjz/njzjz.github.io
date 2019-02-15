var express = require('express');
var domain = require('./domain');
var app = express();
app.use('/', function (req, res) {
	var host = req.get('host');
	redirect = domain[host];
	if (!redirect) redirect = domain['*'];
	res.redirect(301, redirect);
})
module.exports = app;
