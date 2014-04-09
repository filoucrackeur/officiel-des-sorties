var sitename = 'L\'officiel des sorties' ;
var Evenement = require('./../models/evenement.js');

exports.index = function(req, res){
  res.status(200);
  res.render('index', { 
    title: sitename, 
    utilisateur: req.user 
  });
};


exports.mes_evenements = function(req, res){
  res.status(200);
  Evenement.find({owner: req.session.passport.user},function(err, evenements){
    res.render('mes-evenements', { 
      title: 'Mes événéments', 
      sitename: sitename,
      evenements: evenements,
      active: 'Mes événements', 
      utilisateur: req.user
    });
  });
};

exports.formulaire_evenement_nouveau = function(req, res){
  res.status(200);
  res.render('evenement/nouveau', { 
    title: 'Créer un nouvel événement', 
    sitename: sitename, 
    utilisateur: req.user });
};

// Suppression d'un evenement
exports.supprimer_evenement = function(req, res){
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
exports.evenement = function(req, res){
  res.status(200);
  Evenement.findOne({_id: req.params.id}, function(err, evenement){

    if (err){throw err;}
    else {
      res.render('evenement/fiche', { 
        title: evenement.title, 
        sitename: sitename, 
        evenement: evenement, 
        utilisateur: req.user 
      });
    }
  });
};

// Insertion d'un nouvel evenement
exports.creer_evenement = function(req, res){
  res.status(200);

  var nouveau_evenement = Evenement({
    title    : req.body.title,
    description: req.body.description,
    is_public: req.body.is_public,
    address: req.body.address,
    city: req.body.city,
    zipcode: req.body.zipcode,
    category: req.body.category,
    places: req.body.places,
    owner: req.body.owner
  });

  nouveau_evenement.save(function (err) {
    if (err){throw err;}
    else res.redirect('/mes-evenements');
  });
};

// Page mon compte
exports.mon_compte = function(req, res){
  res.status(200);
  res.render('mon-compte', { 
    title: 'Mon compte', 
    sitename: sitename,
    utilisateur: req.user
  });
};

// Page conditions générales d'utilisation
exports.cgu = function(req, res){
  res.status(200);
  res.render('page/cgu', { 
    title: 'Conditions générales d\'utilisation', 
    sitename: sitename, 
    utilisateur: req.user
  });
};

// Page conditions générales de ventes
exports.cgv = function(req, res){
  res.status(200);
  res.render('page/cgv', { 
    title: 'Conditions générales de vente', 
    sitename: sitename, 
    utilisateur: req.user
  });
};

// Page question frequentes
exports.faq = function(req, res){
  res.status(200);
  res.render('page/faq', { 
    title: 'Questions fréquentes', 
    sitename: sitename, 
    utilisateur: req.user
  });
};

// Page presse
exports.presse = function(req, res){
  res.status(200);
  res.render('page/presse', { 
    title: 'Presse', 
    sitename: sitename, 
    utilisateur: req.user
  });
};

// Page Nos partenaires
exports.nos_partenaires = function(req, res){
  res.status(200);
  res.render('page/partenaires', { 
    title: 'Nos partenaires', 
    sitename: sitename, 
    utilisateur: req.user
  });
};

// Page Newsletter
exports.newsletter = function(req, res){
  res.status(200);
  res.render('page/newsletter', { 
    title: 'Newsletter', 
    sitename: sitename, 
    utilisateur: req.user
  });
};

// Page Applications mobile
exports.applications_mobile = function(req, res){
  res.status(200);
  res.render('page/mobile', { 
    title: 'Applications mobile', 
    sitename: sitename, 
    utilisateur: req.user
  });
};

// Page Nous contacter
exports.nous_contacter = function(req, res){
  res.status(200);
  res.render('page/nous-contacter', { 
    title: 'Nous contacter', 
    sitename: sitename, 
    utilisateur: req.user
  });
};

// Page Témoignage
exports.temoignages = function(req, res){
  res.status(200);
  res.render('page/temoignages', { 
    title: 'Témoignages', 
    sitename: sitename, 
    utilisateur: req.user
  });
};

// Page Publicité
exports.publicite = function(req, res){
  res.status(200);
  res.render('page/publicite', { 
    title: 'Publicité', 
    sitename: sitename, 
    utilisateur: req.user
  });
};

// Page qui sommes nous
exports.qui_sommes_nous = function(req, res){
  res.status(200);
  res.render('page/qui-sommes-nous', {
    title: 'Qui sommes nous ?', 
    sitename: sitename,
    utilisateur: req.user
  });
};

// Page reseaux sociaux
exports.reseaux_sociaux = function(req, res){
  res.status(200);
  res.render('page/reseaux-sociaux', {
    title: 'Réseaux Sociaux', 
    sitename: sitename,
    utilisateur: req.user
  });
};

exports.trouver_une_sortie = function(req, res){
  res.status(200);
  Evenement.find(function(err, evenements){
    res.render('page/trouver-un-evenement', {
      title: 'Trouver une sortie', 
      sitename: sitename,
      evenements: evenements, 
      active: 'Trouver une sortie', 
      utilisateur: req.user
    });
  });
};



