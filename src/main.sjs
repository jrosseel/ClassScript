// Require the language library
require('./src/kernel/main');

// Start coding in ClassyScript
class Person {
  	public property name;
  	
  	constructor(name) {
  		  this.name = name;
  	}

  	public function say(message) {
  		  console.log('Person: ' + this.name + ' says: ' + message);
  	};
}

class Student extends Person {
  public function say(message) {
      this.creationTime = 'Side effect happened';
  		console.log('Student: ' + this.name + ' says:' + message);
      //console.log(__base);
      __base.apply(this, 'say', message);
  }
}

var bob = Student.make('x');
bob.send('say', 'Howdy!');
console.log(bob.send('getCreationTime'));