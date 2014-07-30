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
				initMyBookmarklet();
			}
		};
		document.getElementsByTagName("head")[0].appendChild(script);
	} else {
		initMyBookmarklet();
	}
	//bookmarklet popup
	   $('body').append('<div class="zdravdih-bookmarklet"><div class="inner-book"><div class="inner-section"><p>Microphone page scrolling</p></div><div class="inner-section"><input type="range" id="myRange" value="90" style="float:left	"> <p id="intensity-value">90</p> </div><div class="inner-section"><input type="button" value="Stop" id="last-button"></div></div></div>');
	   	
	   $('.zdravdih-bookmarklet').css({
		'width':'100%',
		'height':'0px',
		'background':'rgba(0,0,0,0.9)',
		'position':'fixed',
		'bottom':'0px',
		'z-index':'9999',
		'display':'hide',
	   });
	   

	   $(function() {
			$('.zdravdih-bookmarklet').animate({ height: '60px' }, 1000);
	    });
	  
	   $('.zdravdih-bookmarklet .inner-book').css({
			'width':'60%',
			'margin':'20px auto',
			'font-weight':'bold',
		});
	   
	   $('.zdravdih-bookmarklet .inner-book .inner-section').css({
			'float':'left',
			'width':'32%',
			
	   });
	    $('.zdravdih-bookmarklet .inner-book .inner-section #last-button').css({
			'float':'right',
			
	   });
	
	//intensity value
	$('#myRange').click(function(){
		x = document.getElementById("myRange").value;
		document.getElementById("intensity-value").innerHTML = x;
	});
    
	//Start stop button
	$('#last-button').toggle(function(){
	   $(this).val("Start");
	   
		},
		function(){
			$(this).val("Stop");
		});
	 
	 
	//scrolling on click
	var direction = 0;
	
	function initMyBookmarklet() {
		(window.myBookmarklet = function() {
				jQuery('html,body').click(function(){
					
					var y = $(window).scrollTop();
					if(direction == 0){
						
						y = y+200;
						jQuery('html,body').animate({scrollTop:y});
					} 
					if(direction == 1){
						
						y = y-200;
						jQuery('html,body').animate({scrollTop:y});
					}
					 
				});
				
				$(window).scroll(function() {
					if($(window).scrollTop() + $(window).height() == $(document).height()) {
					direction = 1;
					}
					
					else if($(window).scrollTop() == 0){
						direction = 0;
					}
				});
				
				
				
		})();
	}

})();



