// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

	'facebookAuth' : {
		'clientID' 		: '1556767574549266', // your App ID
		'clientSecret' 	: '2d9050b855d7b7d5c0ae9aaa7c69384f', // your App Secret
		'callbackURL' 	: 'http://localhost:8080/auth/facebook/callback'
	},

	'twitterAuth' : {
		'consumerKey' 		: 'your-consumer-key-here',
		'consumerSecret' 	: 'your-client-secret-here',
		'callbackURL' 		: 'http://localhost:8080/auth/twitter/callback'
	},

	'googleAuth' : {
		'clientID' 		: 'your-secret-clientID-here',
		'clientSecret' 	: 'your-client-secret-here',
		'callbackURL' 	: 'http://localhost:8080/auth/google/callback'
	}

};