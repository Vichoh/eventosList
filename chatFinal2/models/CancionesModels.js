var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/canciones');

var cancion_schema = new Schema(
	{
		nombre: String
		}
	);

var cancionch = mongoose.model('cancionch', cancion_schema);
module.exports.cancionch = cancionch;


