/*Najprej pogledamo, če ima jQuery knjižnico (doda če je potrebno) --> kličemo funkcijo
getUserMedia() - Prompts the user for permission to use a microphone in v 2 parametru kličemo
gotStream() z audio stream, This is passed to audioContext.createMediaStreamSource to create
 a sourceNode that can access your device's audio input.
 
 --- window.AudioContext --> s tem inicializiramo  AudioContext (An audio context controls
 both the creation of the nodes it contains and the execution of the audio processing, 
 or decoding. You need to create an AudioContext before you do anything else, as everything 
 happens inside a context.)*/

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
	
	    
    var analyserNode;
    var javascriptNode;
    var sampleSize = 1024;  // number of samples to collect before analyzing
                            // decreasing this gives a faster sonogram, increasing it slows it down
    var amplitudeArray;     // array to hold frequency data
    var audioStream;
	var column = 0;
    var canvasWidth  = 800;
    var canvasHeight = 256;
    var ctx;

	function gotStream(stream) {
		 // create the media stream from the audio input source (microphone)
        sourceNode = audioContext.createMediaStreamSource(stream);
        audioStream = stream;

        analyserNode   = audioContext.createAnalyser();
        javascriptNode = audioContext.createScriptProcessor(sampleSize, 1, 1);

        // Create the array for the data values
        amplitudeArray = new Uint8Array(analyserNode.frequencyBinCount);

        // setup the event handler that is triggered every time enough samples have been collected
        // trigger the audio analysis and draw one column in the display based on the results
        javascriptNode.onaudioprocess = function () {

            amplitudeArray = new Uint8Array(analyserNode.frequencyBinCount);
            analyserNode.getByteTimeDomainData(amplitudeArray);

			
			
            // draw one column of the display
            drawTimeDomain()
        }

        // Now connect the nodes together
        // Do not connect source node to destination - to avoid feedback
        sourceNode.connect(analyserNode);
        analyserNode.connect(javascriptNode);
        javascriptNode.connect(audioContext.destination);
		
	}
   	
	 function drawTimeDomain() {
        var minValue = 9999999;
        var maxValue = 0;

        for (var i = 0; i < amplitudeArray.length; i++) {
            var value = amplitudeArray[i] / 256;
			
            if(value > maxValue) {
                maxValue = value;
            } else if(value < minValue) {
                minValue = value;
            }
        }

        var y_lo = canvasHeight - (canvasHeight * minValue) - 1;
        var y_hi = canvasHeight - (canvasHeight * maxValue) - 1;

		if(y_hi < 105)
		{
			var y = $(window).scrollTop();
			y = y+100;
			jQuery('html,body').animate({scrollTop:y});
		}
	}
	


	
})();



