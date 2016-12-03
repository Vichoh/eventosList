var app = angular.module("app", []);

app.factory('socket', function(){//usar librerías que no son de angular
	var socket = io();
	return socket;
});

app.controller("appChat", function($scope, socket){

	$scope.mensajes = [];
	$scope.mensaje = "";

	$scope.enviarMensaje = function(){
		socket.emit('envioServidor', $scope.mensaje);
		$scope.mensaje = "";
	};

	socket.on('recibirServidor', function(msj){
		$scope.mensajes.push(msj);
		$scope.$digest();//le digo que deje actuar a socket.io, le digo que recargue la view (el controlador)
	});
});