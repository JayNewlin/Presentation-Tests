
// Usage:
//		var control = new VidWithPoster(parentDiv, PosterImage, Video, VideoWidth, VideoHeight, controls?);
//
// example:
//
// HTML:
//		<script type="text/javascript" src="../common/js/vidWithPoster.js"></script>
//		<div id="MOA_vid" class="videoCaseStudy"></div>
// JS:
//		var MOAcontrol = new VidWithPoster("MOA_vid", "images/MOA_poster.png", "video/moa.mp4", 422, 316);
//		var MOAcontrol = new VidWithPoster("MOA_vid", "images/MOA_poster.png", "video/moa.mp4", 422, 316, {controls:true, videoEndAction:'none'});


function VidWithPoster(el, posterFile, videoName, width, height, options)
	{
	this.parentEl = typeof el == 'object' ? el : document.getElementById(el);
	this.videoFile = videoName;

	// Default options
	this.options = {	controls: true,
						videoEndAction: 'reset'	};		// 'reset', 'none', 'loop'

	// User defined options
	if (typeof options == 'object')
		{
		for (i in options)
			this.options[i] = options[i];
		}

	// limit parent element to proper size
	this.parentEl.style.width = width + "px";
	this.parentEl.style.height = height + "px";
	this.parentEl.style.display = "block";
	this.parentEl.style.overflow = "hidden";

	// create the child poster image
	this.poster = document.createElement("img");
	this.poster.src = posterFile;
	this.poster.style.zIndex = "100";
	this.poster.width = width;
	this.poster.height = height;
	this.parentEl.appendChild(this.poster);
	this.poster.addEventListener('touchstart', this, false);
//	this.poster.addEventListener('click', this, false);

	// create the child video control (initially hidden)
	this.video = document.createElement("video");
	this.video.src = "";
	this.video.style.webkitTransform = "translate3d(2048px,0,0)";
	this.video.preload = "none";
	this.video.width = width;
	this.video.height = height;
	this.video.controls = this.options.controls;
	this.parentEl.appendChild(this.video);
	
	//attach event listeners to play and pause for tracking
	var self = this;
	this.video.addEventListener('play', function() { self._track("10000005", "PLAY_VIDEO"); }, false);
	this.video.addEventListener('pause', function() { self._track("10000006", "PAUSE_VIDEO"); }, false);
	}


