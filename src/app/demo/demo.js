app.controller('DemoController', function($scope, inform, $http) {

  //if(inform.messages().length === 0) {
  //  inform.add('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab amet, blanditiis debitis dolorem doloremque et facilis harum in iusto laborum minima molestiae nemo nisi non possimus, quisquam rerum tempore voluptates.', { ttl: -1, type: 'success' });
  //  inform.add('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab amet, blanditiis debitis dolorem doloremque et facilis harum in iusto laborum minima molestiae nemo nisi non possimus, quisquam rerum tempore voluptates.', { ttl: -1, type: 'info' });
  //  inform.add('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda atque, earum est id illum laboriosam maxime praesentium quisquam! Blanditiis cum deleniti eum impedit quasi. Eius eligendi eveniet ipsum natus quis.', { ttl: -1, type: 'warning' });
  //  inform.add('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda deserunt dicta esse, ipsam molestiae nobis provident qui quidem quis repudiandae totam veniam voluptas voluptatum? A adipisci aut cumque earum pariatur?', { ttl: -1, type: 'danger' });
  //}

  $scope.inform = inform;

  $scope.msg = {
    content: 'The message content',
    options: {
      ttl: 5000,
      type: 'default'
    }
  };

  $scope.htmlMarkup = function() {

    var classes = [];

    if($scope.element.animations) {
      classes.push('inform-animate');
    }

    if($scope.element.fixed) {
      classes.push('inform-fixed');
    }

    if($scope.element.shadows) {
      classes.push('inform-shadow');
    }

    if($scope.element.center) {
      classes.push('inform-center');
    }

    var markup = '<div inform';

    if(classes.length) {
      markup += ' class="';
      markup += classes.join(' ');
      markup += '"';
    }

    markup += '></div>';

    return markup;
  };

  $scope.jsStatement = function() {

    var ret = "inform.add(" + JSON.stringify($scope.msg.content);
    var options;

    if($scope.msg.options.ttl !== 5000) {
      var ttl = $scope.msg.options.ttl === null ? 0 : $scope.msg.options.ttl;
      options = { ttl: ttl };
    }

    if($scope.msg.options.type !== 'info') {
      options = options || {};
      options.type = $scope.msg.options.type;
    }

    if(options) {
      ret += ", " + JSON.stringify(options, null, '  ');
    }

    ret += ");";

    return ret;

  };

  $scope.element = {
    fixed: true,
    animations: true,
    shadows: true,
    center: false
  };

  $scope.add = function(msg) {
    inform.add(msg.content, msg.options);
  };

  $scope.throwException = function() {
    throw new Error('Oh dear! Something bad has occured!');
  };

  $scope.throwHttpException = function() {
    $http.get('/this/does/not/exist', function() {});
  };

  $scope.clear = inform.clear;

});
