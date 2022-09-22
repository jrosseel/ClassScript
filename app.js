
require('./src/kernel/main');
var
refObj = GLOBAL.kernel.root.Object;
var __PersonTemplate = function () {
    var
    __base = refObj;
    var
    __construct = function () {
    };
   
    var __vars = {};
   
    var __methods = {};
    __vars.name = { defaults: null };
    __methods.getName = function () {
        return name;
    };
    __methods.setName = function (val) {
        name = val;
    };
   
   
    __construct = function (name$2) {
        this.name = name$2;
    };
    __methods.say = function (message) {
        console.log('Person: ' + this.name + ' says: ' + message);
    };
    ;
    return {
       
       
        getClass: function () {
            return Person;
        },
        base: __base,
       
        apply: function (context, theMessage) {
            var args = GLOBAL.kernel.util.argsToArray(arguments);
            args.shift();
            args.shift();
            if (typeof __methods[theMessage] !== 'undefined') {
                var
                res = __methods[theMessage].apply(context, args);
                return res;
            } else
                return this.base.apply(context, theMessage, args);
        },
        make: function () {
            var args = GLOBAL.kernel.util.argsToArray(arguments);
            var
           
            ctor = function () {
                var
                _base = refObj.make(args);
                var
               
                _self = _base.__copy();
               
                _base.__setContext(_self);
               
                GLOBAL.kernel.util.instantiateVariables(_self, __vars);
               
                __construct.apply(_self, args);
                var toReturn = {
                    self: _self,
                    base: _base,
                    send: function (theMessage) {
                        var
                        args$2 = GLOBAL.kernel.util.argsToArray(arguments);
                        args$2.shift();
                        if (typeof __methods[theMessage] !== 'undefined') {
                            var
                            res = __methods[theMessage].apply(this.self, args$2);
                            return res;
                        } else {
                           
                            return this.base.send(theMessage, args$2);
                        }
                    },
                   
                   
                    __copy: function () {
                        var copy = {};
                        for (var v in this.self) {
                            if (this.self.hasOwnProperty(v))
                                copy[v] = this.self[v];
                        }
                        ;
                        return copy;
                    },
                   
                    __setContext: function (newContext) {
                       
                       
                        this.self = newContext;
                        this.base.__setContext(newContext);
                    }
                };
               
                _self.send = toReturn.send;
                return toReturn;
            };
           
            return ctor();
        }
    };
};
var Person   
         
 =

__PersonTemplate();
delete __PersonTemplate;
var
__StudentTemplate = function () {
    var __base = Person;
    var
    __construct = function () {
    };
   
    var __vars = {};
   
    var __methods = {};
    __methods.say = function (message) {
        this.creationTime = 'Side effect happened';
        console.log('Student: ' + this.name + ' says:' + message);
       
        __base.apply(this, 'say', message);
    };
    return {
       
       
        getClass: function () {
            return Student;
        },
        base: __base,
       
        apply: function (context, theMessage) {
            var args = GLOBAL.kernel.util.argsToArray(arguments);
            args.shift();
            args.shift();
            if (typeof __methods[theMessage] !== 'undefined') {
                var
                res = __methods[theMessage].apply(context, args);
                return res;
            } else
                return this.base.apply(context, theMessage, args);
        },
        make: function () {
            var args = GLOBAL.kernel.util.argsToArray(arguments);
            var
           
            ctor = function () {
                var
                _base = Person.make(args);
                var
               
                _self = _base.__copy();
               
                _base.__setContext(_self);
               
                GLOBAL.kernel.util.instantiateVariables(_self, __vars);
               
                __construct.apply(_self, args);
                var toReturn = {
                    self: _self,
                    base: _base,
                    send: function (theMessage) {
                        var
                        args$2 = GLOBAL.kernel.util.argsToArray(arguments);
                        args$2.shift();
                        if (typeof __methods[theMessage] !== 'undefined') {
                            var
                            res = __methods[theMessage].apply(this.self, args$2);
                            return res;
                        } else {
                           
                            return this.base.send(theMessage, args$2);
                        }
                    },
                   
                   
                    __copy: function () {
                        var copy = {};
                        for (var v in this.self) {
                            if (this.self.hasOwnProperty(v))
                                copy[v] = this.self[v];
                        }
                        ;
                        return copy;
                    },
                   
                    __setContext: function (newContext) {
                       
                       
                        this.self = newContext;
                        this.base.__setContext(newContext);
                    }
                };
               
                _self.send = toReturn.send;
                return toReturn;
            };
           
            return ctor();
        }
    };
};
var Student   
          
 =

__StudentTemplate();
delete __StudentTemplate;
var bob = Student.make('x');
bob.send('say', 'Howdy!');
console.log(bob.send('getCreationTime'));