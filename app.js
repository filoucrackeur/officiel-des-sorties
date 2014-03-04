
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose')
  , io = require('socket.io')
  , mongoURI =  process.env.MONGOLAB_URI || 'mongodb://localhost/evenements'
  , db = mongoose.connect(mongoURI)
  , Schema = mongoose.Schema
  , ObjectID = Schema.ObjectId
  , Evenement = require('./models/evenements.js').init(Schema, mongoose);


var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 8080);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


var sio = io.listen(server);
//User online user count variable
var users = 0;

//Configure the socket.io connection settings.
        //See http://socket.io/
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

app.get('/mes-evenements', routes.mes_evenements);
app.get('/mon-compte', routes.mon_compte);
app.get('/', routes.index);