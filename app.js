var express = require('express')
  , routes  = require('./routes')
  , http = require('http')
  , path = require('path')
  , io = require('socket.io')
  , passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , FacebookStrategy = require('passport-facebook').Strategy
  , mongoose = require('mongoose')
  , restify = require('express-restify-mongoose');

// connexion a la base de données
mongoose.connect('mongodb://127.0.0.1/officieldessorties')

require('./fixtures/fixtures.js');

var UserModel = require('./models/utilisateur.js');
var CategorieModel = require('./models/categorie.js');
var EvenementModel = require('./models/evenement.js');

var app = express();


// Authenticator
//app.use(express.basicAuth('philippe', 'philippe'));

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
  restify.serve(app, CategorieModel,{version: '/v1'});
  restify.serve(app, UserModel,{version: '/v1'});
  restify.serve(app, EvenementModel,{version: '/v1'});
});

app.configure('development', function(){
  app.use(express.logger('dev'));
  app.use(express.errorHandler());
});

// Lancement du serveur
var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Serveur démarré sur le port " + app.get('port'));
});

// chargement du system d'authentification
require('./config/passport')(passport);

// nombre d'utilisateur connecté
var connectes = 0;

// nombre de visiteur connecté
var visiteurs = 0;

// nombre d'évenement en cours de l'utilisateur
var nb_evenements_en_cours_utilisateur = 0;


var sio = io.listen(server);


sio.sockets.on('connection', function (socket) {

  visiteurs++;

  socket.emit('nouveau_visiteur', { visiteurs: visiteurs });
  socket.broadcast.emit('nouveau_visiteur', { visiteurs: visiteurs });


  socket.on('nouvelle_demande_inscription_evenement', function(){
    console.log('une demande inscription recu');
  });
  

  socket.on('disconnect', function(){
    visiteurs--;
    socket.emit('nouveau_visiteur', { visiteurs: visiteurs });
    socket.broadcast.emit('nouveau_visiteur', { visiteurs: visiteurs });
  });
});

// routes ======================================================================
require('./routes/auth.js')(app, passport);
// Page d'accueil racine du site
app.get('/', routes.index);

// Liste les categories pour debuter la recherche
app.get('/trouver-une-sortie', routes.trouver_une_sortie);

// Liste de evenements de la personne connectée
app.get('/mes-evenements', routes.mes_evenements);

// Affiche la page de gestion du compte de la personne connectée
app.get('/mon-compte', routes.mon_compte);

// Affiche la page formulaire d'ajout nouvel evenement
app.get('/mes-evenements/nouveau', routes.formulaire_evenement_nouveau);

// Affiche la page des condition generales d'utilisation
app.get('/conditions-generales-d-utilisation', routes.cgu);

// Affiche la page des condition generales de vente
app.get('/conditions-generales-de-vente', routes.cgv);

// Affiche la page des questions frequentes
app.get('/questions-frequentes', routes.faq);

// Affiche la page qui sommes nous
app.get('/qui-sommes-nous', routes.qui_sommes_nous);

// Affiche la page publicite
app.get('/publicite', routes.publicite);

// Affiche la page newsletter
app.get('/newsletter', routes.newsletter);

// Affiche la page témoignage
app.get('/temoignages', routes.temoignages);

// Affiche la page nous contacter
app.get('/nous-contacter', routes.nous_contacter);

// Affiche la page applications mobile
app.get('/applications-mobile', routes.applications_mobile);

// Affiche la page réseaux sociaux
app.get('/reseaux-sociaux', routes.reseaux_sociaux);

// Affiche la page nos partenaires
app.get('/nos-partenaires', routes.nos_partenaires);

// Affiche la page de presse
app.get('/presse', routes.presse);

// traitement ajout d'evenement
app.post('/evenement/ajouter', routes.creer_evenement);

// Affiche la page de gestion du compte de la personne connectée
app.get('/evenement/supprimer/:id', routes.supprimer_evenement);

// Affiche la page detail ou fiche de 
app.get('/evenement/fiche/:id', routes.evenement);
