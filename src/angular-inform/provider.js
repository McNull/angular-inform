inform.provider('inform', function () {

  var provider = this;

  this._defaults = {
    type: 'default',
    ttl: 5000
  };

  this.defaults = function (options) {
    provider._defaults = angular.extend(provider._defaults, options || {});
    return provider._defaults;
  };


  this.$get = ['$timeout', function ($timeout) {

    var _messages = [];

    function _indexOf(predicate) {
      var i = _messages.length;

      while (i--) {
        if (predicate(_messages[i])) {
          return i;
        }
      }

      return -1;
    }

    function cancelTimeout(msg) {
      if (msg.timeout) {
        $timeout.cancel(msg.timeout);
        delete msg.timeout;
      }
    }

    function setTimeout(msg) {

      cancelTimeout(msg);

      if (msg.ttl > 0) {
        msg.timeout = $timeout(function () {
          remove(msg);
        }, msg.ttl);
      }
    }

    function add(content, options) {

      var msg = angular.extend({}, provider._defaults, options);

      var idx = _indexOf(function (x) {
        return x.content === content && x.type == msg.type;
      });

      if (idx >= 0) {

        msg = _messages[idx];
        msg.count += 1;

      } else {

        msg.content = content;
        msg.tickCount = +new Date();
        msg.count = 1;

        _messages.push(msg);
      }

      setTimeout(msg);

      return msg;
    }

    function remove(msg) {

      var idx = _indexOf(function (x) {
        return x === msg;
      });

      if (idx >= 0) {
        _messages.splice(idx, 1);
        cancelTimeout(msg);
      }
    }

    function clear() {
      _messages.length = 0;
    }

    return {
      messages: function () {
        return _messages;
      },
      add: add,
      remove: remove,
      clear: clear,
      cancelTimeout: cancelTimeout,
      setTimeout: setTimeout
    };
  }];

});