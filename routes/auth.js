module.exports = function(app, passport, routes) {
// Page d'accueil racine du site
app.get('/', routes.index);

// Liste les categories pour debuter la recherche
app.get('/trouver-une-sortie', routes.action_trouver_une_sortie);

// Liste de evenements de la personne connectée
app.get('/mes-evenements', routes.action_mes_evenements);

// Affiche la page de gestion du compte de la personne connectée
app.get('/mon-compte', routes.action_mon_compte);

// Affiche la page formulaire d'ajout nouvel evenement
app.get('/mes-evenements/nouveau', routes.action_formulaire_evenement_nouveau);

// Affiche la page des condition generales d'utilisation
app.get('/conditions-generales-d-utilisation', routes.action_afficher_cgu);

// traitement ajout d'evenement
app.post('/evenement/ajouter', routes.action_creer_evenement);

// Affiche la page de gestion du compte de la personne connectée
app.get('/evenement/supprimer/:id', routes.action_supprimer_evenement);

// Affiche la page detail ou fiche de 
app.get('/evenement/fiche/:id', routes.action_afficher_evenement);

// Page 404
//app.get('*', routes.not_found);
	// process the signup form
	// app.post('/signup', do all our passport stuff here);

	// =====================================
	// PROFILE SECTION =====================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/mon-compte', isLoggedIn, function(req, res) {
		res.render('mon-compte', {
			utilisateur : req.user // get the utilisateur out of session and pass to template
		});
	});

	// =====================================
	// FACEBOOK ROUTES =====================
	// =====================================
	// route for facebook authentication and login
	app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

	// handle the callback after facebook has authenticated the utilisateur
	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/mon-compte',
			failureRedirect : '/'
		}));

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/deconnexion', function(req, res) {
		req.logout();
		res.redirect('/');
	});

		// process the signup form
	app.post('/inscription', passport.authenticate('local-signup', {
		successRedirect : '/mon-compte', // redirect to the secure profile section
		failureRedirect : '/inscription', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

		// process the login form
	app.post('/connexion', passport.authenticate('local-login', {
		successRedirect : '/mon-compte', // redirect to the secure profile section
		failureRedirect : '/connexion', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));


	app.get('*', function(req, res, next) {
	  // put utilisateur into res.locals for easy access from templates
	  res.locals.utilisateur = req.utilisateur || null;

	  next();
	});
};

// route middleware to make sure a utilisateur is logged in
function isLoggedIn(req, res, next) {

	// if utilisateur is authenticated in the session, carry on 
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}