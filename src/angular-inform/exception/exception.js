
angular.module('inform-exception', ['inform'])
  .config(function($provide) {
    $provide.decorator('$exceptionHandler', ['$delegate', '$injector',function($delegate, $injector) {

      var inform;

      return function(exception, cause) {
        inform = inform || $injector.get('inform');
        inform.add(exception.toString(), { type: 'danger', ttl: 0 });
        $delegate(exception, cause);
      };
    }]);
  });
