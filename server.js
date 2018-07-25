var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
	res.locals.errors = null;
	next();
});

app.post('/user', function(req, res){
		var newUser = req.body.userName;
		// console.log(req.body);
		res.render('user', {newUser: newUser});
});

app.post('/repository', function(req, res){	
		res.render('repository');	
});

app.get('/', function(req, res){
res.render('index');
});
app.get('/user/:newUser', function(req, res){
	// console.log(req.params);
res.render('user', req.params);
});

app.get('/user', function(req, res){
	var newUser = req.body.userName;
		// console.log(req.body);
		res.render('user');
});
app.get('/repository', function(req, res){
res.render('repository');
});
app.listen(3000, function(){
	console.log('Server started on port 3000');
});