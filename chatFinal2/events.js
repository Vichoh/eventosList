//server
module.exports=function(io, cancion){
	
	io.sockets.on('connection', function(socket) {
		
		console.log('Bienvenido');

		socket.on('envioServidor', function(texto){//escuchar evento cuando presiono el boton
			
			io.sockets.emit('recibirServidor', texto);
			
		});



		socket.on('votacion', function (response){
			console.log(response);
			var bson_cancion = new cancion(response);
			console.log(response);
		 bson_cancion.save(function(){
			console.log("votacion guardada");
		 });


		 });


		socket.on('cancionSiguiente', function (response){
			console.log(response);

			var cantidad = 0;
			var numeroCancionMasRepetida = 0;
			var aux = cancion.find({nombre:i+1}).count();
			for (var i = 0; i < 4; i++) {
				var aux = cancion.find({nombre:i+1}).count();
				console.log(aux);
				if (cantidad <  aux) {
					cantidad = aux;
					numeroCancionMasRepetida = i+1;
				};
			};
			console.log(numeroCancionMasRepetida);

			var nombreCancion = "Love20u.mp3";
			socket.emit('nombreCancion', nombreCancion);
		})




	 });






	

	


};