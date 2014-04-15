// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

// load up the user model
var Utilisateur = require('../models/utilisateur');

// load the auth variables
var configAuth = require('./auth');

// expose this function to our app using module.exports
module.exports = function(passport) {
    // used to serialize the user for the session
    passport.serializeUser(function(utilisateur, done) {
        done(null, utilisateur.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        Utilisateur.findById(id, function(err, utilisateur) {
            done(err, utilisateur);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        // adresseField  : 'adresse',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
        process.nextTick(function() {

            Utilisateur.findOne({ 'local.email' :  email }, function(err, utilisateur) {
                // if there are any errors, return the error
                if (err)
                    return done(err);

                // check to see if theres already a user with that email
                if (utilisateur) {
                    return done(null, false, req.flash('signupMessage', 'Cette adresse email existe déjà'));
                } else {

                    // if there is no user with that email
                    // create the user
                    var newUtilisateur = new Utilisateur();

                    // set the user's local credentials
                    newUtilisateur.local.email    = email;
                    newUtilisateur.local.password = newUtilisateur.generateHash(password);
                    //newUtilisateur.local.adresse  = adresse;

                    // Ajout de l'utillisateur en base de données
                    newUtilisateur.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUtilisateur);
                    });
                }
            });
        });

    }));

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        Utilisateur.findOne({ 'local.email' :  email }, function(err, utilisateur) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!utilisateur)
                return done(null, false, req.flash('loginMessage', 'Aucun utilisateur trouvé')); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!utilisateur.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Mauvais mot de passe')); // create the loginMessage and save it to session as flashdata

            return done(null, utilisateur);
        });

    }));

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL

    },

    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {
            // find the user in the database based on their facebook id
            Utilisateur.findOne({ 'facebook.id' : profile.id }, function(err, utilisateur) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found, then log them in
                if (utilisateur) {
                    return done(null, utilisateur); // user found, return that user
                } else {
                    // if there is no user found with that facebook id, create them
                    var newUser = new Utilisateur();

                    // set all of the facebook information in our user model
                    newUser.facebook.id    = profile.id; // set the users facebook id                   
                    newUser.facebook.token = token; // we will save the token that facebook provides to the user                    
                    newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                    newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
                    newUser.local.firstname = profile.name.givenName;
                    newUser.local.lastname = profile.name.familyName;

                    // save our user to the database
                    newUser.save(function(err) {
                        if (err)
                            throw err;

                        // if successful, return the new user
                        return done(null, newUser);
                    });
                }

            });
        });

    }));
};
