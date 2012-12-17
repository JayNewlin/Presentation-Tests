// JavaScript library for more easily accessing the native
// framework commands from html content pages
var SystemBridge =
{
	//-----------------------------
	// Supplemental Media Viewers
	//-----------------------------

	// launch the specified video in a fullscreen native movie controller
	launchFullscreenVideo : function(videoPath, trackingMessage)
	{
		var cmdStr = "system://launchFullscreenVideo:" + this.relativeToAbsolutePath(videoPath);
		if (trackingMessage)
			cmdStr += "?trackingMessage=" + encodeURIComponent(trackingMessage);
		this.executeSystemCommand(cmdStr);
	},

	// load a PDF into a PDF Viewer (with the specified title)
	launchPDFViewer : function(localPath, title, trackingMessage)
	{
		var cmdStr = "system://pdfViewer:" + this.relativeToAbsolutePath(localPath) + "?title=" + encodeURIComponent(title);
		if (trackingMessage)
			cmdStr += "&trackingMessage=" + encodeURIComponent(trackingMessage);
		this.executeSystemCommand(cmdStr);
	},

	// load a PDF into a PDF Viewer (with the specified title) + jump directly to a page
	launchPDFViewerAtPage : function(localPath, title, pageNum, trackingMessage)
	{
		var cmdStr = "system://pdfViewer:" + this.relativeToAbsolutePath(localPath) + "?title=" + encodeURIComponent(title) + "&page=" + pageNum;
		if (trackingMessage)
			cmdStr += "&trackingMessage=" + encodeURIComponent(trackingMessage);
		this.executeSystemCommand(cmdStr);
	},

	// load a URL into a fullscreen web Viewer (with the specified title)
	launchFullscreenWebViewer : function(localPath, title, trackingMessage)
	{
		var urlObj = {	"url" : this.relativeToAbsolutePath(localPath),
						"title" : encodeURIComponent(title)	};
		if (trackingMessage)
			urlObj.trackingMessage = trackingMessage;
        var cmdStr = "system://fullscreenWebViewer:" + encodeURIComponent(JSON.stringify(urlObj));
		this.executeSystemCommand(cmdStr);
	},

	// launch a URL via the external iOS (not within the app)
	launchExternalURL : function(url, trackingMessage)
	{
		var urlObj = { "url" : url };
		if (trackingMessage)
			urlObj.trackingMessage = trackingMessage;
        var cmdStr = "system://externalURL:" + encodeURIComponent(JSON.stringify(urlObj));
		this.executeSystemCommand(cmdStr);
	},

	// launch a fullscreen popUp view with specified HTML content
	launchPopUp : function(localPath, trackingMessage)
	{
		var cmdStr = "system://launchPopUp:" + this.relativeToAbsolutePath(localPath);
		if (trackingMessage)
			cmdStr += "?trackingMessage=" + encodeURIComponent(trackingMessage);
		this.executeSystemCommand(cmdStr);
	},
		
	// close a fullscreen popUp
	closeTopPopUp : function()
	{
		var cmdStr = "system://closeTopPopUp";
		this.executeSystemCommand(cmdStr);
	},

	//-----------------------------
	// Data Storage / Access
	//-----------------------------

	// store a key value pair for later use during the same session
	setSessionValue : function(key, value)
	{
		var cmdStr = "system://setSessionValue?key=" + encodeURIComponent(key) + "&value=" + encodeURIComponent(value);
		this.executeSystemCommand(cmdStr);
	},

	// request a previously stored key value pair
	// (callback is executed when return value is available)
	requestSessionValue : function(key, callback)
	{
		var cmdStr = "system://requestSessionValue?key=" + encodeURIComponent(key) + "&callback=" + callback;
		this.executeSystemCommand(cmdStr);
	},

	//-----------------------------
	// Navigation
	//-----------------------------

	// load a new section
	goToSlide : function(slide)
	{
		var cmdStr = "mainView://section:" + encodeURIComponent(slide);
		this.executeSystemCommand(cmdStr);
	},

	goToAlternateCall : function(call, slide)
	{
		var cmdStr = "system://alternateCall?call=" + encodeURIComponent(call);
		if (slide)
			cmdStr += "&section=" + encodeURIComponent(slide);
		this.executeSystemCommand(cmdStr);
	},

	// navigate to the left page with sliding animation
	slideToLeftPage : function()
	{
		this.executeSystemCommand("mainView://slideToLeftPage");
	},

	// navigate to the right page with sliding animation
	slideToRightPage : function()
	{
		this.executeSystemCommand("mainView://slideToRightPage");
	},

	// navigate to the top page with sliding animation
	slideToAbovePage : function()
	{
		this.executeSystemCommand("mainView://slideToAbovePage");
	},

	// navigate to the bottom page with sliding animation
	slideToBelowPage : function()
	{
		this.executeSystemCommand("mainView://slideToBelowPage");
	},

	// enable Page Swiping
	enableSwipeToPage : function()
	{
		var cmdStr = "mainView://enableSwipeToPage";
		this.executeSystemCommand(cmdStr);
	},

	// disable Page Swiping
	disableSwipeToPage : function()
	{
		var cmdStr = "mainView://disableSwipeToPage";
		this.executeSystemCommand(cmdStr);
	},

	// navigate to the top page with sliding animation
	pageLoadComplete : function()
    {
		this.executeSystemCommand("mainView://pageLoadComplete");
	},

	//-----------------------------
	// Tracking
	//-----------------------------

    //track events from the presentation view
    trackEvent : function(title, message, data)
    {
		var cmdStr = "system://customTrackingEvent?title=" + encodeURIComponent(title) + "&message=" + encodeURIComponent(message) + "&data=" + encodeURIComponent(data);
		this.executeSystemCommand(cmdStr);
    },

	// submit a survey response
	submitSurveyResponse : function(survey, question, answer)
	{
		var cmdStr = "system://surveyResponse?survey=" + encodeURIComponent(survey) + "&question=" + encodeURIComponent(question) + "&answer=" + encodeURIComponent(answer);
		this.executeSystemCommand(cmdStr);
	},

	//-----------------------------
	// Navigation Layer
	//-----------------------------

    setViewFrame : function(viewName, xPos, yPos, width, height, animated)
	{
		var cmdStr = "menuView://setViewFrame?view=" + viewName + "&xPos=" + xPos + "&yPos=" + yPos + "&width=" + width + "&height=" + height + "&animated=" + animated;
		this.executeSystemCommand(cmdStr);
	},
    
    setViewProperties : function(properties)
    {
        var cmdStr = "menuView://setViewProperties?properties=" + encodeURIComponent(JSON.stringify(properties));
        this.executeSystemCommand(cmdStr);
    },
    
	//-----------------------------
	// Utility
	//-----------------------------

	// execute JavaScript code in the active content view
	// (can be called from either menuView or contentView)
	executeJavaScriptInMainView : function(jsCode)
	{
		var cmdStr = "mainView://javascript:" + jsCode;
		this.executeSystemCommand(cmdStr);
	},

	// request info about the currently active page
	requestCurrentSlideInfo : function(callback)
	{
		var cmdStr = "system://requestCurrentSlideInfo:" + callback;
		this.executeSystemCommand(cmdStr);
	},

	// display an alert box
	alert : function(title, message, button)
	{
		var cmdStr = "system://alert?title=" + encodeURIComponent(title) + "&message=" + encodeURIComponent(message) + "&button=" + encodeURIComponent(button);
		this.executeSystemCommand(cmdStr);
	},

	// convert relative path to absolute
	relativeToAbsolutePath : function(relPath)
	{
		var baseUri = new URI(location.href);
		var relUri = new URI(relPath);
		var relUriFull = relUri.resolve(baseUri);
		return relUriFull.toString();
	},

	// pass a command to the native system through a new iFrame
	executeSystemCommand : function(cmdStr)
	{
		var tmpIFrame = document.createElement("IFRAME");
		tmpIFrame.frameBorder = 0;
		tmpIFrame.width = 0;
		tmpIFrame.height = 0;
		tmpIFrame.src = cmdStr;
		document.body.appendChild(tmpIFrame);
		tmpIFrame.parentNode.removeChild(tmpIFrame);
		tmpIFrame = null;
	}
};



