describe('navbar', function () {

  var $controller, $scope, routeMock, $timeout;

  beforeEach(module('app'));

  beforeEach(function () {

    inject(function (_$controller_, _$rootScope_, _$timeout_) {

      $controller = _$controller_;
      $scope = _$rootScope_.$new();
      $timeout = _$timeout_;

    });

    routeMock = {
      routes: []
    };

  });

  function createController() {
    return $controller('AppNavBarCtrl', {
      $scope: $scope,
      $route: routeMock,
      $timeout: $timeout
    });
  }

  it('should construct the AppNavBarCtrl', function () {
    expect(createController()).toBeDefined();
  });

  it('should add the routes to the scope', function () {

    // Arrange

    routeMock.routes.push({
      name: 'route1'
    }, {
      name: 'route2'
    });

    // Act

    var ctrl = createController();

    // Assert

    expect($scope.routes).toBeDefined();
    expect($scope.routes.length).toBe(routeMock.routes.length);
    expect($scope.routes.indexOf(routeMock.routes[0])).not.toBe(-1);
    expect($scope.routes.indexOf(routeMock.routes[1])).not.toBe(-1);

  });

  it('should not add the routes to the scope which don\'t have a name', function () {

    // Arrange

    routeMock.routes.push({
      name: 'route1'
    }, {
      name: 'route2'
    }, {
      noName: 'should not be added'
    });

    // Act

    createController();

    // Assert

    expect($scope.routes).toBeDefined();
    expect($scope.routes.length).toBe(routeMock.routes.length - 1);
    expect($scope.routes.indexOf(routeMock.routes[0])).not.toBe(-1);
    expect($scope.routes.indexOf(routeMock.routes[1])).not.toBe(-1);
    expect($scope.routes.indexOf(routeMock.routes[2])).toBe(-1);

  });

  it('should set the currentRoute on the scope whenever the route has changed', function () {

    // Arrange

    var expected = {
      name: 'this one'
    };

    routeMock.current = {
      $$route: expected
    };

    createController();

    // Act

    $scope.$emit('$routeChangeSuccess');

    // Assert

    expect($scope.currentRoute).toBe(expected);

  });

  it('should be collapsed by default', function () {

    // Arrange

    // Act

    createController();

    // Act

    expect($scope.collapsed).toBe(true);

  });

  it('should be collapsed by default', function () {

    // Arrange

    // Act

    createController();

    // Act

    expect($scope.collapsed).toBe(true);

  });

  it('should collapsed after delay', function () {

    // Delay is to allow the anchors to handle the click event

    // Arrange

    createController();
    $scope.collapsed = false;

    // Act

    $scope.collapse();

    // Assert

    expect($scope.collapsed).toBe(false);
    $timeout.flush();
    expect($scope.collapsed).toBe(true);

  });

});