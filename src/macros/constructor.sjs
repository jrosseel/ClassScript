/*
 * Contains the object constructor.
 */
macro constructor {
  	case { _ $cparams $cbody } 
	=> {
		return #{
			// Overrride the empty constructor.
			//  	=> This implies no ctor overloading is possible!
		    __construct = function $cparams $cbody;
		}
	}
}

export constructor;