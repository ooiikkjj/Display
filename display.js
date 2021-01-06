let display;
let slides;
let slideIndex = 0;

// initialization function
function displayInit(n = 0) {
	document.onkeydown = displayGetKeyPress;

	slides = document.getElementsByClassName("slide");
	display = document.getElementById("display");
	displayChangeSlide(n);
	displayGetSettings();
}

// change slide on keypress
function displayGetKeyPress(e) {
	e = e || window.event;

	if 			(e.keyCode == 37) {displayChangeSlide(-1);} 	// left arrow
	else if (e.keyCode == 39) {displayChangeSlide(1);} 	  // right arrow
}

// change slide
function displayChangeSlide(n) {
	// go to next slide
	if (n > 0) {
		slides[slideIndex].removeAttribute("id");
		
		// check for out of range slide index
		if ((slideIndex + n) < slides.length) {slideIndex += n;}
		else {slideIndex = slides.length - 1;}
		
		slides[slideIndex].id = "active";
	}
	// go to previous slide
	else if (n < 0) {
		slides[slideIndex].removeAttribute("id");
		
		// check for out of range slide index
		if ((slideIndex + n) >= 0) {slideIndex += n;}
		else {slideIndex = 0;}
		
		// change active index
		slides[slideIndex].id = "active";
	}
}

// get user settings from html document
function displayGetSettings() {
	for (let i = 0; i < slides.length; i++) {
		let settings = slides[i].getElementsByClassName("settings");

		// remove tabs, split settings and call function to apply them
		if (settings.length > 0) {
			let content = settings[0].innerText.replace(/\t+/gm, "");
			let lines = content.split("\n");

			for (let j = 0; j < lines.length; j++) {
				let line = lines[j].split(":");

				if (line.length >= 2) {
					displayChangeSettings(i, line, line[0], line[1], line[2]);
				}
			}
		}
	}
}

// add styling if any
function displayChangeSettings(index, content) {
	let slide = slides[index];
	if (content.length == 2) {
		let key = content[0];
		let val = content[1];

		slide.style[key] = val;
	}
	else if (content.length > 2) {
		let key = content[0];
		let tag = content[1];
		let val = content[2];

		let elements = slide.getElementsByTagName(tag);
		// apply styling
		for (let i = 0; i < elements.length; i++) {
			elements[i].style[key] = val;
		}
	}
}
