jQuery(function($){
	"use strict";


  $.fn.serializeObject = function(){
     var o = {};
     var a = this.serializeArray();
     $.each(a, function() {
         if (o[this.name]) {
             if (!o[this.name].push) {
                 o[this.name] = [o[this.name]];
             }
             o[this.name].push(this.value || '');
         } else {
             o[this.name] = this.value || '';
         }
     });
     return o;
  };

  var slug = function(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
    var to   = "aaaaaeeeeeiiiiooooouuuunc------";
    for (var i=0, l=from.length ; i<l ; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

    return str;
  };

  var couleurs = {
  "80":"#C4E9F6",
  "02":"#C4E9F6",
  "77":"#C4E9F6",
  "12":"#C4E9F6",
  "47":"#C4E9F6",
  "81":"#C4E9F6",
  "07":"#C4E9F6",
  "90":"#C4E9F6",
  "48":"#C4E9F6",
  "84":"#C4E9F6",
  "01":"#C4E9F6",
  "73":"#C4E9F6",
  "74":"#C4E9F6",
  "39":"#C4E9F6",
  "25":"#C4E9F6",
  "04":"#C4E9F6",
  "05":"#C4E9F6",
  "32":"#C4E9F6",
  "24":"#C4E9F6",
  "51":"#C4E9F6",
  "60":"#C4E9F6",
  "52":"#C4E9F6",
  "88":"#C4E9F6",
  "27":"#C4E9F6",
  "61":"#C4E9F6",
  "79":"#C4E9F6",
  "16":"#C4E9F6",
  "49":"#C4E9F6",
  "53":"#C4E9F6",
  "59":"#C4E9F6",
  "62":"#C4E9F6",
  "08":"#C4E9F6",
  "54":"#C4E9F6",
  "57":"#C4E9F6",
  "67":"#C4E9F6",
  "68":"#C4E9F6",
  "55":"#C4E9F6",
  "87":"#C4E9F6",
  "18":"#C4E9F6",
  "03":"#C4E9F6",
  "41":"#C4E9F6",
  "70":"#C4E9F6",
  "23":"#C4E9F6",
  "36":"#C4E9F6",
  "971":"#C4E9F6",
  "972":"#C4E9F6",
  "974":"#C4E9F6",
  "973":"#C4E9F6",
  "63":"#C4E9F6",
  "43":"#C4E9F6",
  "42":"#C4E9F6",
  "15":"#C4E9F6",
  "19":"#C4E9F6",
  "46":"#C4E9F6",
  "71":"#C4E9F6",
  "26":"#C4E9F6",
  "21":"#C4E9F6",
  "76":"#C4E9F6",
  "38":"#C4E9F6",
  "58":"#C4E9F6",
  "69":"#C4E9F6",
  "91":"#C4E9F6",
  "45":"#C4E9F6",
  "86":"#C4E9F6",
  "10":"#C4E9F6",
  "89":"#C4E9F6",
  "95":"#C4E9F6",
  "37":"#C4E9F6",
  "72":"#C4E9F6",
  "78":"#C4E9F6",
  "28":"#C4E9F6",
  "82":"#C4E9F6",
  "66":"#C4E9F6",
  "11":"#C4E9F6",
  "64":"#C4E9F6",
  "65":"#C4E9F6",
  "09":"#C4E9F6",
  "34":"#C4E9F6",
  "31":"#C4E9F6",
  "06":"#C4E9F6",
  "2B":"#C4E9F6",
  "2A":"#C4E9F6",
  "83":"#C4E9F6",
  "30":"#C4E9F6",
  "13":"#C4E9F6",
  "40":"#C4E9F6",
  "50":"#C4E9F6",
  "14":"#C4E9F6",
  "85":"#C4E9F6",
  "17":"#C4E9F6",
  "33":"#C4E9F6",
  "44":"#C4E9F6",
  "22":"#C4E9F6",
  "35":"#C4E9F6",
  "29":"#C4E9F6",
  "56":"#C4E9F6",
  "93":"#C4E9F6",
  "75":"#C4E9F6",
  "94":"#C4E9F6",
  "92":"#C4E9F6"};
  
  if ( $('#carte-de-france').length > 0 ){

    $('#carte-de-france').vectorMap({
      map: 'france_fr',
      hoverOpacity: 0,
      hoverColor: "#00A1D4",
      backgroundColor: "none",
      colors: couleurs,
      borderColor: "#00A1D4",
      selectedColor: "#EC0000",
      enableZoom: false,
      showTooltip: false,
        onRegionClick: function(element, code, region)
        {
              $(location).attr('href','/trouver-une-sortie/'+slug(region));   
        }
    });

  }

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
  
$('#new-evenement').submit(function(e){
  e.preventDefault();

  //category:    'politique',
    //places:    34, // Nombre de place
    //owner:     'philippe-court', // Identifiant du createur de l'evenement
    //is_public:   1,// Evenement public ou privé ?
    //address:     '117 rue de patis',  // Adresse de l'evenement ou du rendez vous
    //city:        'Marseille', // Ville de l'evenement ou du rendez vous
    //zipcode:     "13000", // Code postal de l'evenement ou du rendez vous

  var formData = $(this).serializeObject();
  formData.slug = slug(formData.title);

  var data = JSON.stringify(formData);

  $.ajax({
    url: "/api/v1/evenements",
    type:"POST",
    data: data,
    contentType:"application/json",
    dataType:"json",
    success: function(){
      $('#creerEvenementModal').foundation('reveal', 'close');
      alertify.log("Votre évenement a bien été enregistré", 'standard', 5000);
    }
  });
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


  if (annyang) {
  // Let's define our first command. First the text we expect, and then the function it should call
  var commands = {
    'Bonjour': function() {
      alert("Bonjour");
    }
  };

  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  annyang.start();

}

  // au clic sur "je souhaite participer"
  $("#btn-participation").on('click',function(){
    socket.emit('nouvelle_demande_inscription_evenement');
  });

});