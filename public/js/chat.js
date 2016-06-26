(function(){

  var recordButton = $('#recordButton');

  recordButton.click((function() {

    var running = false;
    // var token = ctx.token;
    var micOptions = {};
    var mic = new Microphone(micOptions);

    return function(evt) {
      // Prevent default anchor behavior
      evt.preventDefault();
      //
      // var currentModel = localStorage.getItem('currentModel');
      // var currentlyDisplaying = localStorage.getItem('currentlyDisplaying');
      //
      // if (currentlyDisplaying == 'sample' || currentlyDisplaying == 'fileupload') {
      //   showError('Currently another file is playing, please stop the file or wait until it finishes');
      //   return;
      // }
      // localStorage.setItem('currentlyDisplaying', 'record');
      if (!running) {
        $('#resultsText').val('');   // clear hypotheses from previous runs
        console.log('Not running, handleMicrophone()');
        handleMicrophone(token, currentModel, mic, function(err) {
          if (err) {
            var msg = 'Error: ' + err.message;
            console.log(msg);
            showError(msg);
            running = false;
            // localStorage.setItem('currentlyDisplaying', 'false');
          } else {
            recordButton.css('background-color', '#d74108');
            // recordButton.find('img').attr('src', 'images/stop.svg');
            console.log('starting mic');
            mic.record();
            running = true;
          }
        });
      } else {
        console.log('Stopping microphone, sending stop action message');
        recordButton.removeAttr('style');
        // recordButton.find('img').attr('src', 'images/microphone.svg');
        // $.publish('hardsocketstop');
        mic.stop();
        running = false;
        // localStorage.setItem('currentlyDisplaying', 'false');
      }
    };
  })());

})();
