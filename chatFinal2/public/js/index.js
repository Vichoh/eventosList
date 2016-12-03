//Cliente
var socket = io();
var suma=0;

$(document).keypress(function(e) {
    console.log("hola");
    if(e.which == 13) {
      var agregar = $("input[name=mensaje]").val();
      if(agregar.length>0){
        socket.emit('envioServidor', agregar);//emito un evento cuando hace click
        $("input").val("");
        return false;
      }
    }
});

socket.on('recibirServidor', function (data) {
	//$('#messages').append('<li> '+data+'</li>');

      var agregar = data;
      if(agregar.length>0){
        if(suma==0){
          suma+=10;
        }else{
        var elemento = $("p:last-child");
        var posicion = elemento.height();
        suma+=posicion+30;
      }
      if(($("#chat").scrollTop() + $("#chat").height()) == $('#chat')[0].scrollHeight) {
        $("#mensajes").append("<p>"+agregar+"</p>");
        $("p:last-child").animate({bottom:"-="+suma+"px"},0);
        $("#chat").animate({ scrollTop: $('#chat')[0].scrollHeight}, 1000);
    }else{
      $("#mensajes").append("<p>"+agregar+"</p>");

      $("p:last-child").animate({bottom:"-="+suma+"px"},0);
    }
      $("input").val("");
  }
    
});

$(document).ready(function(){
  $('#caja1').click(function(){
    $( this).slideUp();
    var nombreCancion = {nombre: "1"};
    socket.emit('votacion',nombreCancion);
  });
  $('#caja2').click(function(){
    $( this).slideUp();
    var nombreCancion = {nombre: "2"};
    socket.emit('votacion',nombreCancion);
  });
  $('#caja3').click(function(){
    $( this).slideUp();
    var nombreCancion = {nombre: "3"};
    socket.emit('votacion',nombreCancion);
  });
  $('#caja4').click(function(){
    $( this).slideUp();
    var nombreCancion = {nombre: "4"};
    socket.emit('votacion',nombreCancion);
  });
});

var bandera= true;
$(document).ready(function(){
  
  $("#mas").click(function(){
    
    $(".barlat").toggleClass('hideBar');
    
    $(".barTop").toggleClass('col-md-9','col-md-12');
    $(".contenido").toggleClass('col-md-9','col-md-12');
    $(".barBotm").toggleClass('col-md-9','col-md-12');

    
  });
});