
$(document).ready(function(){
	var suma=0;

    $(document).keypress(function(e) {
       if(e.which == 13) {
          var agregar = $("input[name=mensaje]").val();
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
       }
    });
});


