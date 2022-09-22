// Require the language library
require('./src/kernel/main');
var // Start coding in ClassyScript
refObj = GLOBAL.kernel.root.Object;
var __PersonTemplate = function () {
    var // Define a template for the class.
    __base$2 = refObj;
    var // Define the empty constructor. If one exists this will be overriden.
    __construct$2 = function () {
    };
    // Define the variables table
    var __vars$2 = {};
    // Define the methods table
    var __methods$2 = {};
    __vars.name = { defaults: null };
    __methods.getName = function () {
        return name;
    };
    __methods.setName = function (val) {
        name = val;
    };
    // Overrride the empty constructor.
    //  	=> This implies no ctor overloading is possible!
    __construct = function (name$2) {
        this.name = name$2;
    };
    __methods.say = function (message) {
        console.log('Person: ' + this.name + ' says: ' + message);
    };
    ;
    return {
        // This is the actual class. It contains a reference to the baseClass, and an instation function.
        // 	Since a class is an object, static methods and variables can be defined on top of it.
        getClass: function () {
            return Person;
        },
        base: __base$2,
        // Quick try to see if we can do a base call
        apply: function (context, theMessage) {
            var args = GLOBAL.kernel.util.argsToArray(arguments);
            args.shift();
            args.shift();
            if (typeof __methods$2[theMessage] !== 'undefined') {
                var // If we recognize the method, apply it.
                res = __methods$2[theMessage].apply(context, args);
                return res;
            } else
                return this.base.apply(context, theMessage, args);
        },
        make: function () {
            var args = GLOBAL.kernel.util.argsToArray(arguments);
            var // Return the dispatcher function
            // We immediately execute this lambda to create a seperate lexical scope for the dispatcher.
            ctor = function () {
                var // Instantiate the class by initializing base.
                _base = refObj.make(args);
                var // We first create a baseclass before we copy it. 
                // 	This so the constructor of base is also executed.
                _self = _base.__copy();
                // We then set the self object of our base object to self.
                _base.__setContext(_self);
                // Instantiate all variables in vars and assign them to self.
                GLOBAL.kernel.util.instantiateVariables(_self, __vars$2);
                // Now execute the constructor to override any defaults if that should be the case.
                __construct$2.apply(_self, args);
                var toReturn = {
                    self: _self,
                    base: _base,
                    send: function (theMessage) {
                        var // Remove the first element because it is theMessage.
                        args$2 = GLOBAL.kernel.util.argsToArray(arguments);
                        args$2.shift();
                        if (typeof __methods$2[theMessage] !== 'undefined') {
                            var // If we recognize the method, apply it.
                            res = __methods$2[theMessage].apply(this.self, args$2);
                            return res;
                        } else {
                            // If we dont, send it to the base object.
                            return this.base.send(theMessage, args$2);
                        }
                    },
                    // Copîes the current state of this object.
                    // Is used in the case of inheritance.
                    __copy: function () {
                        var copy = {};
                        for (var v in this.self) {
                            if (this.self.hasOwnProperty(v))
                                copy[v] = this.self[v];
                        }
                        ;
                        return copy;
                    },
                    // Sets the current state of this object. Is used in inheritance use cases.
                    __setContext: function (newContext) {
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
var Person    // Execute the template to create the class, then clean up the template.
          // Since these classes live in the global namespace we have to set them to null.
 = // Execute the template to create the class, then clean up the template.
// Since these classes live in the global namespace we have to set them to null.
__PersonTemplate();
delete __PersonTemplate;
var // Define a template for the class.
__StudentTemplate = function () {
    var __base$2 = Person;
    var // Define the empty constructor. If one exists this will be overriden.
    __construct$2 = function () {
    };
    // Define the variables table
    var __vars$2 = {};
    // Define the methods table
    var __methods$2 = {};
    __methods.say = function (message) {
        this.creationTime = 'Side effect happened';
        console.log('Student: ' + this.name + ' says:' + message);
        //console.log(__base);
        __base.apply(this, 'say', message);
    };
    return {
        // This is the actual class. It contains a reference to the baseClass, and an instation function.
        // 	Since a class is an object, static methods and variables can be defined on top of it.
        getClass: function () {
            return Student;
        },
        base: __base$2,
        // Quick try to see if we can do a base call
        apply: function (context, theMessage) {
            var args = GLOBAL.kernel.util.argsToArray(arguments);
            args.shift();
            args.shift();
            if (typeof __methods$2[theMessage] !== 'undefined') {
                var // If we recognize the method, apply it.
                res = __methods$2[theMessage].apply(context, args);
                return res;
            } else
                return this.base.apply(context, theMessage, args);
        },
        make: function () {
            var args = GLOBAL.kernel.util.argsToArray(arguments);
            var // Return the dispatcher function
            // We immediately execute this lambda to create a seperate lexical scope for the dispatcher.
            ctor = function () {
                var // Instantiate the class by initializing base.
                _base = Person.make(args);
                var // We first create a baseclass before we copy it. 
                // 	This so the constructor of base is also executed.
                _self = _base.__copy();
                // We then set the self object of our base object to self.
                _base.__setContext(_self);
                // Instantiate all variables in vars and assign them to self.
                GLOBAL.kernel.util.instantiateVariables(_self, __vars$2);
                // Now execute the constructor to override any defaults if that should be the case.
                __construct$2.apply(_self, args);
                var toReturn = {
                    self: _self,
                    base: _base,
                    send: function (theMessage) {
                        var // Remove the first element because it is theMessage.
                        args$2 = GLOBAL.kernel.util.argsToArray(arguments);
                        args$2.shift();
                        if (typeof __methods$2[theMessage] !== 'undefined') {
                            var // If we recognize the method, apply it.
                            res = __methods$2[theMessage].apply(this.self, args$2);
                            return res;
                        } else {
                            // If we dont, send it to the base object.
                            return this.base.send(theMessage, args$2);
                        }
                    },
                    // Copîes the current state of this object.
                    // Is used in the case of inheritance.
                    __copy: function () {
                        var copy = {};
                        for (var v in this.self) {
                            if (this.self.hasOwnProperty(v))
                                copy[v] = this.self[v];
                        }
                        ;
                        return copy;
                    },
                    // Sets the current state of this object. Is used in inheritance use cases.
                    __setContext: function (newContext) {
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
var Student    // Execute the template to create the class, then clean up the template.
           // Since these classes live in the global namespace we have to set them to null.
 = // Execute the template to create the class, then clean up the template.
// Since these classes live in the global namespace we have to set them to null.
__StudentTemplate();
delete __StudentTemplate;
var bob = Student.make('x');
bob.send('say', 'Howdy!');
console.log(bob.send('getCreationTime'));