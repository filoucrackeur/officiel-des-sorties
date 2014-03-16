var sitename = 'L\'officiel des sorties' ;


var Event = require('./../models/event.js');

var count_my_event = 0;

exports.index = function(req, res){
  res.status(200);
  res.render('index', { title: sitename });
};

exports.my_events = function(req, res){
  res.status(200);
  Event.find(function(err, events){
  	res.render('my_events', { 
  		title: 'Mes événéments | '+sitename , 
  		events: events, 
  		count_my_event: count_my_event,
      active: 'Mes événements'
  	});
  });
};

exports.form_new_event = function(req, res){
  res.status(200);
  res.render('event/new', { title: 'Créer un nouvel evenement | '+sitename });
};

// Suppression d'un evenement
exports.form_delete_event = function(req, res){
  res.status(200);
  Event.findOne({id: req.query.id}, function(err, event){

    if (err){throw err;}
    else {
      event.remove();
      res.redirect('/mes-evenements');
    }
  });
};

// Affichage de la fiche d'un evenement
exports.fiche_event = function(req, res){
  res.status(200);
  Event.findOne({id: req.query.id}, function(err, event){

    if (err){throw err;}
    else {
      res.render('event/fiche', { title: event.title+' | '+sitename, event: event });
    }
  });
};

// Insertion d'un nouvel evenement
exports.create_new_event = function(req, res){
  res.status(200);

  var new_event = Event({
  	title	   : req.body.title,
    description: req.body.description,
    is_public: req.body.is_public,
    address: req.body.address,
    city: req.body.city,
    zipcode: req.body.zipcode,
    category: req.body.category,
    places: req.body.places
  });

  new_event.save(function (err) {
    if (err){throw err;}
  	else res.redirect('/mes-evenements');
  });
};

// Page mon compte
exports.my_account = function(req, res){
  res.status(200);
  res.render('my_account', { title: 'Mon compte | '+sitename, active: 'Mon compte' });
};

exports.cgu = function(req, res){
  res.status(200);
  res.render('my_account', { title: 'Conditions général d\'utilisation | '+sitename });
};

