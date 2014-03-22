var express = require('express')
  , routes  = require('./routes')
  , http = require('http')
  , path = require('path')
  , io = require('socket.io')
  , passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , FacebookStrategy = require('passport-facebook').Strategy
  , mongoose = require('mongoose');

// connexion a la base de données
mongoose.connect('mongodb://127.0.0.1/officieldessorties')

require('./fixtures/fixtures.js');

// chargement du system d'authentification
require('./config/passport')(passport);

var app = express();

// chargement librairie pour formatage des dates
app.locals.moment = require('moment');

app.configure(function(){
  app.set('port', process.env.PORT || 8080);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon(path.join(__dirname, 'public/favicon.ico')));
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({ secret: '123officiel--des--sorties456' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.logger('dev'));
  app.use(express.errorHandler());
});

// Lancement du serveur
var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Serveur démarré sur le port " + app.get('port'));
});


var sio = io.listen(server);

// nombre d'utilisateur connecté
var utilisateurs_connectes = 0;

sio.configure(function (){
  sio.set('log level', 0);
  sio.set('authorization', function (handshakeData, callback) {
   callback(null, true); // error first callback style
  });
});

sio.sockets.on('connection', function (socket) {
  
  utilisateurs_connectes++;

  socket.emit('utilisateurs_connectes', { utilisateurs_connectes: utilisateurs_connectes });
  socket.broadcast.emit('utilisateurs_connectes', { utilisateurs_connectes: utilisateurs_connectes });

  socket.on('disconnect', function(){
    utilisateurs_connectes--;
    socket.emit('utilisateurs_connectes', { utilisateurs_connectes: utilisateurs_connectes });
    socket.broadcast.emit('utilisateurs_connectes', { utilisateurs_connectes: utilisateurs_connectes });
  });
});

// routes ======================================================================
require('./routes/auth.js')(app, passport, routes);

