var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

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
  res.render('user', {newUser: newUser});
});

//Rota para a págica com informações do repositório
app.post('/repository', function(req, res){	
  res.render('repository');	
});

//Rota para busca de usuário no GitHub através da URL
app.get('/user/:newUser', function(req, res){
  res.render('user', req.params);
});

//rota direta para a pasta de repositório (retorna ao ultimo repositório visitado)
app.get('/repository', function(req, res){
  res.render('repository');
});

//Rota inicial
app.get('/', function(req, res){
  res.render('index');
});

//Inicialização do server
app.listen(3000, function(){
  console.log('Server started on port 3000');
});