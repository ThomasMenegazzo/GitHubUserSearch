var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var request = require('superagent');

var app = express();
var authToken = null;
var clientID = '6dabb1b6637c94ddd7b0';
var  clientSecret = '2d6e6357d90075eac7976ec647e24a12ab439a63';

//Define engine e pasta para o HTML
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

//Inicializa body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Define pasta de arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

//Rota para busca de usuário no GitHub através do index
app.post('/user', function(req, res){
  var newUser = req.body.userName;
  if (authToken){newUser = `${newUser}?access_token=${authToken}`}
  res.render('user', {newUser: newUser});
});

//Rota para a págica com informações do repositório
app.post('/repository', function(req, res){	
  res.render('repository');	
});

//Rota para busca de usuário no GitHub através da URL
app.get('/user/:newUser', function(req, res){
  newUser = req.params.newUser;
  if (authToken){newUser = `${newUser}?access_token=${authToken}`}
  res.render('user', {newUser: newUser});
});

//rota direta para a pasta de repositório (retorna ao ultimo repositório visitado)
app.get('/repository', function(req, res){
  res.render('repository');
});

app.get('/authorized', function(req, res){
  authCode = req.query.code;
  request
    .post('https://github.com/login/oauth/access_token')
    .send({ 
      client_id: clientID,
	 client_secret: clientSecret,
    code: authCode})
    .set('Accept', 'application/json')
    .then(response => {
	 authToken=response.body.access_token;
    }).catch(err => {console.log('ERROR');}
	 );
  res.render('index', {clientID: clientID, authorized: true});
});

//Rota inicial
app.get('/', function(req, res){
  res.render('index', {clientID: clientID, authorized: false});
});

//Inicialização do server
app.listen(3000, function(){
  console.log('Server started on port 3000');
});