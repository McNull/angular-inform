
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
        'angular-animate/angular-animate.js'
      ],
      css: [
        'bootstrap-css/css/bootstrap.css'
      ],
      test: [
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

  // Demo module ...

  .add('ngLogo', {

    // ... with different folder than the module name.

    folder: 'angular-logo'
  });

// - - - - 8-< - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

module.exports = project; // Needed for Karma

// - - - - 8-< - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

