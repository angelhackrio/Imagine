var mic, recorder, soundFile;
var state = 0;

function setup(){
  mic = new p5.AudioIn();
  mic.start();
  recorder = new p5.SoundRecorder();
  recorder.setInput(mic);
  soundFile = new p5.SoundFile();
}

function clicou(){
  if(state === 0 && mic.enabled){
    console.log('gravando');
    recorder.record(soundFile);
    state++;
  } else if (state === 1){
    console.log('gravou');
    recorder.stop();
    state++;
  }else {
    console.log('playou');
    soundFile.play();
    console.log(soundFile);
    
    var formData = new FormData();
    var blob = new Blob(recorder);
    formData.append('sound', blob);
    var request = new XMLHttpRequest();
    request.open("POST", "/uploadSound");
    request.send(formData);

    saveSound(soundFile, 'mySound.wav');
  }
}