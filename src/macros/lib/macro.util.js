/**
 *	This file contains some helper functions to easily syntax objects.
 */

// Exports
module.exports = {
	createGetter: _createGetter,
	createSetter: _createSetter,
	createClassTemplateName: _createClassTemplateName
};

//
// Public
//

function _createGetter(varName) {
	return 'get' + _capitalizeFirstLetter(varName);
}

function _createSetter(varName) {
	return 'set' + _capitalizeFirstLetter(varName);
}

function _createClassTemplateName(className) {
	return '__' + className + 'Template';
}

//
// Private
//

// src: http://stackoverflow.com/questions/1026069/capitalize-the-first-letter-of-string-in-javascript
function _capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
