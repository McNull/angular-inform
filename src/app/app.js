
var app = angular.module('app', ['ngRoute', 'inform', 'inform-exception', 'inform-http-exception', 'showdown', 'ngAnimate']);

app.config(function($routeProvider) {

  $routeProvider.when('/readme', {
    templateUrl: 'app/readme/readme.html'
  });

  $routeProvider.when('/demo', {
    templateUrl: 'app/demo/demo.html'
  });

  $routeProvider.otherwise({
    redirectTo: '/demo'
  });

});

app.controller('MainCtrl', function($scope, $location) {

  // Keep track of the active url to highlite the nav-pill

  $scope.$watch(function() {
    return $location.path();
  }, function(value) {
    $scope.activeUrl = value;
  });

});