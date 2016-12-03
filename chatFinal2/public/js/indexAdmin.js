$(function(){

	// buscamos el elemento audio del dom (html)
	var audio =$('audio');
	var reproductor = document.getElementById("miaudio");
	var socket = io();	


	function cargarCanciones(){
		$.ajax({
			url: '/canciones'

		}).done(function(canciones){
			var lista = $('.lista-canciones');
			lista.empty();
			canciones.forEach(function(cancion){
				//creacion de los elementos de la lista 
				var nuevoElemento = $('<li class="cancion">'+cancion.nombre+'</li>');
 				
				nuevoElemento
					.on('click', cancion, play)// 1 cuando hacemos clic en un elemento le pasaremos la cancion
					.appendTo(lista);//2

					
			});


		

		}).fail(function(){
			alert('no pude cargar las canciones ');
		})


	}

	// la funcion play cambia el src para que sea dinamico y no estatico y poder cambiar la cancion

	function play(evento){
		//audio[0].pause();
		audio.attr('src', '/canciones/' + evento.data.nombre);
		audio[0].play();

		
		reproductor.addEventListener("ended",function(){
			
				
		
			socket.emit('cancionSiguiente', "termino" );
			socket.emit('borrarColeccion', "Borrado");

			socket.on('nombreCancion', function (response){
					audio.attr('src', '/canciones/' + response);
					audio[0].play();
				})
			
		});
		
	}

	


	cargarCanciones();
	
}); 