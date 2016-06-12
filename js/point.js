
var comentarios;
var object;

$(document).ready(function() {



 getComentarios(){
 $.ajax({
  var url = "http://localhost:8080/secretsites/comments/interestpoint/"+id"";
         		type: 'GET',
         		url: url
         	}).done(function(data) {
         		return data;
         	}).fail(function(error){
         		alert(JSON.stringify(error));
         	});
 }

                             function pendiente(){
                                                                    var url = "http://localhost:8080/secretsites/status";
                                                                    	$.ajax({
                                                                        		type: 'POST',
                                                                        		url: url,
                                                                        		contentType: 'application/x-www-form-urlencoded',
                                                                        		data:{
                                                                        			id: "",
                                                                        			status: "pendent"
                                                                        		}
                                                                        	}).done(function(data) {
                                                                        		console.log(data);
                                                                        	}).fail(function(error){
                                                                        		alert(JSON.stringify(error));
                                                                        	});

                                                                     }

 }



