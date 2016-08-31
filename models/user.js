//it is for database
/*user.js
mongoose is just an object relational mapper
virtual object database
it connects nodejs and mongodb without an code*/
//it will store all the database schema
/*we require libraries mongoose*/
/*bcrypt is for hiding data*/
var mongoose = require('mongoose');

var bcrypt = require('bcrypt-nodejs');

var Schema = new mongoose.Schema;

//the user schema attributes//characteristics
var UserSchema = new Schema({
	email: {type: String, unique: true, lowercase: true},
	password: String,

	profile: {
		name: {tpe: String, default: ''},
		picture:{type: String, default: ''}

	},

	address: String,
	history: [{
		date: Date,
		paid: {type: Number, default: 0},

	}]
});



//hash the password before saving in DB
//pre is mongoose method
//pre means before saving in DB do some function
//salt is random data created by gensalt
//1234567890: a random no of 10 digits is genearted 
//after gen it will pass to function
//genSalt = genarating salt
//hash = 123vdbfgrrf;
//this refers the userschema
UserSchema.pre('save', function(next){
	var user = this;
	if(!user.isModified('password')) return next();
	bcrypt.genSalt(10, function(err, salt){
		if(err) return next(err);

		//for producing hash
		bcrypt.hash(user.password, salt, null,function(err,hash){
			if (err) return next(err);
			user.password = hash;
			next();
		});

	});
});


//compare password in the DB and the one that the user type in
//methods is a custom methods unlike pre which is a mongoose method
UserSchema.methods.comparePassword = function(password){
	//it has a compare built in
	return bcrypt.compareSync(password,this.password);

}

//to export this whole schema to DB for use 
module.exports = mongoose.model('User', UserSchema);