GLOBAL.kernel.root = {};

// Default toString.
function _toString() {
     console.log("Printing " + this.name);
     console.log(this);
};

// The root class. Creates root objects.
GLOBAL.kernel.root.Object = (function(){ 
     var __base = null;
     var __staticMethods = {};

     // Initialize the creation Date in constructor.
     var __construct = function() {
          this.creationTime = new Date();
     };
     // Define the variables table
     var __vars = { 
          creationTime: {
            defaults: null
          },
     };

     // Define the methods table
     var __methods = { 
          getCreationTime: function() {
               return this.creationTime;
          },
          toString: _toString
     };

     return {
          name: 'rootClass',
          __base: null,
          // Quick try to see if we can do a base call
          apply: function(context, theMessage) {
               var args = GLOBAL.kernel.util.argsToArray(arguments);
               args.shift();args.shift();
               if(typeof __methods[theMessage]  !== "undefined") {
                    // If we recognize the method, apply it.
                    var res = __methods[theMessage].apply(context, args);
                    return res;
               }
               else throw "Message " + theMessage + " is not recognized by root.";
          },
          make: function() {
               var args = arguments;

               // We immediately execute this lambda to create a seperate lexical scope for the dispatcher.
               var ctor = function() {
                    // Get the object creation time
                    var _creationTime = new Date();
                    var _self = {};

                    // Instantiate all variables in vars and assign them to self.
                    GLOBAL.kernel.util.instantiateVariables(_self, __vars);
                    
                    // Now execute the constructor to override any defaults if that should be the case.
                    __construct.apply(_self, args);
                    return {
                         self: _self,
                         base: null,
                         getClass: function() { return GLOBAL.kernel.root.Object; },
                         send: function(theMessage) {
                              // Remove the first element because it is theMessage.
                              var args = GLOBAL.kernel.util.argsToArray(arguments);
                              args.shift();
                              if(typeof __methods[theMessage]  !== "undefined")
                                   // If we recognize the method, apply it.
                                   return __methods[theMessage].apply(this.self, args);
                              else // If we dont, crash.
                                   throw "Message " + theMessage + " is not recognized by " + __self.send('toString');                              
                         },
                         __copy: function() {
                              var copy = {};
                                   for(var v in this.self) {
                                   if(this.self.hasOwnProperty(v))
                                        copy[v] = this.self[v];
                              };
                              return copy;
                         },
                         __setContext: function(newContext) {
                              this.self = newContext;
                         }
                    };
               };
               // Execute the object-constructor and return the object.
               return ctor();
          }
     }
 })();