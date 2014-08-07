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
				getUserMedia({audio:true}, goStream);
			}
		};
		document.getElementsByTagName("head")[0].appendChild(script);
	} else {
		getUserMedia({audio:true}, goStream);
	}
	
	
	// Global Variables for Audio
		var audioContext;
		
		var sourceNode;
		var analyserNode;
		var javascriptNode;
		var sampleSize = 1024; // number of samples to collect before analyzing data
		var fftSize = 1024; // must be power of two // **
		var frequencyArray; // array to hold frequency data
		 
		


	// Hacks to deal with different function names in different browsers
		

		
		//Create audioContext
		window.AudioContext = window.AudioContext ||
							window.webkitAudioContext ||
							window.mozAudioContext ||
							window.oAudioContext ||	
							window.msAudioContext;
		
		var audioContext = new AudioContext();
		
		//getUserMedia function --> permission to use a media device (microphone)
		
		function getUserMedia(dictionary, callback){
			try{
				navigator.getUserMedia = navigator.getUserMedia ||
										navigator.webkitGetUserMedia ||
										navigator.mozGetUserMedia;
				
				navigator.getUserMedia(dictionary, callback, error);						
			}
			catch(e){
				alert('getUserMedia threw exception :' + e);
			}
		}
		
		//main function --> create nodes, array for storing data and connect nodes
		function goStream(stream){
		
			// create the media stream from the audio input source (microphone)
			sourceNode = audioContext.createMediaStreamSource(stream);
			audioStream = stream;

			analyserNode   = audioContext.createAnalyser();
			
			analyserNode.smoothingTimeConstant = 0.0; // **
			analyserNode.fftSize = fftSize; // **

			javascriptNode = audioContext.createScriptProcessor(sampleSize, 1, 1);

			
			// setup the event handler that is triggered every time enough samples have been collected
			// trigger the audio analysis and draw one column in the display based on the results
			javascriptNode.onaudioprocess = function () {

				frequencyArray = new Uint8Array(analyserNode.frequencyBinCount);
				analyserNode.getByteFrequencyData(frequencyArray);

				if(frequencyArray[30]>220)
					{
						slidedown();
					}
			}

			// Now connect the nodes together
			// Do not connect source node to destination - to avoid feedback
			sourceNode.connect(analyserNode);
			analyserNode.connect(javascriptNode);
			javascriptNode.connect(audioContext.destination);
			
		}
		
		//Error function
		function error(){
			alert('Stream generation failed');
		}
		
		
		function slidedown(){
				var s = $(window).scrollTop();
				var to;
				
				to = s+250;
				jQuery('html,body').animate({scrollTop:to});
		}

	
})();



