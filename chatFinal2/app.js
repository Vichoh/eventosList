var port 				= process.env.PORT || 8000,
	express 			= require('express'),
	app 				= express(),
	path 				= require('path');
	fs 					= require('fs');
	mediaserver 		= require('mediaserver');
	multer 				= require('multer');
	io					= require('socket.io').
								listen(
									app.listen(port, function(){
										console.log('listening on *:8000');
									})
								);

var cancion = require('./models/CancionesModels').cancionch;

require('./config')(app);
require('./routes')(app, path, fs, mediaserver, multer, express);
require('./events')(io, cancion);
