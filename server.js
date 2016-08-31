//this file has different libraries
//express library
var express = require('express');

//morgan library whenever a user goes to specific url it(url) will show in cmd
var morgan = require('morgan');

var mongoose = require('mongoose');

//app is referring to express objects
var app = express();

mongoose.connect('mongodb://root:abc123@ds019906.mlab.com:19906/ecommerce_site', function(err){
	if (err){
		console.log(err);

	}
	else{
		console.log("Connected to database");
	}
});

//middleware to invoke morgan objects
app.use(morgan('dev'))

//to get whatever is in the url and response
app.get('/' ,function(req,res){
	var name = "Shalini"

	//response the request with this data
	res.json("My name is " + name);
});

//path localhost:8000/catname/
app.get('/catname', function(req,res){
	res.json('batman');

});

//express methods listen is used, to run the app, to know wjhether its running or error is there
app.listen(8000, function(err){
	if (err) throw err;
	console.log("Server is running on port 8000");
});