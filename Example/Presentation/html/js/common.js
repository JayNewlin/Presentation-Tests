
// respond to NavLayer commands

function NavLayerButtonPressed(tag)
	{
	//alert(tag);
	switch(tag)
		{
		case 1:	// ISI
				SystemBridge.launchPopUp("ISI/index.html");
				break;
		case 2: // PI
				SystemBridge.launchPDFViewer("PI/CrestorPI.pdf", "Prescribing Information");
				break;
		}
	}