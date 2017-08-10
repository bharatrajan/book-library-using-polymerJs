'use strict';
var gulp = require('gulp');
var del = require('del');
var vulcanize  = require('gulp-vulcanize');
var inlinesource = require('gulp-inline');
var cachebust = require('gulp-cache-bust');
var minifyInline = require('gulp-minify-inline');
var htmlclean = require('gulp-htmlclean');

//deletes /build
gulp.task('cleanup', function(){
    return( del(['build']) );
});

gulp.task('move-fonts', function(){
    return gulp.src(['app/fonts/**/*'])
               .pipe(gulp.dest("build/fonts"));
});

gulp.task('move-icons', function(){
  return gulp.src(['app/icons/**/*'])
             .pipe(gulp.dest("build/icons"));
});

gulp.task('move-bower_components', function(){
  return gulp.src(['app/bower_components/**/*'])
             .pipe(gulp.dest("build/bower_components"));
});

gulp.task('move-components', function(){
  return gulp.src(['app/components/**/*'])
             .pipe(gulp.dest("build/components"));
});

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

gulp.task('default', ['cleanup']);
gulp.task('build', ['move-fonts', 'move-icons', 'move-bower_components', 'move-components', 'build-index']);
