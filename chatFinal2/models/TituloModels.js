var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.createConnection('mongodb://localhost/titulos');

var titulo_schema = new Schema(
	{
		nombre: String,
		id : String
		}
	);

var tituloch = mongoose.model('tituloch', titulo_schema);
module.exports.tituloch = tituloch;


