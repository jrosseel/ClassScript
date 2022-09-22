var gulp = require('gulp'),
	exec = require('child_process').exec,
	replace = require('gulp-replace'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	strip = require('gulp-strip-comments');;


// Batch script that uses the sweet js compiler to expand the macros.
gulp.task('expandmacros', function (cb) {
  	exec('sjs -m ./src/macros/class.sjs ' + 
  			 '-m ./src/macros/constructor.sjs ' +
  			 '-m ./src/macros/public.sjs ' +
  			 '-o bin/expanded.js ' +
  			 'src/main.sjs --readable-names', 
  		function (err, stdout, stderr) {
    		console.log(stdout);
    		console.log(stderr);
    		cb(err);
 	 	});
	});


// Cleans up the expanded code by 
gulp.task('build', ['expandmacros'], function() {
	// Expand the macros
	gulp.src('bin/expanded.js')
		// Bypass hygiene for reserved keywords.
		.pipe(replace(/(self)\$\w+/g, cutDollar))
		.pipe(replace(/(_self)\$\w+/g, cutDollar))
		.pipe(replace(/(__methods)\$\w+/g, cutDollar))
		.pipe(replace(/(__vars)\$\w+/g, cutDollar))
		.pipe(replace(/(__construct)\$\w+/g, cutDollar))
		.pipe(replace(/(base)\$\w+/g, cutDollar))
		.pipe(replace(/(__base)\$\w+/g, cutDollar))
		// Bypass hygiene for private variables.
		.pipe(replace(/_\w+\$\w+/g, cutDollar))
		// Remove ugly comments after expansion
		.pipe(strip())
		// Concatenate all the macros and class files and put them into one file.
		.pipe(concat('app.js'))
		// Write the result to an output file.
		.pipe(gulp.dest(''))
		// Minify the output for efficiency
		.pipe(uglify())
		// Write the result to the final file
		.pipe(concat('app.min.js'))
		.pipe(gulp.dest('dist'));
});


// Simple replace string function that removes the $ and everything after it.
// src: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_function_as_a_parameter
function cutDollar(match, p1) {
	return match.substring(0, match.lastIndexOf('$'));
};

// Task that compiles the sjs to javascript using sweet.js.
gulp.task('compile', ['build']);
//gulp.task('compile', ['expandmacros', 'build']);