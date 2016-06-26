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

// Mutipart Middleware to get files from form data upload
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();


// Instatiating Watson APIs
var watson = require('watson-developer-cloud');
var fs = require('fs');

var speech_to_text = watson.speech_to_text({
  username: 'efe606e8-a364-4d75-a525-d104abb62919',
  password: '3l4O5Pm0ioOa',
  version: 'v1',
});

var params = {
  content_type: 'audio/wav',
  continuous: true,
  interim_results: true,
  model: 'pt-BR_BroadbandModel'
};

// When file is uploaded, send it to watson to speech to text
app.post('/uploadSound', multipartMiddleware, function(req, res) {
  console.log(req.body, req.files);
  // don't forget to delete all req.files when done
  var sound = req.files.sound;

  // Create the stream.
  var recognizeStream = speech_to_text.createRecognizeStream(params);

  // Pipe in the audio.
  fs.createReadStream(sound.path).pipe(recognizeStream);

  // Get strings instead of buffers from 'data' events.
  recognizeStream.setEncoding('utf8');

  // Listen for events.
  recognizeStream.on('data', function(event) { onEvent('Data:', event); });
  recognizeStream.on('results', function(event) { onResults('Results:', event); });
  recognizeStream.on('error', function(event) { onEvent('Error:', event); });
  recognizeStream.on('close-connection', function(event) { onEvent('Close:', event); });

  // Displays events on the console.
  function onEvent(name, event) {
      console.log(name, JSON.stringify(event, null, 2));
  }
  function onResults(name, event) {
      console.log(name, JSON.stringify(event, null, 2));
      if (event.results[0]){
        console.log(name, JSON.stringify(event.results[0]));
        if (event.results[0].alternatives) {
          console.log(event.results[0].alternatives[0].transcript);
          res.json(event.results[0].alternatives[0].transcript);
        } else {
          res.status(400).json('Could not transcript');
        }
      } else {
        res.status(400).json('Could not transcript');
      }
  }

});
