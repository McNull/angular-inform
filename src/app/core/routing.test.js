describe('routing', function () {

  var routeProviderMock, app;

  beforeEach(module('app'));

  beforeEach(function() {

    routeProviderMock = {};
    routeProviderMock.when = function() {};
    routeProviderMock.otherwise = function() {};

    app = angular.module('app');
  });

  it('should default to /', function () {

    // Arrange

    spyOn(routeProviderMock, 'otherwise');

    // Act

    app.route.setup(routeProviderMock, []);

    // Assert

    expect(routeProviderMock.otherwise).toHaveBeenCalledWith({ redirectTo: '/' });

  });

  it('should add routes by url to provider', function () {

    // Arrange

    var routes = [{
      url: '/route1', name: 'route1'
    }, {
      url: '/route2', name: 'route2'
    }];

    var results = {};

    routeProviderMock.when = function(url, route) {
      results[url] = route;
    };

    // Act

    app.route.setup(routeProviderMock, routes);

    // Assert

    routes.forEach(function(route) {
      var result = results[route.url];
      expect(result).toBeDefined();
      expect(result).toBe(route);
    });

  });

  it('should create missing templateUrls based on name', function () {

    // Arrange

    var routes = [{
      name: 'route with spaces'
    }, {
      name: 'Route with Uppercase Characters'
    }];

    var results = {};

    // Act

    app.route.setup(routeProviderMock, routes);

    // Assert

    expect(routes[0].templateUrl).toBe('app/route-with-spaces/index.html');
    expect(routes[1].templateUrl).toBe('app/route-with-uppercase-characters/index.html');

  });

  it('should create missing urls based on name', function () {

    // Arrange

    var routes = [{
      name: 'route with spaces'
    }, {
      name: 'Woute rith Wuppercase'
    }];

    var results = {};

    // Act

    app.route.setup(routeProviderMock, routes);

    // Assert

    expect(routes[0].url).toBe('/route-with-spaces');
    expect(routes[1].url).toBe('/woute-rith-wuppercase');

  });

});
