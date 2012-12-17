const MAX_DRAG_Y = 231; //#drag_bar_container.bar_container height style - drag bar image height

var bgTwelveWeeks = null;
var bgTwentyFourWeeks = null;
var twentyFourWeeksSection = null;
var percentBar = null;
var dragBarPercent = null;
var draggedPercent = 0;
var init = false;

document.addEventListener('DOMContentLoaded', initialize);

function initialize()
{
	var barOptions = { duration: "1s", timingFunction: "ease-out" };
    
	bgTwelveWeeks = new BarGraph("twelve_weeks_bars", barOptions);
	bgTwelveWeeks.add("twelve_weeks_bar1");
	bgTwelveWeeks.add("twelve_weeks_bar2");
    
	bgTwentyFourWeeks = new BarGraph("twenty_four_weeks_bars", barOptions);
	bgTwentyFourWeeks.add("twenty_four_weeks_bar1");
	bgTwentyFourWeeks.add("twenty_four_weeks_bar2");
	twentyFourWeeksSection = bgTwentyFourWeeks.element;
	twentyFourWeeksSection.style.display = "none";
    
	percentBar = new webkit_draggable("drag_handle", { horizontal: false, onDrag: onPercentBarDrag, onEnd: onDragEnd });
	percentBar.element().style.top = MAX_DRAG_Y + "px"; //place the drag bar at the bottom of it's container
	dragBarPercent = document.getElementById("drag_percent");
    
    init = true;
} //end function window.onload

function gotFocus() {	
    if(init){        
        bgTwelveWeeks.run([50,40]);
        
        bgTwelveWeeks.item(0).element.addEventListener('webkitTransitionEnd', function() {
            this.removeEventListener('webkitTransitionEnd', arguments.callee);
            setVisibility(document.getElementById("twelve_weeks_bar1_text"), "visible");
            setVisibility(document.getElementById("twelve_weeks_bar2_text"), "visible");
        }, false);
    }
} //end function window.gotFocus

function lostFocus() {
	bgTwelveWeeks.run([10,10]);
	setVisibility(document.getElementById("twelve_weeks_bar1_text"), "hidden");
	setVisibility(document.getElementById("twelve_weeks_bar2_text"), "hidden");
	setVisibility(document.querySelector(".amaze_line"), "hidden");
	setVisibility(document.getElementById("twenty_four_weeks_bar1_text"), "hidden");
	setVisibility(document.getElementById("twenty_four_weeks_bar2_text"), "hidden");
	
	bgTwentyFourWeeks.run([0,0]);
	setVisibility(document.querySelector("#three_d_base .left"), "hidden");
	setVisibility(document.querySelector("#three_d_base .right"), "hidden");
	setVisibility(document.getElementById("empty_bars"), "visible");
	setVisibility(twentyFourWeeksSection, "hidden");
	
	twentyFourWeeksSection.style.display = "none";
	
	var dragBarSection = document.getElementById("drag_bar_container");
	setVisibility(dragBarSection, "visible");
	dragBarSection.style.display = "block";
	dragBarPercent.style.backgroundImage = "-webkit-gradient(linear, left top, left bottom, from(rgba(91, 166, 172, 0.8)), color-stop(0.2, rgba(255, 255, 255, 0)), to(rgba(255, 255, 255, 0)))";
	
	percentBar.element().style.top = MAX_DRAG_Y + "px"; //place the drag bar at the bottom of it's container
	dragBarPercent.innerHTML = "";
} //end function window.lostFocus


