$(document).ready(function(){	
	var status = true;
	$('#btnPlay').click(function(){
		if(status){
			status = false;
			pauseAudio();
		}else{
			status = true;
			playAudio();
		}
	});
	$( ".redondoMaishist" ).click(function() {
	if($(".textoHist").is(":hidden")){
		$( '.textoHist' ).slideDown();
	}	else {
    		$( ".textoHist" ).hide('slow');
  		}
	});
});

	var vid = document.getElementById("audioPost"); 

	function playAudio() { 
	    vid.play(); 
	} 

	function pauseAudio() { 
	    vid.pause(); 
	}


