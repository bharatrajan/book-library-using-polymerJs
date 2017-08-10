'use strict';
var gulp = require('gulp');
var vulcanize  = require('gulp-vulcanize');
var inlinesource = require('gulp-inline');
var cachebust = require('gulp-cache-bust');
var minifyInline = require('gulp-minify-inline');
var htmlclean = require('gulp-htmlclean');

var ts = new Date().getTime();
