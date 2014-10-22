/********* Variables *********/

/** Paths **/
var destinationPath = 'application/';
var assetsPath = 'assets'
var styleRootPath = assetsPath + '/scss'
var styleDestPath = assetsPath + '/css';
var scriptPath = assetsPath + '/scripts';
var viewPath = 'views'

/** Extensions **/
var styleRootExtension = '/*.scss'
var styleDestExtension = '/*.css'
var scriptExtension = '/*.js'

/********* Dependencies *********/
var gulp = require('gulp'); 
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var connect = require('gulp-connect');

/************* Files *************/
gulp.task('style', function() {
    return gulp.src(styleRootPath + styleRootExtension)
        .pipe(sass())
        .pipe(gulp.dest(destinationPath + styleDestPath));
});

gulp.task('scripts', function() {
    return gulp.src(scriptPath + scriptExtension)
        .pipe(concat('script.js'))
        .pipe(gulp.dest(destinationPath + scriptPath))
        .pipe(rename('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(destinationPath + scriptPath));
});

/************* Others *************/
gulp.task('lint', function() {
    return gulp.src(scriptPath + scriptExtension)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('webserver', function() {
  connect.server({
    root: ['.',viewPath, destinationPath]
  });
});

gulp.task('watch', function() {
    gulp.watch(scriptPath + scriptExtension, ['lint', 'scripts']);
    gulp.watch(styleRootPath + styleRootExtension, ['style']);
});

gulp.task('default', ['lint', 'style', 'scripts','webserver','watch']);