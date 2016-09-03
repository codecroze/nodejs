//router method coming from express
var router = require('express').Router();


//url for home.ejs
//router is sub path for routes
router.get('/', function(req,res){
	res.render('main/home');
});

//url for about.ejs
router.get('/about', function(req,res){
	res.render('main/about');
});

//to use router
module.exports = router;