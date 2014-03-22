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



	$(document).foundation();


	$('#tab-my-events').dataTable({
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
			 socket.on('utilisateurs_connectes', function (data) {

          alertify.log("Une personne consulte votre évenement", 'standard', 5000);
          alertify.log("Une personne viens de s\'inscrire à votre évenement", 'standard', 5000);

			    $('#online').html(data.utilisateurs_connectes);
			  });
		}


	};

	window.App = app.init();
});


