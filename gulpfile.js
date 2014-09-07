#!/usr/bin/env node

// - - - - 8-< - - - - - - - - - - - - - - - - - - -

var config = require('./build-config.js');

// - - - - 8-< - - - - - - - - - - - - - - - - - - -

var path = require('path');
var gulp = require('gulp');
var clean = require('gulp-clean');
var karma = require('gulp-karma');

// - - - - 8-< - - - - - - - - - - - - - - - - - - -

require('./gulp-tasks/bower-task.js')(gulp);
require('./gulp-tasks/modules-task.js')(gulp);
require('./gulp-tasks/index-task.js')(gulp);

// - - - - 8-< - - - - - - - - - - - - - - - - - - -
// Builds the whole kitchensink including example website

gulp.task('kitchensink', [ 'modules', 'bower', 'index', 'sandbox' ], function () {

  var path = require('path');

  return gulp.src('README.md')
    .pipe(gulp.dest(path.join(config.folders.dest, 'app')));

});

// - - - - 8-< - - - - - - - - - - - - - - - - - - -

gulp.task('sandbox-clean', [ 'modules', 'bower' ], function () {
  return gulp.src(path.join(config.folders.dest, 'sandbox'))
    .pipe(clean());
});

gulp.task('sandbox', [ 'sandbox-clean', 'modules', 'bower' ], function () {
  return gulp.src(path.join(config.folders.src, 'sandbox/**/*'))
    .pipe(gulp.dest(path.join(config.folders.dest, 'sandbox')));
});
//
// - - - - 8-< - - - - - - - - - - - - - - - - - - -

gulp.task('test-run', ['angular-inform'], function () {

  return gulp.src([
    'bower_components/angular/angular.js',
    'bower_components/angular-mocks/angular-mocks.js',
    path.join(config.folders.dest, 'angular-inform/angular-inform.min.js'),
    path.join(config.folders.src, 'angular-inform/**/*.test.js')
  ])
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    })).on('error', function (err) {
      throw err;
    });

});

gulp.task('test-watch', ['angular-inform'], function () {

  gulp.src([
    'bower_components/angular/angular.js',
    'bower_components/angular-mocks/angular-mocks.js',
    path.join(config.folders.src, 'angular-inform/angular-inform.js'),
    path.join(config.folders.dest, 'angular-inform/angular-inform-templates.js'),
    path.join(config.folders.src, 'angular-inform/**/*.js')
  ])
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'watch'
    }));

});

// - - - - 8-< - - - - - - - - - - - - - - - - - - -

gulp.task('dist-clean', ['angular-inform-clean'], function () {

  return gulp.src('dist/**/*', { read: false }).pipe(clean());

});

gulp.task('dist', ['dist-clean', 'angular-inform', 'test-run'], function () {

  var destGlob = path.join(config.folders.dest, 'angular-inform/**/*');
  return gulp.src([ destGlob, 'README.md', '!**/angular-inform-templates.js' ])
    .pipe(gulp.dest('dist'));

});

// - - - - 8-< - - - - - - - - - - - - - - - - - - -

gulp.task('default', [ 'dist' ]);

// - - - - 8-< - - - - - - - - - - - - - - - - - - -