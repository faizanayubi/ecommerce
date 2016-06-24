var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');

var User = require('./models/user');

var app = express();

mongoose.connect('mongodb://root:abc123@ds023054.mlab.com:23054/ecommerce', function(err) {
	if (err) {console.log(err);}
	else {console.log('Connected to mlab');}
})

//Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.post('/create-user', function(req, res, next) {
	var user = new User();
	user.profile.name = req.body.name;
	user.password = req.body.password;
	user.email = req.body.email;

	user.save(function(err, next) {
		if (err) {return next(err);}
		res.json('Successfully created new user');
	});
});

app.get('/', function(req, res) {
	res.render('main/home.ejs');
});

app.get('/about', function(req, res) {
	res.render('main/about.ejs');
});

app.listen(3000, function(err) {
	if (err) {throw err;}
	console.log('Server is running');
});