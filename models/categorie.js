// The model!

var mongoose = require('mongoose')
var Schema   = mongoose.Schema;

var categorieSchema = new Schema({
	title:       { type: String, required: true }, // Titre de la categorie
	description: { type: String, required: true }, // Description de la categorie
	categories:  Array,
	icon : { type: String, required: true },
	sorting : { type: Number, required: true },
	color: { type: String, required: true }
});

module.exports = mongoose.model('categorie', categorieSchema);;