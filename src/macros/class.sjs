/* The class macro. This macro is the core of the application. */
macro class {
  	rule { 
			$className { 
				$($body) ... 
			} 
		}
		// We rewrite this macro to one inheriting from the default baseclass.
		=> { 
			var refObj =  GLOBAL.kernel.root.Object;
			class $className extends refObj {
				$($body) ... 
			}
		}
	// Class with inheritance
  	case {
			_ $className extends $baseClass { 
				$($body) ... 
			}
		}
	  	/* In methods, we register all the public properties and functions.
	  	 * The objectfactory turns this methods-collection into an object by turning it into
	   	 * a dispatcher with inhertance etc. */
		=> {
			var util = require('./lib/macro.util');
			var classTemplateString = unwrapSyntax(#{$className}[0]);
	        letstx $classTemplateName = [makeIdent(util.createClassTemplateName(classTemplateString), #{here})];

	        return #{
				// Define a template for the class.
			    var $classTemplateName = function(){
			    	var __base = $baseClass;
			    	// Define the empty constructor. If one exists this will be overriden.
			    	var __construct = function() {};
			    	// Define the variables table
				   	var __vars = { };
				   	// Define the methods table
				   	var __methods = { };

				   	$($body) ...

				   	// This is the actual class. It contains a reference to the baseClass, and an instation function.
				   	// 	Since a class is an object, static methods and variables can be defined on top of it.
			     	return {
			     		getClass: function() { return $className; },
			     		base: __base,
			     		// Quick try to see if we can do a base call
			     		apply: function(context, theMessage) {
     						var args = GLOBAL.kernel.util.argsToArray(arguments);
     						args.shift();args.shift();
		     				if(typeof __methods[theMessage]  !== "undefined") {
		     					// If we recognize the method, apply it.
		     					var res = __methods[theMessage].apply(context, args);
		     					return res;
		     				}
		     				else return this.base.apply(context, theMessage, args);  	
			     		},
			     		make: function() {
			     				var args = GLOBAL.kernel.util.argsToArray(arguments);
					     		// Return the dispatcher function
					     		// We immediately execute this lambda to create a seperate lexical scope for the dispatcher.
					     		var ctor = function() {
					     			// Instantiate the class by initializing base.
					     			var _base = $baseClass.make(args);
					     			// We first create a baseclass before we copy it. 
					     			// 	This so the constructor of base is also executed.
									var _self = _base.__copy();
									// We then set the self object of our base object to self.
									_base.__setContext(_self);

									// Instantiate all variables in vars and assign them to self.
									GLOBAL.kernel.util.instantiateVariables(_self, __vars);
									
									// Now execute the constructor to override any defaults if that should be the case.
									__construct.apply(_self, args);

					     			var toReturn = {
					     				self: _self,
					     				base: _base,
							     		send: function(theMessage) {
							     				// Remove the first element because it is theMessage.
					     						var args = GLOBAL.kernel.util.argsToArray(arguments);
					     						args.shift();
							     				if(typeof __methods[theMessage]  !== "undefined") {
							     					// If we recognize the method, apply it.
							     					var res = __methods[theMessage].apply(this.self, args);
							     					return res;
							     				}
							     				else { // If we dont, send it to the base object.
								     				return this.base.send(theMessage, args);
								     			}     				
					     				},
					     				// Copîes the current state of this object.
					     				// Is used in the case of inheritance.
					     				__copy: function() {
					     					var copy = {};
     										for(var v in this.self) {
												if(this.self.hasOwnProperty(v))
													copy[v] = this.self[v];
											};
											return copy;
					     				},
					     				// Sets the current state of this object. Is used in inheritance use cases.
					     				__setContext: function(newContext) {
					     					// Go down the whole chain to set context to an inheriting object.
					     					// 	This is crucial to make things polymorph.
					     					this.self = newContext;
					     					this.base.__setContext(newContext);
					     				}
					     			};
					     			// Set the send message.
					     			_self.send = toReturn.send;

					     			return toReturn;
					     		};
					     		// Execute the object-constructor and return the object.
					     		return ctor();
			     			}
	     			};
		     	};
				// Execute the template to create the class, then clean up the template.
				// Since these classes live in the global namespace we have to set them to null.
				var $className = $classTemplateName();
				delete $classTemplateName;
			}
		}
}

export class;