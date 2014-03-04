// The model!
function init(Schema, mongoose){
	var EvenementSchema = new Schema({
		title:       String,
		description: String,
		locked:      Boolean,
		archived:    Boolean
	});

	return mongoose.model('Evenements', EvenementSchema);
}

module.exports.init = init;