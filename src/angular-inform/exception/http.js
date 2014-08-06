angular.module('inform-http-exception', ['inform'])

  .factory('informHttpInterceptor', function ($q, inform) {

    function interceptor(rejection) {
      var msg = 'Network error (' + rejection.status + '): ' + rejection.data;
      inform.add(msg, { type: 'danger', ttl: 0});
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