function resetBar() {
	setVisibility(document.querySelector(".amaze_line"), "hidden");
	setVisibility(document.getElementById("twenty_four_weeks_bar1_text"), "hidden");
	setVisibility(document.getElementById("twenty_four_weeks_bar2_text"), "hidden");
	
	bgTwentyFourWeeks.run([0,0]);
	setVisibility(document.querySelector("#three_d_base .left"), "hidden");
	setVisibility(document.querySelector("#three_d_base .right"), "hidden");
	setVisibility(document.getElementById("empty_bars"), "visible");
	setVisibility(twentyFourWeeksSection, "hidden");
	
	twentyFourWeeksSection.style.display = "none";
	
	var dragBarSection = document.getElementById("drag_bar_container");
	setVisibility(dragBarSection, "visible");
	dragBarSection.style.display = "block";
	dragBarPercent.style.backgroundImage = "-webkit-gradient(linear, left top, left bottom, from(rgba(91, 166, 172, 0.8)), color-stop(0.2, rgba(255, 255, 255, 0)), to(rgba(255, 255, 255, 0)))";
	
	percentBar.element().style.top = MAX_DRAG_Y + "px"; //place the drag bar at the bottom of it's container
	dragBarPercent.innerHTML = "";
}

function onPercentBarDrag() {
	var barPosY = percentBar.getPosition().y;
	if(barPosY <= 0) barPosY = 0;
	else if(barPosY >= MAX_DRAG_Y) barPosY = MAX_DRAG_Y;
	percentBar.element().style.top = barPosY + "px";
	draggedPercent = (100 - Math.round((barPosY / MAX_DRAG_Y) * 100));
	dragBarPercent.innerHTML = draggedPercent + "%";
    
	//change the background gradient for the drag range along with the dragging
	var stopPoint = draggedPercent + 20;
	if(stopPoint >= 100) stopPoint = 100;
	stopPoint /= 100;
	dragBarPercent.style.backgroundImage = "-webkit-gradient(linear, left top, left bottom, from(rgba(91, 166, 172, 0.8)), color-stop(" + stopPoint + ", rgba(255, 255, 255, 0)), to(rgba(255, 255, 255, 0)))";
} //end function onPercentBarDrag

function onDragEnd() {
	var dragBarSection = document.getElementById("drag_bar_container");
    var barPosY = percentBar.getPosition().y;
	if(barPosY <= 0) barPosY = 0;
	else if(barPosY >= MAX_DRAG_Y) barPosY = MAX_DRAG_Y;
	percentBar.element().style.top = barPosY + "px";
	draggedPercent = (100 - Math.round((barPosY / MAX_DRAG_Y) * 100));
    try
    {
        //Run some code here
        if (dragBarPercent.innerHTML != "") {
            var data = new TrackingData();
            data.set("code", "20000000");
            data.set("description", dragBarPercent.innerHTML);
            data.set("page", "Blue Survey IDO");
            data.set("title", "Blue Survey IDO");
            data.set("key", "USER_INTERACTION");
            SystemBridge.trackEvent(data);
        }
    }
    catch(err)
    {
        //Handle errors here
        alert(err);
    }
    
    
	setVisibility(dragBarSection, "hidden");
    
	dragBarSection.addEventListener('webkitTransitionEnd', function() {
		this.removeEventListener('webkitTransitionEnd', arguments.callee);
		dragBarSection.style.display = "none";
		twentyFourWeeksSection.style.display = "block";
		setTimeout(function() {
			setVisibility(document.getElementById("empty_bars"), "hidden");
			setVisibility(twentyFourWeeksSection, "visible");
			setVisibility(document.querySelector("#twenty_four_weeks .graph_base .left"), "visible");
			setVisibility(document.querySelector("#twenty_four_weeks .graph_base .right"), "visible");
			bgTwentyFourWeeks.run([58,44]);
			bgTwentyFourWeeks.item(0).element.addEventListener('webkitTransitionEnd', function() {
				this.removeEventListener('webkitTransitionEnd', arguments.callee);
				setVisibility(document.querySelector(".amaze_line"), "visible");
				setVisibility(document.getElementById("twenty_four_weeks_bar1_text"), "visible");
				setVisibility(document.getElementById("twenty_four_weeks_bar2_text"), "visible");
			}, false);
		}, 0);
	}, false);
} //end function onDragEnd

function setVisibility(elem, visibility) {
	elem.className = elem.className.replace(/\s*?hidden\s*?|\s*?visible\s*?/g, "") + " " + visibility + " ";
} //end function setVisibility