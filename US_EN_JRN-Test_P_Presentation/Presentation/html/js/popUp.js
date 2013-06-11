// JavaScript Document

/*blocker code*/
function showBlocker(){
	document.querySelector('#blocker').style.visibility = 'visible';
}

function hideBlocker(){
	document.querySelector('#blocker').style.visibility = 'hidden';
}

/*utilites code*/
function showReferences(){
	var references = document.querySelector('#references');
	references.style.visibility = 'visible';
	document.querySelector('#referencesNav').style.color = '#005298';
	references.onclick = function() {
		hideReferences();
		hideBlocker();
	};
	hideFootnotes();
	showBlocker();
	
}

function showFootnotes(){
	var footnotes = document.querySelector('#footnotes');
	footnotes.style.visibility = 'visible';
	document.querySelector('#footnotesNav').style.color = '#005298';
	footnotes.onclick = function() {
		hideFootnotes();
		hideBlocker();
	};
//	hideReferences();
	showBlocker();
}

function hideReferences(){
	document.querySelector('#references').style.visibility = 'hidden';
	document.querySelector('#referencesNav').style.color = '#fa9007';
}

function hideFootnotes(){
	document.querySelector('#footnotes').style.visibility = 'hidden';
	document.querySelector('#footnotesNav').style.color = '#fa9007';
	Tracking.trackEvent('Presentation Savings','close_footnotes');
}


/*isi code*/
function showIsiPartB(){
	document.querySelector('#isiPartA').style.webkitTransform = 'translate3d(0,-768px,0)';
	document.querySelector('#isiPartB').style.webkitTransform = 'translate3d(0,-762px,0)';
}

function showIsiPartC(){
	document.querySelector('#isiPartC').style.webkitTransform = 'translate3d(0,-762px,0)';
}

function showIsiPartA(){
	document.querySelector('#isiPartA').style.webkitTransform = 'translate3d(0,0,0)';
	document.querySelector('#isiPartB').style.webkitTransform = 'translate3d(0,0,0)';
	document.querySelector('#isiPartC').style.webkitTransform = 'translate3d(0,0,0)';
}
