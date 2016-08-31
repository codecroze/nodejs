//this file has different libraries
//express library
var express = require('express');

//morgan library whenever a user goes to specific url it(url) will show in cmd
var morgan = require('morgan');

var mongoose = require('mongoose');

//it take the body of req and parse it to server and what we want it to recieve
var bodyParser = require('body-parser');

// to use user.js file 
var User = require('./models/user');

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
app.use(bodyParser.json());

//to parse
app.use(bodyParser.urlencoded({ extended: true}));

//for user profile
app.post('/create-user', function(req,res,next){

//to create an instance of User object fro user.js
	var user = new User();

	//same as in Postman
	user.profile.name = req.body.name;
	user.password = req.body.password;
	user.email = req.body.email;

//to add it in database
	user.save(function(){
		if (err) next(err);

		res.json("Success user");


	});
});

//express methods listen is used, to run the app, to know wjhether its running or error is there
app.listen(8000, function(err){
	if (err) throw err;
	console.log("Server is running on port 8000");
});