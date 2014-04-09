jQuery(function($){
	"use strict";

  var couleurs = {"80":"#C4E9F6",
  "02":"#C4E9F6",
  "77":"#C4E9F6",
  "12":"#C4E9F6",
  "47":"#C4E9F6",
  "81":"#C4E9F6",
  "07":"#C4E9F6",
  "90":"#C4E9F6",
  "48":"#C4E9F6",
  "84":"#C4E9F6","01":"#C4E9F6","73":"#C4E9F6","74":"#C4E9F6","39":"#C4E9F6","25":"#C4E9F6",
  "04":"#C4E9F6","05":"#C4E9F6","32":"#C4E9F6","24":"#C4E9F6","51":"#C4E9F6","60":"#C4E9F6",
  "52":"#C4E9F6","88":"#C4E9F6","27":"#C4E9F6","61":"#C4E9F6","79":"#C4E9F6","16":"#C4E9F6",
  "49":"#C4E9F6","53":"#C4E9F6","59":"#C4E9F6","62":"#C4E9F6","08":"#C4E9F6","54":"#C4E9F6",
  "57":"#C4E9F6","67":"#C4E9F6","68":"#C4E9F6","55":"#C4E9F6","87":"#C4E9F6","18":"#C4E9F6",
  "03":"#C4E9F6","41":"#C4E9F6","70":"#C4E9F6","23":"#C4E9F6","36":"#C4E9F6","971":"#C4E9F6",
  "972":"#C4E9F6","974":"#C4E9F6","973":"#C4E9F6","63":"#C4E9F6","43":"#C4E9F6","42":"#C4E9F6",
  "15":"#C4E9F6","19":"#C4E9F6","46":"#C4E9F6","71":"#C4E9F6","26":"#C4E9F6","21":"#C4E9F6","76":
  "#C4E9F6","38":"#C4E9F6","58":"#C4E9F6","69":"#C4E9F6","91":"#C4E9F6","45":"#C4E9F6",
  "86":"#C4E9F6","10":"#C4E9F6","89":"#C4E9F6","95":"#C4E9F6","37":"#C4E9F6","72":"#C4E9F6",
  "78":"#C4E9F6","28":"#C4E9F6","82":"#C4E9F6","66":"#C4E9F6","11":"#C4E9F6","64":"#C4E9F6",
  "65":"#C4E9F6","09":"#C4E9F6","34":"#C4E9F6","31":"#C4E9F6","06":"#C4E9F6","2B":"#C4E9F6",
  "2A":"#C4E9F6","83":"#C4E9F6","30":"#C4E9F6","13":"#C4E9F6","40":"#C4E9F6","50":"#C4E9F6",
  "14":"#C4E9F6","85":"#C4E9F6","17":"#C4E9F6","33":"#C4E9F6","44":"#C4E9F6","22":"#C4E9F6",
  "35":"#C4E9F6","29":"#C4E9F6","56":"#C4E9F6","93":"#C4E9F6","75":"#C4E9F6","94":"#C4E9F6","92":"#C4E9F6"};
  
  $('#carte-de-france').vectorMap({
    map: 'france_fr',
    hoverOpacity: 0.5,
    hoverColor: false,
    backgroundColor: "none",
    colors: couleurs,
    borderColor: "#00A1D4",
    selectedColor: "#EC0000",
    enableZoom: true,
    showTooltip: true,
      onRegionClick: function(element, code, region)
      {
          var message = 'Département : "'
              + region 
              + '" || Code : "'
              + code
        + '"';
           
          alert(message);
      }
  });

  $("#inscription-nouveau-utilisateur").submit(function(e){
    e.preventDefault();
    var utilisateur = { 
      local: {
        firstname: 'PHILIPPE',
        lastname: 'COURT',
        password: 'COURT1986',
        //address: '117 Rue de paris',
        //zipcode: '94220',
        email: 'philippe.court2@gmail.com',
        //sex: 'M',
        //pseudo: 'toto',
        //birth: '15/01/1986'
      }
    };
    $.post('/api/v1/utilisateurs',utilisateur);
  });

  // rafaichir le nombre d'evenement en cours
  var refreshCountEvents = function(){
    $.getJSON("/api/v1/evenements/count", function(data){
      $('#nb-evenements').html(data.count);
    });
  };

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
		"oLanguage": {
				"oPaginate" : {
          "sPageNext": "button",
					"sSearch" : 'Rechercher',
					"sNext" : 'Dernier',
					"sPrevious" : 'Premier'
				}
		},
    "aoColumns": [
      { "asSorting": [ "desc", "asc", "asc" ] },null,
      { "asSorting": [ "desc" ] },null,null
    ]
  });
  
	//client side socket.io
	//var socket = io.connect('http://ishuah.com:8080');
	var socket = io.connect();
	var app = {

		init: function(){
			this.socketActions();

      refreshCountEvents();
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


       
       socket.emit('nouvelle_demande_desinscription_evenement');

    }
	};

	window.App = app.init();

  // au clic sur "je souhaite participer"
  $("#btn-participation").on('click',function(){
    socket.emit('nouvelle_demande_inscription_evenement');
  });

});