VidWithPoster.prototype =
	{
	loadState:0,	// 0 = poster visible, no video
					// 1 = poster visible, video load started
					// 2 = no poster, video playing

	/*
	fakeClick : function()
		{
		var theEvent = document.createEvent('MouseEvents');
		theEvent.initEvent('click', true, true);
		this.poster.dispatchEvent(theEvent);
		},
	*/

	playVideo : function()
		{
		// is the video already playing?
		if (this.loadState == 2)
			{
			// in case it was paused
			this.video.play();
			}
		else if (this.loadState == 0)
			{
			// prep and play the real video
			this.video.src = this.videoFile;
			var that = this;
			this.video.addEventListener('canplay', that, false);
			/*
			this.video.addEventListener('loadstart', function(e) { alert("loadstart"); }, false);
			this.video.addEventListener('progress', function(e) { alert("progress"); }, false);
			this.video.addEventListener('suspend', function(e) { alert("suspend"); }, false);
			this.video.addEventListener('abort', function(e) { alert("abort"); }, false);
			this.video.addEventListener('error', function(e) { alert("error"); }, false);
			this.video.addEventListener('emptied', function(e) { alert("emptied"); }, false);
			this.video.addEventListener('stalled', function(e) { alert("stalled"); }, false);
			this.video.addEventListener('play', function(e) { alert("play"); }, false);
			this.video.addEventListener('pause', function(e) { alert("pause"); }, false);
			this.video.addEventListener('loadedmetadata', function(e) { alert("loadedmetadata"); }, false);
			this.video.addEventListener('loadeddata', function(e) { alert("loadeddata"); }, false);
			this.video.addEventListener('waiting', function(e) { alert("waiting"); }, false);
			this.video.addEventListener('playing', function(e) { alert("playing"); }, false);
			this.video.addEventListener('canplay', function(e) { alert("canplay"); }, false);
			this.video.addEventListener('canplaythrough', function(e) { alert("canplaythrough"); }, false);
			this.video.addEventListener('seeking', function(e) { alert("seeking"); }, false);
			this.video.addEventListener('seeked', function(e) { alert("seeked"); }, false);
			this.video.addEventListener('timeupdate', function(e) { alert("timeupdate"); }, false);
			this.video.addEventListener('ended', function(e) { alert("ended"); }, false);
			this.video.addEventListener('ratechange', function(e) { alert("ratechange"); }, false);
			this.video.addEventListener('durationchange', function(e) { alert("durationchange"); }, false);
			this.video.addEventListener('volumechange', function(e) { alert("volumechange"); }, false);
			*/
			this.video.load();
			this.loadState = 1;
			}
		},


	restartVideo : function()
		{
		// set the video time back to (near) 0
		if (this.loadState == 2)
			this.video.currentTime = 0.1;
		this.playVideo();
		},


	pauseVideo : function()
		{
		// is the video already playing?
		if (this.loadState == 2)
			this.video.pause();
		},


	resetVideo : function()
		{
		// is the video already playing?
		if (this.loadState == 2)
			{
			var that = this;
			this.video.removeEventListener('ended', that, false);

			this.video.webkitExitFullscreen();
			this.video.style.webkitTransform = "translate3d(2048px,0,0)";
			this.poster.style.display = "block";

			// blank out video
			var curVid = this.video;
			setTimeout(function() { curVid.src = ""; curVid.load(); }, 1);
//			this.video.src = "";
//			this.video.load();
		
			//track resetting of video (serves as tracking for stop as well)
			if(SystemBridge)
				this._track("10000007", "STOP_VIDEO");
			}
		else if (this.loadState == 1)
			{
			// prevent the video from finishing its loading
			var that = this;
			this.video.removeEventListener('canplay', that, false);
			this.video.style.webkitTransform = "translate3d(2048px,0,0)";
			this.poster.style.display = "block";

			// blank out video
			var curVid = this.video;
			setTimeout(function() { curVid.src = ""; curVid.load(); }, 1);
//			setTimeout(function() { this.video.src = ""; this.video.load(); }, 1);
//			this.video.src = "";
//			this.video.load();
			}
		this.loadState = 0;
		},


	onVidCanPlay : function(e)
		{
		var that = this;
		this.video.removeEventListener('canplay', that, false);

		this.video.play();
		this.poster.style.display = "none";
		this.video.style.webkitTransform = "translate3d(0,0,0)";

		this.video.addEventListener('ended', that, false);
		this.loadState = 2;
		},


	onVidEnded : function(e)
		{
		if (this.options.videoEndAction == 'reset')
			this.resetVideo();
		else if (this.options.videoEndAction == 'loop')
			this.restartVideo();
		},


	// these touch events only apply to the poster image
	handleEvent: function(e)
		{
		var that = this;
		switch(e.type)
			{
			case 'touchstart':	that.onTouchStart(e); break;
			case 'touchmove':	that.onTouchMove(e); break;
			case 'touchend':	that.onTouchEnd(e); break;
			case 'canplay':		that.onVidCanPlay(e); break;
			case 'ended':		that.onVidEnded(e); break;
			}
		},

	onTouchStart: function(e)
		{
		this.moved = false;
		e.target.addEventListener('touchmove', this, false);
		e.target.addEventListener('touchend', this, false);
		},

	onTouchMove: function(e)
		{
		this.moved = true;
		},

	onTouchEnd: function(e)
		{
		e.target.removeEventListener('touchmove', this, false);
		e.target.removeEventListener('touchend', this, false);

		if ((!this.moved) && (e.target == this.poster))
//			{
			this.playVideo();
//			var theEvent = document.createEvent('MouseEvents');
//			theEvent.initEvent('click', true, true);
//			e.target.dispatchEvent(theEvent);
//			}
		},
		
	_track: function(code, description)
		{
		if(SystemBridge)
			{
			//strip the video filename from the path
			var pathArr = this.video.src.split("/");
			var fn = pathArr[pathArr.length - 1];
			
			//track video playback event
			var data = new TrackingData();
			data.set("code", code);
			data.set("description", description);
			data.set("video", fn);
			SystemBridge.trackEvent(data);
			}
		}

	/*,
	onClick: function(e)
		{
		if (e.target == this.poster)
			this.playVideo();
		}*/

	};

