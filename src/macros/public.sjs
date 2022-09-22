/*
 * Contains all the public functions - properties
 */
macro public {
	rule{ function $mname $mparams $mbody } 
	=> 	{
			__methods.$mname = function $mparams $mbody;
		}

	//Basic properties
    case{ _ property $mname; } 
	=> 	{
	        return #{
	           	public property $mname = null;
	        }
    	}

    //Properties with defaults
    // We add the property to the variables table and add a getter and a setter method
	case{ _ property $mname = $mvalue; } 
	=> 	{
			var util = require('./lib/macro.util');
			var mnameString = unwrapSyntax(#{$mname}[0]);
	        letstx $getFnMname = [makeIdent(util.createGetter(mnameString), #{here})];
	        letstx $setFnMname = [makeIdent(util.createSetter(mnameString), #{here})];
	        
	        return #{
	            __vars.$mname = {
	            	defaults: $mvalue
	            };

				public function $getFnMname() {
					return $mname;
				}
				public function $setFnMname (val) {
					$mname = val;
				}
	        }
	    }
}

export public;