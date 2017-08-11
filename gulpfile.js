'use strict';
var gulp = require('gulp');
var del = require('del');
var vulcanize  = require('gulp-vulcanize');
var inlinesource = require('gulp-inline');
var cachebust = require('gulp-cache-bust');
var minifyInline = require('gulp-minify-inline');
var htmlclean = require('gulp-htmlclean');
var runSequence = require('run-sequence');

/**
* @description - Deletes /build directory
* @callBack
* @param - none
* @returns - boolean task success | fail
*/
gulp.task('cleanup', function(){
    return( del(['build']) );
});

/**
* @description - Moves fonts directory from /app -> /build
* @callBack
* @param - none
* @returns - boolean task success | fail
*/
gulp.task('move-fonts', function(){
    return gulp.src(['app/fonts/**/*'])
               .pipe(gulp.dest("build/fonts"));
});

/**
* @description - Moves icons directory from /app -> /build
* @callBack
* @param - none
* @returns - boolean task success | fail
*/
gulp.task('move-icons', function(){
  return gulp.src(['app/icons/**/*'])
             .pipe(gulp.dest("build/icons"));
});

/**
* @description - Moves bower_components directory from /app -> /build
* @callBack
* @param - none
* @returns - boolean task success | fail
*/
gulp.task('move-bower_components', function(){
  return gulp.src(['app/bower_components/**/*'])
             .pipe(gulp.dest("build/bower_components"));
});

/**
* @description - Moves components directory from /app -> /build
* @callBack
* @param - none
* @returns - boolean task success | fail
*/
gulp.task('move-components', function(){
  return gulp.src(['app/components/**/*'])
             .pipe(gulp.dest("build/components"));
});

/**
* @description - Takes index.html and bundles up all
* @description - internal imports
* @callBack
* @param - none
* @returns - boolean task success | fail
*/
gulp.task('build-index', function(){
       return gulp.src("app/index.html")
                  .pipe(cachebust({
                    type: 'timestamp'
                  }))
                  .pipe(vulcanize({
                                    excludes: [],
                                    stripExcludes: false,
                                    inlineScripts: true,
                                    inlineCss: true,
                                    implicitStrip: true,
                                    stripComments: true
                                  }))
                  .pipe(minifyInline())
                  .pipe(htmlclean())
                  .pipe(gulp.dest('build'));
});

gulp.task('build', ['move-fonts', 'move-icons', 'move-bower_components', 'move-components', 'build-index']);
gulp.task('default', function(done) {
    runSequence('cleanup', 'build', function() {
        console.log('Build completed successfully');
        done();
    });
});
