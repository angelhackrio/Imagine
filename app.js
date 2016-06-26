/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("Server starting on " + appEnv.url);
});

var bodyParser = require('body-parser');

// Configure Express
app.use(bodyParser.urlencoded({extended: true, limit: '1mb'}));
app.use(bodyParser.json({limit: '1mb'}));

var extend = require('util')._extend;

// VCAP Services for Bluemix
var vcapServices = require('vcap_services');

// Speech to Text Configuration for local dev
var config = extend({
  version: 'v1',
  url: 'https://stream.watsonplatform.net/speech-to-text/api',
  username: 'b5a5efb9-e2dd-484a-a2c2-9f716afc6383',
  password: 'h8dxuIj6umXk'
}, vcapServices.getCredentials('speech_to_text'));

// Rendering Website
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/chat.html');
});

// Instatiating Watson APIs
var watson = require('watson-developer-cloud');

var authService = watson.authorization(config);

// Speech to Text Token Authentication
app.post('/api/token', function(req, res, next) {
  authService.getToken({url: config.url}, function(err, token) {
    if (err)
      next(err);
    else
      res.send(token);
  });
});
