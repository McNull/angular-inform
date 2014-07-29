
app.directive('appNavbar', function() {

  return {
    scope: true,
    templateUrl: 'app/core/navbar/navbar.ng.html',
    controller: 'AppNavBarCtrl'
  };

});

app.controller('AppNavBarCtrl', function($scope, $route, $timeout) {

  $scope.routes = [];

  // Not all routes in the service are from the application.

  angular.forEach($route.routes, function(route) {
    if(route.name) {
      $scope.routes.push(route);
    }
  });

  $scope.$on("$routeChangeSuccess", function () {
    $scope.currentRoute = $route.current.$$route;
  });

  $scope.collapsed = true;

  $scope.collapse = function() {

    // Hide the menu on mobile devices when the button loses focus. The timeout is to ensure that any click event
    // is handled.

    $timeout(function() {
      $scope.collapsed = true;
    }, 200);
  };

});
