/**********************
 ***** Bar object *****
 **********************/

const __DEFAULT_DURATION = "500ms";

function Bar() {
	this._container = null;
	this._element = null;
	this._percent = 0;
	this._textElem = null;
	this._currentPercent = 0;
	this._delay = 0;

	//retrieve reference to element
	if(typeof(arguments[0]) == "string")
		this._element = document.getElementById(arguments[0]);
	if(!this._element) throw new Error("Invalid element ID specified.");

	//get reference to container element
	this._container = this._element.parentNode;

	//define default options
	this._options = {
		orientation: Bar.ORIENTATION.VERTICAL,
		animateDirection: Bar.DIRECTION.UP,
		duration: __DEFAULT_DURATION,
		timingFunction: "linear",
		percent: 100,
		onStart: null,
		onEnd: null
	};

	//retrieve user specified options
	if(arguments.length > 1 && typeof(arguments[1]) == "object") {
		for(var i in arguments[1])
			this._options[i] = arguments[1][i];
	} //end if

	//check orientation and direction are compatible
	if((this._options.orientation == Bar.ORIENTATION.HORIZONTAL && (this._options.animateDirection == Bar.DIRECTION.UP || this._options.animateDirection == Bar.DIRECTION.DOWN)) ||
		(this._options.orientation == Bar.ORIENTATION.VERTICAL && (this._options.animateDirection == Bar.DIRECTION.LEFT || this._options.animateDirection == Bar.DIRECTION.RIGHT)))
		throw new Error("Invalid orientation and animate direction specified.");

	//validate percentage
	if(isNaN(this._options.percent)) throw new Error("Invalid percentage specified.");
	if(this._options.percent < 0) this._options.percent = 0;
	else if(this._options.percent > 100) this._options.percent = 100;

	//retrieve reference to text element
	if(typeof(arguments[2]) == "string")
		this._textElem = document.getElementById(arguments[2]);

	//set necessary styles
	var elementStyles = document.defaultView.getComputedStyle(this._element); //get current styles

	var webkitTransitionProperty = elementStyles.getPropertyValue("-webkit-transition-property");
	if(webkitTransitionProperty.indexOf("-webkit-transform") < 0) {
		webkitTransitionProperty += ", -webkit-transform"; //add -webkit-transform to current transition property value
		this._element.style.webkitTransitionProperty = webkitTransitionProperty;

		var idx = webkitTransitionProperty.split(",").length - 1; //'-webkit-transform' was added to the end of the list

		var durArr = elementStyles.getPropertyValue("-webkit-transition-duration").split(",");
		durArr[idx] = this._options.duration;
		this._element.style.webkitTransitionDuration = durArr.join(",");

		var timingArr = elementStyles.getPropertyValue("-webkit-transition-timing-function").split(", c");
		timingArr[idx] = this._options.timingFunction;
		for(var i = 1; i < timingArr.length; ++i) { //we have to add the "c" back into any "cubic-bezier" declaration because the .split(", c") call cuts it out
			if(timingArr[i].indexOf("ubic") == 0)
				timingArr[i] = "c" + timingArr[i];
		} //end for
		this._element.style.webkitTransitionTimingFunction = timingArr.join(",");
	} //end if

	this._element.style.position = "relative";
	this._container.style.overflow = "hidden";
	this._percent = this._options.percent;

	//set the maximum length of the bar and it's starting position
	if(this._options.orientation == Bar.ORIENTATION.VERTICAL) {
		this._element.style.height = this._container.offsetHeight + "px";
		this._element.style.top = this._options.animateDirection == Bar.DIRECTION.UP ? this._container.offsetHeight + "px" : -this._container.offsetHeight + "px";
		this._element.style.float = "left";
	} //end if
	else {
		this._element.style.width = this._container.offsetWidth + "px";
		this._element.style.left = this._options.animateDirection == Bar.DIRECTION.RIGHT ? -this._container.offsetWidth + "px" : this._container.offsetWidth + "px";
	} //end else
} //end Bar constructor

