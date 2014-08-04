(function(){

	// the minimum version of jQuery we want
	var v = "1.3.2";
	var x;
	var startstop = 0;
	
	// check prior inclusion and version
	if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
		var done = false;
		var script = document.createElement("script");
		script.src = "http://ajax.googleapis.com/ajax/libs/jquery/" + v + "/jquery.min.js";
		script.onload = script.onreadystatechange = function(){
			if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
				done = true;
				getUserMedia({audio:true}, gotStream);
				//blowScroll();
			}
		};
		document.getElementsByTagName("head")[0].appendChild(script);
	} else {
		getUserMedia({audio:true}, gotStream);
	}
	
	
	//Initializing an Audio Context
	  window.AudioContext = window.AudioContext || 
	  window.webkitAudioContext || 
	  window.mozAudioContext || 
	  window.oAudioContext || 
	  window.msAudioContext;

	var audioContext = new AudioContext();

	function error() {
		alert('Stream generation failed.');
	}

	function getUserMedia(dictionary, callback) {
		try {
			navigator.getUserMedia = 
			navigator.getUserMedia ||
        	navigator.webkitGetUserMedia ||
        	navigator.mozGetUserMedia;
			navigator.getUserMedia(dictionary, callback, error);
    } catch (e) {
        alert('getUserMedia threw exception :' + e);
		}
	}

	function gotStream(stream) {
		// Create an AudioNode from the stream.
		var mediaStreamSource = audioContext.createMediaStreamSource(stream);

		// Connect it to the destination.
		
		blowScroll();
	}
   	
	function blowScroll(){
			
			var y = $(window).scrollTop();
			y = y+1200;
			jQuery('html,body').animate({scrollTop:y});
	}
	


	
})();



