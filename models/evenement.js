// The model!

var mongoose = require('mongoose')
var Schema   = mongoose.Schema;

var evenementSchema = new Schema({
	title:       { type: String, required: true }, // Titre de l'evenement
	description: { type: String, required: true }, // Description de l'evenement
	category: 	 { type: String, required: true },
	places: 	 Number, // Nombre de place
	created_at:  { type: Date, default: Date.now },   // Date de creation de l'evenement
	updated_at:  { type: Date, default: Date.now },
	start_at:    { type: Date },   // Date de début de l'evenement
	end_at:      { type: Date },   // Date de fin de l'evenement
	owner: 		 String, // Identifiant du createur de l'evenement
	is_public:   Boolean,// Evenement public ou privé ?
	address:     { type: String, required: true },  // Adresse de l'evenement ou du rendez vous
	city:        { type: String, required: true }, // Ville de l'evenement ou du rendez vous
	zipcode:     { type: String, required: true }, // Code postal de l'evenement ou du rendez vous
	//state:       { type: String, required: true }, // Région de l'evenement ou du rendez vous
	//country:     { type: String, required: true }, // Pays de l'evenement ou du rendez vous
	locked:      Boolean,// Evenement bloqué? 
	archived:    Boolean, // Evenement Archivé passé ?
	registrations: Array
});


module.exports = mongoose.model('evenement', evenementSchema);