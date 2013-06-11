/*******************************
 ***** TrackingData object *****
 *******************************/
 
function TrackingData() {
	this._dataObject = {};
} //end constructor

TrackingData.prototype = {
	get data() { return this._dataObject; }, //data getter
	
	set : function(key, val) {
		if(typeof(key) == "string")
			this._dataObject[key] = val;
	}, //end method add
	
	toString : function() {
		var str = "{"; //start object string
		
		var hasObjects = false;
		for(var i in this._dataObject) {
			hasObjects = true;
			str += '"' + i + '":"' + this._dataObject[i] + '",';
		} //end for
		
		//finish object string
		if(hasObjects)
			str = str.substring(0, str.length - 1); //remove last comma off the end
		str += "}";
		
		return str;
	} //end method toString
}; //end TrackingData object definition

var Tracking = {
    trackEvent: function (page,type,parent,file) {
        if (event) {
            eventSrcID=(event.srcElement)?event.srcElement.id:'undefined';
            title = (event.srcElement)?event.srcElement.title:'';
            eventtype=event.type;
        } else {
            eventSrcID = page;
            title = page;
            eventtype='none';
        }

        
        code = this.getCode(type);                              // Event Code           ex. 000000001
        description = eventSrcID;                               // Content Identifier   ex. subcontent1A
        page = page;                                            // Master Page Reference
        parent = (parent)?parent:'';                            // Parent Content Identifier
        file = (file)?file:'';                                  // Filename
        
        status=eventSrcID+' has received a '+eventtype+' event on page: ' + page + ' item ' + title + ' (' + code + ':' + type + ')';
        
        switch (page)
        {
            case 'Educational Resources':
                switch (type) {
                    default:
                        SystemBridge.logMessage(status);
                    break;
                }
            break;
            default:
               SystemBridge.logMessage('JS TRACKING: page not found'); 
            break;
        }
        
        this.trackIt (code, description, page, parent, file, title);
 
    },
    getCode: function (type) {
        var code = '10000000';
        switch (type)
        {
            case 'change_section':
                code = '10000001';
            break;
            case 'menu_nav_item':
                code = '10000013';
            break;
            case 'change_tab':
                code = '10000014';
            break;
            case 'button':
            case 'change_subcontent':
                code = '10000015';
            break;
            case 'open_footnotes':
                code = '10000021';
            break;
            case 'close_footnotes':
                code = '10000022';
            break;
            case 'open_references':
                code = '10000023';
            break;
            case 'close_references':
                code = '10000024';
            break;
            case 'open_isi':
                code = '10000025';
            break;
            case 'close_isi':
                code = '10000026';
            break;
        }
        
        return code;
    },
    trackIt: function (code, description, page, parent, file, title) {
        var data = new TrackingData();
        data.set("code", code);
        data.set("description", description);
        data.set("page", page);
        data.set("parent", parent);
        data.set("file", file);
        data.set("title", title);
        SystemBridge.trackEvent(data);
    }
}

