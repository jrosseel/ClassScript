GLOBAL.kernel.util = {};

GLOBAL.kernel.util.argsToArray = function(argsObject) {
	return Array.prototype.slice.call(argsObject);
};

// Copies over and instantiates the variables from vars to self
GLOBAL.kernel.util.instantiateVariables = function(self, vars) {
	for(var p in vars) {
		if(vars.hasOwnProperty(p))
			self[p] = vars[p].defaults;
	};
};

// This function should be called with apply
GLOBAL.kernel.util.evalInContext = function(toEval) {
	eval(toEval);
}