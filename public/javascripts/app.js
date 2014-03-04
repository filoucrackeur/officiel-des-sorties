
jQuery(function($){
	"use strict";

	//client side socket.io
	//var socket = io.connect('http://ishuah.com:8080');
	var socket = io.connect();
	var app = {

		init: function(){
			this.socketActions();
		},


		socketActions: function(){
			 socket.on('count', function (data) {
			    $('#online').html(data.count);
			  });
		}


	};

	window.App = app.init();
});


