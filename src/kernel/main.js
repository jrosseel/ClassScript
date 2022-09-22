/**
 * This file packs the kernel folder into some global libraries and 
 * 	other stuff that helps classes.
 * Even though this might not be the best approach, it does allow for more seperated code
 * 	instead of cramming everything into one file.
 */
// src: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/arguments
GLOBAL.kernel = {};

// Register all the global objects.
require('./util');
require('./root');

module.exports = {};