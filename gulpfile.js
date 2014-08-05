
// - - - - 8-< - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var gulp = require('gulp');
var project = require('gulp-angular');

// - - - - 8-< - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var settings = {

  files: {
    vendor: {
      js: [
        'angular/angular.js',
        'angular-route/angular-route.js',
        'showdown/compressed/showdown.js'
      ],
      css: [
        'bootstrap-css/css/bootstrap.css'
      ],
      test: [
        'jquery/dist/jquery.js',
        'angular-mocks/angular-mocks.js'
      ]
    }
  }
};

// - - - - 8-< - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Initialize the project by providing the gulp instance and the settings.

project.init(gulp, settings);

// Inform the project of the modules

project.modules

  // Our main 'app' module

  .add('app')

  // The angular inform module

  .add('inform', {
    folder: 'angular-inform'
  })

  .add('showdown', {
    folder: 'angular-showdown'
  });


// - - - - 8-< - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

gulp.task('build', ['index'], function() {
  gulp.src('README.md').pipe(gulp.dest('public/app'));
});

// - - - - 8-< - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

module.exports = project; // Needed for Karma

// - - - - 8-< - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