//----------------------------------------------------------------------------
// An URI datatype.  Based upon examples in RFC3986.
//
// js-uri <http://code.google.com/p/js-uri/>
//
// Dominic Mitchell <dom [at] happygiraffe.net>
//----------------------------------------------------------------------------

// Constructor for the URI object.
// Parse a string into its components.
var URI = function(str)
{
	if (!str)
		str = "";

	// Based on the regex in RFC2396 Appendix B.
	var parser = /^(?:([^:\/?\#]+):)?(?:\/\/([^\/?\#]*))?([^?\#]*)(?:\?([^\#]*))?(?:\#(.*))?/;
	var result = str.match(parser);
	this.scheme    = result[1] || null;
	this.authority = result[2] || null;
	this.path      = result[3] || null;
	this.query     = result[4] || null;
	this.fragment  = result[5] || null;
};

URI.prototype.toString = function ()
{
	var result = "";
	
    if (this.scheme) {
		result += this.scheme + ":";
    }
    
	if (this.authority) {
		result += "//" + this.authority;
    }
    
	if (this.path) {
		result += this.path;
    }
    
	if (this.query) {
		result += "?" + this.query;
    }
	
    if (this.fragment) {
		result += "#" + this.fragment;
    }
    
	return result;
};

// Introduce a new scope to define some private helper functions.
(function ()
{
	// RFC3986 §5.2.3 (Merge Paths)
	function merge(base, rel_path)
	{
		var dirname = /^(.*)\//;
 
        if (base.authority && !base.path) {
			return "/" + rel_path;
        }
		
 		return base.path.match(dirname)[0] + rel_path;
	}

	// Match two path segments, where the second is ".." 
	// and the first must not be "..".
	var DoubleDot = /\/((?!\.\.\/)[^\/]*)\/\.\.\//;

	function remove_dot_segments(path)
    {
        if (!path) {
			return "";
        }

		// Remove any single dots
		var newpath = path.replace(/\/\.\//g, '/');

		// Remove any trailing single dots.
		newpath = newpath.replace(/\/\.$/, '/');

		// Remove any double dots and the path previous.  NB: We can't use
		// the "g", modifier because we are changing the string that we're
		// matching over.
        while (newpath.match(DoubleDot)) {
			newpath = newpath.replace(DoubleDot, '/');
        }

		// Remove any trailing double dots.
		newpath = newpath.replace(/\/([^\/]*)\/\.\.$/, '/');

		// If there are any remaining double dot bits, then they're wrong
		// and must be nuked.  Again, we can't use the g modifier.
		while (newpath.match(/\/\.\.\//)) {
			newpath = newpath.replace(/\/\.\.\//, '/');
        }
                                      
		return newpath;
	}

	// RFC3986 §5.2.2. Transform References;
	URI.prototype.resolve = function (base)
	{
		var target = new URI();
		if (this.scheme) {
			target.scheme    = this.scheme;
			target.authority = this.authority;
			target.path      = remove_dot_segments(this.path);
			target.query     = this.query;
		} else {
			if (this.authority) {
				target.authority = this.authority;
				target.path      = remove_dot_segments(this.path);
				target.query     = this.query;
            } else {
				// XXX Original spec says "if defined and empty"…;
				if (!this.path) {
					target.path = base.path;
                    if (this.query) {
						target.query = this.query;
                    } else {
						target.query = base.query;
                    }
                } else {
					if (this.path.charAt(0) === '/') {
						target.path = remove_dot_segments(this.path);
                    } else {
						target.path = merge(base, this.path);
						target.path = remove_dot_segments(target.path);
                    }
					target.query = this.query;
                }
				target.authority = base.authority;
			}
			target.scheme = base.scheme;
		}
		target.fragment = this.fragment;
		return target;
	};

	URI.prototype.getQueryValue = function (variable)
	{
		var vars = this.query.split("&"); 
		for (i = 0; i < vars.length; i++) {
			var pair = vars[i].split("="); 
            if (pair[0] == variable) {
				return pair[1]; 
			}
        }
    };
})();
