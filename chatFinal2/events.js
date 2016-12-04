//server
module.exports=function(io, cancion, path, fs){
	

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

			// obtener las canciones de canciones.json
			fs.readFile(path.join(__dirname, 'canciones.json'), 'utf8', function (err, canciones){
				var json = canciones;
				var parsed = JSON.parse(json);


				//pasar las canciones json a un array
				var arr = [];
				for (var x in parsed){
					arr.push(parsed[x].nombre);
				};

				console.log(arr);

				//sacar 4 canciones random y asignarlas a un nuevo array
				var listaCanciones = [];
				var num =[];

				for (var i = 0; i < arr.length; i++) {
					num.push(i);
				};

				
				

				for (var i = 0; i < 4; i++) {
					var indice =  Math.floor(Math.random()*num.length);
					listaCanciones.push(arr[indice]);
				};


				console.log(listaCanciones);
				var cantidad = 0;
				
				//listaCanciones = ['We_Are_Your_Friends.mp3','Love20u.mp3','Heathens.mp3','Elysium.mp3'];
				
				var numeroCantidadCanciones = [];
				var icont = 0;
				for (var i = listaCanciones.length ; i > 0 ; i--) {

					

					cancion.find({nombre:i}).count(function (err,docs){
						
						numeroCantidadCanciones.push ([docs]);
						console.log(numeroCantidadCanciones);

						if (numeroCantidadCanciones.length == 4 ) {

							console.log("aca es = a 4");
							for (var i = numeroCantidadCanciones.length ; i > 0; i--) {
								if (cantidad <  numeroCantidadCanciones[i]) {
									cantidad = numeroCantidadCanciones[i];
									icont = i;
								


								};
					
							};
							console.log(icont);
							socket.emit('nombreCancion', listaCanciones[icont ]);
						};

					

					});

					
				};
						


				
			});

					

		});

		socket.on('borrarColeccion', function(response){
			console.log(response);

			cancion.remove(function (err){
				if (err)
					console.log(err)
				else
					console.log(err)
			});

		}); 
			

	 });






	

	


};