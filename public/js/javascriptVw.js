$(document).ready(function(){	
	var status = true;
	$('#btnPlay').click(function(){
		if(status){
			status = false;
			$("#btnPlay").html("<img class='img-responsive' src='images/play.png' alt='tocar'>");
			pauseAudio();
		}else{
			$("#btnPlay").html("<img class='img-responsive' src='images/pause.png' alt='pausar'>")
			status = true;
			playAudio();
		}
	});
	$( ".redondoMaishist" ).click(function() {
		if($(".textoHist").is(":hidden")){
			$( '.textoHist' ).slideDown();
		}else {
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


