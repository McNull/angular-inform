// Simple routing example.

app.route = {
  items: [
    /* {
     name:             name of the route,
     [url]:            url to map the route to. defaults to /{{name-dash-cased}}
     [templateUrl]:    url to template. defaults to /app/{{url}}/index.html
     } */
    {
      url: '/',
      name: 'Home',
      templateUrl: 'app/home/index.html'
    },
    {
      name: 'About'
    },
    {
      name: 'Contact'
    }
  ],
  setup: function ($routeProvider, routeItems) {

    angular.forEach(routeItems, function (routeItem) {

      if (!routeItem.name) {
        throw new Error('Route is missing name property. ' + JSON.stringify(routeItem))
      }

      if (!routeItem.url) {
        routeItem.url = '/' + app.utils.toDashCased(routeItem.name);
      }

      if (!routeItem.templateUrl) {

        var url = routeItem.url;

        if (url[0] != '/') {
          url = url + '/';
        }

        if (url[url.length - 1] != '/') {
          url += '/';
        }

        routeItem.templateUrl = 'app' + url + 'index.html';
      }

      $routeProvider.when(routeItem.url, routeItem);

    });

    $routeProvider.otherwise({
      redirectTo: '/'
    });
  }
};

app.config(function ($routeProvider) {

  app.route.setup($routeProvider, app.route.items);

});

