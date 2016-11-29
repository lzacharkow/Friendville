// This file uses the settings in config.js to randomly 
// select the state and apply it to the DOM.

// To add new properties, first define them in config.js,
// then use this file to control the way your properties 
// are used.

$(document).ready(function() {
	
	// --- SET STATE --- //

	var currentState = {
		bgColor: chooseBgColor(config.bgColors),
		face: chooseFace(config.faces),
		customProps: chooseCustomProps(config.customProps)
	};

	currentState.name = choosePrefix(config.prefixes) + ' ' + currentState.face;


	// --- APPLY STATE TO DOM --- //

	// Set the bg color
	$('body').css('background-color', currentState.bgColor);

	// Populate the name
	$('.name').html(currentState.name);

	// Add faces
	if (config.faces) {
		$('.friend__face').append(createImg(config.faces[currentState.face]));		
	}

	// Add custom properties
	currentState.customProps.forEach(function(prop) {
		$('.friend__props').append(createImg(prop));
	});

});


// --- SETTER FUNCTIONS --- //

function chooseBgColor(colors) {
	var defaultBgColor = '#e1e1e1';

	if (!colors || colors.length === 0) {
		console.error('There aren\'t any bgColors in your config object.');
		return defaultBgColor;
	}
	
	return choose(colors);
}

function chooseFace(faces) {
	var defaultFace = 'Noname';

	if (!faces || Object.keys(faces).length === 0) {
		console.error('There aren\'t any faces in your config object.');
		return defaultFace;	
	} else if (typeof faces !== 'object') {
		console.error('config.faces should be an object that contains key value with syntax:\n[name]: "path/to/image.png"');
		return defaultFace;
	}

	return choose(Object.keys(faces));
}

function choosePrefix(prefixes) {
	var defaultPrefix = '';

	if (!prefixes || prefixes.length === 0) {
		console.error('There aren\'t any prefixes in your config object.');
		return defaultPrefix;
	}

	return choose(prefixes);
}

function chooseCustomProps(props) {
	var customProps = [];

	for (var key in props) {
		// Add a blank option
		props[key].push('');

		// Choose a custom prop
		customProps.push(choose(props[key]));
	}

	return customProps;
}	


// --- UTILITY FUNCTIONS --- //

function choose(list) {
    return list[ Math.floor(Math.random() * list.length) ];
}

function createImg(path) {
	if (!path) {
		return;
	}

	return '<img src="' + path + '" />';
}
