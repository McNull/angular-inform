
var app = angular.module('app', ['ngRoute', 'inform']);

app.config(function($routeProvider) {

  $routeProvider.when('/', {
    templateUrl: 'app/home/index.html'
  });

  $routeProvider.otherwise({
    redirectTo: '/'
  });

});

app.controller('MainCtrl', function($scope, inform) {


});