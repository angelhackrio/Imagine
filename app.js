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

// Get Sound File from Front-End
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
app.post('/uploadSound', multipartMiddleware, function(req, resp) {
  console.log(req.body, req.files);
  // don't forget to delete all req.files when done
});

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
  interim_results: true
};

// // Create the stream.
// var recognizeStream = speech_to_text.createRecognizeStream(params);
//
// // Pipe in the audio.
// fs.createReadStream('audio-file.wav').pipe(recognizeStream);
//
// // Pipe out the transcription to a file.
// recognizeStream.pipe(fs.createWriteStream('transcription.txt'));
//
// // Get strings instead of buffers from 'data' events.
// recognizeStream.setEncoding('utf8');
//
// // Listen for events.
// recognizeStream.on('data', function(event) { onEvent('Data:', event); });
// recognizeStream.on('results', function(event) { onEvent('Results:', event); });
// recognizeStream.on('error', function(event) { onEvent('Error:', event); });
// recognizeStream.on('close-connection', function(event) { onEvent('Close:', event); });
//
// // Displays events on the console.
// function onEvent(name, event) {
//     console.log(name, JSON.stringify(event, null, 2));
// };
