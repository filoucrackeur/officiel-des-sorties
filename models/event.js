// The model!

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var eventsSchema = new Schema({
	title:       { type: String, required: true }, // Titre de l'evenement
	description: String, // Description de l'evenement
	places: 	 Number, // Nombre de place
	created_at:  { type: Date, default: Date.now },   // Date de creation de l'evenement
	updated_at:  { type: Date, default: Date.now },
	start_at:    { type: Date },   // Date de début de l'evenement
	end_at:      { type: Date },   // Date de fin de l'evenement
	owner: 		 String, // Identifiant du createur de l'evenement
	is_public:   Boolean,// Evenement public ou privé ?
	address:     String, // Adresse de l'evenement ou du rendez vous
	city:        String, // Ville de l'evenement ou du rendez vous
	state:       String, // Région de l'evenement ou du rendez vous
	country:     String, // Pays de l'evenement ou du rendez vous
	locked:      Boolean,// Evenement bloqué? 
	archived:    Boolean // Evenement Archivé passé ?
});

module.exports = mongoose.model('Event', eventsSchema);;