//this file has different libraries
//express library
var express = require('express');

//morgan library whenever a user goes to specific url it(url) will show in cmd
var morgan = require('morgan');

var mongoose = require('mongoose');

//it take the body of req and parse it to server and what we want it to recieve
var bodyParser = require('body-parser');

var ejs = require('ejs');

//we need this to create webpages
var engine = require('ejs-mate');

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

//for use of static files in public folder
app.use(express.static(__dirname+'/public'));

app.use(morgan('dev'))

//middleware to invoke bodyparser objects
app.use(bodyParser.json());

//to parse
app.use(bodyParser.urlencoded({ extended: true}));

app.engine('ejs', engine);

app.set('view engine', 'ejs');

//for user profile which will be send to the server
app.post('/create-user', function(req,res,next){

//to create an instance of User object fro user.js
	var user = new User();

	//same as in Postman
	user.profile.name = req.body.name;
	user.password = req.body.password;
	user.email = req.body.email;

//to add it in database
	user.save(function(err){
		if (err) return next(err);

		res.json("Success user");


	});
});

//url for home.ejs
app.get('/', function(req,res){
	res.render('main/home');
})

//url for about.ejs
app.get('/about', function(req,res){
	res.render('main/about');
})

//express methods listen is used, to run the app, to know wjhether its running or error is there
app.listen(8000, function(err){
	if (err) throw err;
	console.log("Server is running on port 8000");
});
