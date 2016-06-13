function ajaxGet(getUrl) {
	$.ajax({
		type: 'GET',
		url: getUrl
	}).done(function(data) { 
		return data;
	}).fail(function(error){
		alert(JSON.stringify(error));
	});
}
var id,status,purl;
function getcomentarios(data){
var html="";
                                  		for(var i=0; i< data.comments.comments.length;i++){
                                  		var date = new Date(data.comments.comments[i].creationTimestamp*1000);
                                        // Hours part from the timestamp
                                        var hours = date.getHours();
                                        // Minutes part from the timestamp
                                        var minutes = "0" + date.getMinutes();
                                        // Seconds part from the timestamp
                                        var seconds = "0" + date.getSeconds();

                                        // Will display time in 10:30:23 format
                                        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

                              html+='<li class="media">  <div class="media-body">  <div class="media">     <div class="media-body">'+data.comments.comments[i].text+' <br> <small class="text-muted">'+data.comments.comments[i].username+' |'+formattedTime+' </small>     <hr> </div>   </div>  </div> </li>';
                                  		}console.log(html);
                                  		$("#comentarios").html(html);
}
function visitado(callback){
                                   var url = "http://eetacdsa2c.upc.es:8085/secretsites/interestpoints/status";
                                   	$.ajax({
                                       		type: 'POST',
                                       		url: url,
                                       		contentType: 'application/x-www-form-urlencoded',
                                       		headers:{"X-Auth-Token":obtenerCookie("token")},
                                       		data:{
                                       			id: id,
                                       			status: "visited"
                                       		}
                                       	}).done(function(data) {
                                       		console.log(data);
                                       		location.reload();
                                       	}).fail(function(error){
                                       		alert(JSON.stringify(error));
                                       	});
                                       	callback();



 }
 function pendiente(callback){
                                   var url = "http://eetacdsa2c.upc.es:8085/secretsites/interestpoints/status";
                                   	$.ajax({
                                       		type: 'POST',
                                       		url: url,
                                       		contentType: 'application/x-www-form-urlencoded',
                                       		headers:{"X-Auth-Token":obtenerCookie("token")},
                                       		data:{
                                       			id: id,
                                       			status: "pendent"
                                       		}
                                       	}).done(function(data) {
                                       		console.log(data);
                                       		location.reload();
                                       	}).fail(function(error){
                                       		alert(JSON.stringify(error));
                                       	});
                                       	callback();

 }

 function borrarpunto(callback){
                                   var url = "http://eetacdsa2c.upc.es:8085/secretsites/interestpoints";
                                   	$.ajax({
                                       		type: 'DELETE',
                                       		url: url,
                                       		contentType: 'application/x-www-form-urlencoded',
                                       		headers:{"X-Auth-Token":obtenerCookie("token")},
                                       		data:{
                                       			id: id
                                       		}
                                       	}).done(function(data) {
                                       		console.log(data);
                                       		location.reload();
                                       	}).fail(function(error){
                                       		alert(JSON.stringify(error));
                                       	});
                                       	callback();

 }
 function info(data){
$("#nombre").html(data.name);
$("#estrellas").html(data.rating);
$("#foto").html("<img src=\"http://eetacdsa2c.upc.es:8085/"+purl+"\" width=\"100%\" onerror=\"if (this.src != '404.png') this.src = '404.png';\">");

var uno = '<ol class="carousel-indicators">';
var dos = '';
var cuatro = '';
for(var i = 0; i < data.photos.photos.length; i++){
 dos+='<li data-target="#dos" data-slide-to="'+i+'" class="active"></li>';
 if(i==0){
  cuatro +=  '<div class="item active"> <img src="http://eetacdsa2c.upc.es:8085/'+purl+'" alt=" if(this.src != \'404.png\') this.src = \'404.png\';"> </div>';
 }else{
  cuatro +=  '<div class="item"> <img src="http://eetacdsa2c.upc.es:8085/'+purl+'" alt="" onerror="if(this.src != \'404.png\') this.src = \'404.png\';"> </div>';
 }
}
var tres = '</ol> <!-- Wrapper for slides --> <div class="carousel-inner" role="listbox">';
var cinco = '</div> <!-- Left and right controls --> <a class="left carousel-control" href="#dos" role="button" data-slide="prev"> <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span> <span class="sr-only">Previous</span> </a> <a class="right carousel-control" href="#dos" role="button" data-slide="next"> <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span> <span class="sr-only">Next</span> </a>';
var html = uno + dos + tres + cuatro + cinco;
console.log(html);
$("#dos").html(html);
 }
