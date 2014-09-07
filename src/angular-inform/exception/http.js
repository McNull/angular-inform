angular.module('inform-http-exception', ['inform'])

  .factory('informHttpInterceptor', function ($q, inform) {

    function interceptor(rejection) {
      try {
        var msg = 'Network error (' + rejection.status + '): ' + rejection.data;
        inform.add(msg, { type: 'danger', ttl: 0});
      } catch(ex) {
        console.log('$httpProvider', ex);
      }

      return $q.reject(rejection);
    }

    return {
      requestError: interceptor,
      responseError: interceptor
    };

  })

  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('informHttpInterceptor');
  });