Bar.prototype = {
	/*****************************
	 ***** public properties *****
	 *****************************/

	get element() { return this._element; }, //element getter
	get percent() { return this._percent; }, //percent getter
	set percent(val) {
		if(!isNaN(val)) {
			var newVal = val;
			if(newVal < 0) newVal = 0;
			else if(newVal > 100) newVal = 100;
			this._percent = newVal;
		} //end if
	}, //percent setter
	
	/**************************
	 ***** public methods *****
	 **************************/

	run : function() {
		if(typeof this._options.onStart == "function")
			this._options.onStart();

		if(this._options.orientation == Bar.ORIENTATION.VERTICAL) {
			//determine how far we have to go
			var distance = this._stripUnits(this._element.style.height) * (this._percent * .01);
			if(this._options.animateDirection == Bar.DIRECTION.UP)
				distance = "-" + distance;
			distance += "px";

			//apply the transform
			this._element.style.webkitTransform = "translate3d(0," + distance + ",0)";
		} //end if
		else {
			//determine how far we have to go
			var distance = this._stripUnits(this._element.style.width) * (this._percent * .01);
			if(this._options.animateDirection == Bar.DIRECTION.LEFT)
				distance = "-" + distance;
			distance += "px";

			//apply the transform
			this._element.style.webkitTransform = "translate3d(" + distance + ",0,0)";
		} //end else

		if(this._options.onEnd == "function") {
			var self = this;
			this._element.addEventListener('webkitTransitionEnd', function() {
				this.removeEventListener('webkitTransitionEnd', arguments.callee);
				self._options.onEnd();
			}, false);
		} //end if

		//start updating the text
		this._delay = this._calculateDelay();
		if(this._delay > 0) {
			var self = this;
			setTimeout(function() { self._updateText(self); }, this._delay);
		} //end if
	}, //end method run

	/***************************
	 ***** private methods *****
	 ***************************/

	_updateText : function(barElem) {
		if(barElem._currentPercent != barElem._percent) {
			if(this._percent > this._currentPercent)
				++barElem._currentPercent;
			else --barElem._currentPercent;
			barElem._textElem.innerHTML = barElem._currentPercent;
			var self = barElem;
			setTimeout(function() { self._updateText(self) }, self._delay);
		} //end if
	}, //end method _updateText

	_calculateDelay : function() {
		if(this._textElem && (this._options.duration.indexOf("ms") > 0 || this._options.duration.indexOf("s") > 0)) {
			//get duration as number
			var duration = this._stripUnits(this._options.duration);
			if(isNaN(duration)) duration = this._stripUnits(__DEFAULT_DURATION);

			//convert to milliseconds if necessary
			if(this._options.duration.indexOf("ms") < 0 && this._options.duration.indexOf("s") > 0)
				duration *= 1000;

			//calculate interval
			var distance = Math.abs(this._percent - this._currentPercent);
			return distance > 0 ? duration / distance : duration;
		} //end if

		return 0;
	}, //end method calculateDelay

	_stripUnits : function(val) {
		return val.replace(/px$|ms$|s$/g, "");
	} //end method _stripUnits
}; //end Bar object definition

Bar.ORIENTATION = { VERTICAL : 1, HORIZONTAL : 2 };
Bar.DIRECTION = { UP : 1, DOWN : 2, LEFT : 3, RIGHT : 4 };


/***************************
 ***** BarGraph object *****
 ***************************/

function BarGraph() {
	this._element = null;
	this._bars = [];

	//retrieve reference to element
	if(typeof(arguments[0]) == "string")
		this._element = document.getElementById(arguments[0]);
	if(!this._element) throw new Error("Invalid element ID specified.");

	//define default options
	this._options = {
		orientation: Bar.ORIENTATION.VERTICAL,
		animateDirection: Bar.DIRECTION.UP,
		duration: __DEFAULT_DURATION,
		timingFunction: "linear",
		percent: 100,
		onStart: null,
		onEnd: null
	};

	//retrieve user specified options
	if(arguments.length > 1 && typeof(arguments[1]) == "object") {
		for(var i in arguments[1])
			this._options[i] = arguments[1][i];
	} //end if

	//check orientation and direction are compatible
	if((this._options.orientation == Bar.ORIENTATION.HORIZONTAL && (this._options.animateDirection == Bar.DIRECTION.UP || this._options.animateDirection == Bar.DIRECTION.DOWN)) ||
		(this._options.orientation == Bar.ORIENTATION.VERTICAL && (this._options.animateDirection == Bar.DIRECTION.LEFT || this._options.animateDirection == Bar.DIRECTION.RIGHT)))
		throw new Error("Invalid orientation and animate direction specified.");

	//validate percentage
	if(isNaN(this._options.percent)) throw new Error("Invalid percentage specified.");
	if(this._options.percent < 0) this._options.percent = 0;
	else if(this._options.percent > 100) this._options.percent = 100;
} //end BarGraph constructor

BarGraph.prototype = {
	/*****************************
	 ***** public properties *****
	 *****************************/

	get element() { return this._element; }, //element getter
	get items() { return this._bars; }, //Bar array getter
	
	/**************************
	 ***** public methods *****
	 **************************/

	add : function() {
		if(typeof(arguments[0]) == "string") {
			if(!arguments[1]) //if no text element ID was specified
				this._bars.push(new Bar(arguments[0], this._options));
			if(arguments[1] && typeof(arguments[1]) == "string") //text element ID was specified
				this._bars.push(new Bar(arguments[0], this._options, arguments[1]));
		} //end if
		else if(arguments[0] instanceof Bar)
			this._bars.push(arguments[0]);
	}, //end method add

	item : function(idx) {
		if(this._bars[idx]) return this._bars[idx];
		return null;
	}, //end method item

	run : function() {
		//gather new percents if any exist
		var newPercents = arguments[0];
		var setPercent = newPercents instanceof Array && newPercents.length == this._bars.length;

		for(var i in this._bars) {
			if(setPercent) this._bars[i].percent = arguments[0][i];
			this._bars[i].run();
		} //end foreach
	} //end method run
}; //end BarGraph object definition