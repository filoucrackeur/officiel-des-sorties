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
  		count_my_event: count_my_event
  	});
  });
};

exports.form_new_event = function(req, res){
  res.status(200);
  res.render('event/new', { title: 'Créer un nouvel evenement | '+sitename });
};

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

exports.create_new_event = function(req, res){
  res.status(200);

  var new_event = Event({
  	title	   : req.body.title,
  	description: req.body.description
  });

  new_event.save(function (err) {
        if (err){throw err;}
  		else res.redirect('/mes-evenements');
  });
};

exports.my_account = function(req, res){
  res.status(200);
  res.render('my_account', { title: 'Mon compte | '+sitename });
};

exports.cgu = function(req, res){
  res.status(200);
  res.render('my_account', { title: 'Conditions général d\'utilisation | '+sitename });
};

