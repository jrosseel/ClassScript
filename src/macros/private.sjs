/*
 * Contains all the private properties
 */
macro private {
	//Basic properties
    rule{ var $mname; } 
	=> 	{
           private property $mname = null;
    	}

    // We just add it to the variables collection but dont create a getter or setter.
	rule{ var $mname = $mvalue; } 
	=> 	{
            __vars.$mname = {
            	defaults: $mvalue
            };
	    }
}

export private;