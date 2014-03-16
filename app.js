
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , io = require('socket.io')
  , mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/officieldessorties')

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 8080);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.logger('dev'));
  app.use(express.errorHandler());
});

// Lancement du serveur
var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


var sio = io.listen(server);
//User online user count variable
var users = 0;

sio.configure(function (){
  sio.set('log level', 0);
  sio.set('authorization', function (handshakeData, callback) {
   callback(null, true); // error first callback style
  });
});

sio.sockets.on('connection', function (socket) {
  users++;
  socket.emit('count', { count: users });
  socket.broadcast.emit('count', { count: users });

//disconnect state
  socket.on('disconnect', function(){
    users--;
    socket.emit('count', { count: users });
    socket.broadcast.emit('count', { count: users });
  });
});

//Our index page


// Homepage
app.get('/', routes.index);

// Liste de evenements de la personne connectée
app.get('/mes-evenements', routes.my_events);

// Affiche la page de gestion du compte de la personne connectée
app.get('/mon-compte', routes.my_account);

// Affiche la page de gestion du compte de la personne connectée

app.get('/mes-evenements/nouveau', routes.form_new_event);
// Affiche la page de gestion du compte de la personne connectée
app.get('/mes-evenements/supprimer/:id', routes.form_delete_event);

// Affiche la page des condition generales d'utilisation
app.get('/cgu', routes.cgu);


// traitement ajout d'evenement
app.post('/mes-evenements/ajouter', routes.create_new_event);

