var sitename = 'L\'officiel des sorties' ;


var Evenement = require('./../models/evenement.js');


exports.index = function(req, res){
  res.status(200);
  res.render('index', { title: sitename });
};

exports.action_mes_evenements = function(req, res){
  res.status(200);
  //console.log(req.user);
  Evenement.find({owner: req.session.passport.user},function(err, evenements){
  	res.render('mes-evenements', { 
  		title: 'Mes événéments', 
      sitename: sitename,
  		evenements: evenements,
      active: 'Mes événements'
  	});
  });
};

exports.action_formulaire_evenement_nouveau = function(req, res){
  res.status(200);
  res.render('evenement/nouveau', { title: 'Créer un nouvel evenement', sitename: sitename });
};

// Suppression d'un evenement
exports.action_supprimer_evenement = function(req, res){
  res.status(200);
  Evenement.findOne({id: req.query.id}, function(err, evenement){

    if (err){throw err;}
    else {
      evenement.remove();
      res.redirect('/mes-evenements');
    }
  });
};

// Affichage de la fiche d'un evenement
exports.action_afficher_evenement = function(req, res){
  res.status(200);
  Evenement.findOne({_id: req.params.id}, function(err, evenement){

    if (err){throw err;}
    else {
      res.render('evenement/fiche', { title: evenement.title, sitename: sitename, evenement: evenement });
    }
  });
};

// Insertion d'un nouvel evenement
exports.action_creer_evenement = function(req, res){
  res.status(200);

  var nouveau_evenement = Evenement({
  	title	   : req.body.title,
    description: req.body.description,
    is_public: req.body.is_public,
    address: req.body.address,
    city: req.body.city,
    zipcode: req.body.zipcode,
    category: req.body.category,
    places: req.body.places
  });

  nouveau_evenement.save(function (err) {
    if (err){throw err;}
  	else res.redirect('/mes-evenements');
  });
};

// Page mon compte
exports.action_mon_compte = function(req, res){
  res.status(200);
  res.render('mon-compte', { title: 'Mon compte ', sitename: sitename, active: 'Mon compte' });
};

exports.action_afficher_cgu = function(req, res){
  res.status(200);
  res.render('cgu', { title: 'Conditions générales d\'utilisation', sitename: sitename });
};

exports.action_trouver_une_sortie = function(req, res){
  res.status(200);
  Evenement.find(function(err, evenements){
    res.render('page/trouver_un_evenement', { 
      title: 'Trouver une sortie', 
      sitename: sitename,
      evenements: evenements, 
      active: 'Trouver une sortie'
    });
  });
};