$(window).ready(function(){
$("#tcomentario").hide();
$("#papelera").hide();
$("#comentar").hide();
$("#coment2").show();
$("#coment").hide();
$("#lablog").hide();
$("#flag").click(function() {
visitado(function(){
$("#flag").css("color","#40FF00");
})
			 console.log("ola");
       });
       $("#corazon").click(function() {
       pendiente(function(){
       $("#corazon").css("color","red");
       })
       			 console.log("ola");
              });
$("#dos").hide();
	id =location.href.split('=')[1];
	console.log(id);

	var url = "http://eetacdsa2c.upc.es:8085/secretsites/interestpoints/" + location.href.split('=')[1];
	if(obtenerCookie("token") != undefined ){
      		if(obtenerCookie("token") != ""){
				$("#tcomentario").show();
				$("#comentar").show();
				$("#coment").show();
				$("#lablog").show();
				$("#labnolog").hide();


      			$.ajax({
                                                  		type: 'GET',
                                                  		url: url,
                                                  		headers:{"X-Auth-Token":obtenerCookie("token")}
                                                  	}).done(function(data) {
                                                  		console.log(data);
                                                  		getcomentarios(data);
                                                  		info(data);
                                                  		status=data.status;
                                                  		purl=data.bestPhoto.id + ".png";
                                                  		if(data.status=="visited"){
                                                  		$("#flag").css("color","#40FF00");

                                                  		}
                                                  		else if(data.status=="pendent"){
                                                  		       $("#corazon").css("color","red");
                                                  		       $("#flag").css("color","gray");

                                                  		}
                                                  		id = data.id;
                                                  	}).fail(function(error){
                                                  		location.href = "/";
                                                  	});
      			}
      			else {
      			$.ajax({
                                                  		type: 'GET',
                                                  		url: url
                                                  	}).done(function(data) {
                                                  		console.log(data);
                                                  		$("#iconos").hide();
                                                  		getcomentarios(data);
                                                  		info(data);
                                                  		id = data.id;
                                                  	}).fail(function(error){
                                                  		location.href = "/";
                                                  	});
                                                  	}
      		}
      		else{$.ajax({
                                                   		type: 'GET',
                                                   		url: url,
                                                   	}).done(function(data) {
                                                   		console.log(data);
                                                   		$("#iconos").hide();
                                                   		getcomentarios(data);
                                                   		info(data);
                                                   		id = data.id;
                                                   	}).fail(function(error){
                                                   		location.href = "/";
                                                   	});}


                                                     $("#comentar").click(function(){
                                                     comentario();
                                                     })

                                                     function comentario(data){
                                                                                                                                            var url = "http://eetacdsa2c.upc.es:8085/secretsites/comments";
                                                                                                                                            	$.ajax({
                                                                                                                                                		type: 'POST',
                                                                                                                                                		url: url,
                                                                                                                                                		contentType: 'application/x-www-form-urlencoded',
                                                                                                                                                		headers:{"X-Auth-Token":obtenerCookie("token")},
                                                                                                                                                		data:{
                                                                                                                                                			pointid: id,
                                                                                                                                                			text: $("#tcomentario").val()
                                                                                                                                                		}
                                                                                                                                                	}).done(function(data) {
                                                                                                                                                		console.log(data);
                                                                                                                                                		location.reload();
                                                                                                                                                	}).fail(function(error){
                                                                                                                                                		alert(JSON.stringify(error));
                                                                                                                                                	});

                                                                                                          }

                                                     $( "#papelera" ).click(function() {
                                                       borrarpunto();
                                                      });




})
