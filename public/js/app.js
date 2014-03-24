jQuery(function($){
	"use strict";

/*
var geocoder;
var map;

 TrouverAdresse();
function TrouverAdresse() {
	var adresse = $('#apercu-carte').data('adresse');
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(48.8566667, 2.3509871);
  var mapOptions = {
    zoom      : 14,
    center: latlng,
    mapTypeId : google.maps.MapTypeId.ROADMAP
  }
  map = new google.maps.Map(document.getElementById('apercu-carte'), mapOptions);
  geocoder.geocode( { 'address': adresse}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
 
      // Création du marqueur du lieu (épingle)
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
 		// map-canvas est le conteneur HTML de la carte Google Map
  		
		// Lancement de la construction de la carte google map
    } else {
      alert('Adresse introuvable: ' + status);
    }
  });
}
*/

 $(window).bind("load", function () {
    var footer = $("footer");
    var pos = footer.position();
    var height = $(window).height();
    height = height - pos.top;
    height = height - footer.height();
    if (height > 0) {
        footer.css({
            'margin-top': height + 'px'
        });
    }
  });

	$(document).foundation();


	$('#tab-mes-evenements').dataTable({
		"bPaginate": true,
			"oLanguage": {
				"oPaginate" : {
					"sSearch" : 'Rechercher',
					"sLast" : 'Dernier',
					"sFirst" : 'Premier'
				}
			},
            "aoColumns": [
      			{ "asSorting": [ "desc", "asc", "asc" ] },
           		null,
      			{ "asSorting": [ "desc" ] },
                null,
                null
            ]
        } );
  
	//client side socket.io
	//var socket = io.connect('http://ishuah.com:8080');
	var socket = io.connect();
	var app = {

		init: function(){
			this.socketActions();
		},


    socketActions: function(){
       socket.on('nouveau_visiteur', function (data) {

          //alertify.log("Vous êtes connecté", 'standard', 5000);
          $('#visiteurs').html(data.visiteurs);
        });
       socket.on('nouveau_connecte', function (data) {

          //alertify.log("Vous êtes connecté", 'standard', 5000);
          $('#connectes').html(data.connectes);
        });
    }
	};

	window.App = app.init();
});


