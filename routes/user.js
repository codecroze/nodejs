var router = require('express').Router();

//to acquire user objects from user.js
var User = require('../models/user.js')

router.get('/signup', function(req,res){
	res.render('accounts/signup');

});

//for user profile which will be send to the server
router.post('/signup', function(req,res){
	var user = new User();

	user.profile.name = req.body.name;
	user.email = req.body.email;
	user.password  = req.body.password;

    //mongoose method to find one doc in user DB
	User.findOne({email:req.body.email}, function(err,existingUser){
		if (existingUser){
			console.log(req.body.email + "already there");
			return res.redirect('/signup');

		}
		else{
			user.save(function(err,user){
				if(err) return next(err);

				res.json("New user created");
			});
		}
	});

});