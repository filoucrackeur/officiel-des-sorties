// app/models/utilisateur.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');

var utilisateurSchema = mongoose.Schema({

    local            : {
        email        : String,
        password     : String,
        firstname    : String,
        lastname     : String,
        //address      : String,
        updated      : { type: Date, default: Date.now }
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});


// generation du hash pour le mot de passe
utilisateurSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// On verifi si le mot de passe est valide
utilisateurSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('utilisateur', utilisateurSchema);