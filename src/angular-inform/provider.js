inform.provider('inform', function () {

  var provider = this;

  this._defaults = {
    type: 'info',
    ttl: 5000
  };

  this.defaults = function (options) {
    provider._defaults = angular.extend(provider._defaults, options || {});
    return provider._defaults;
  };

  this.$get = ['$timeout', function ($timeout) {

    var _messages = [];

    function add(content, options) {
      var msg = angular.extend({}, provider._defaults, options);
      msg.content = content;
      _messages.push(msg);

      if(msg.ttl > 0) {
        msg.timeout = $timeout(function() {
          remove(msg);
        }, msg.ttl);
      }

      return msg;
    }

    function remove(msg) {
      var i = _messages.length;
      while (i--) {
        if (_messages[i] === msg) {
          _messages.splice(i, 1);

          if(msg.timeout) {
            $timeout.cancel(msg.timeout);
            delete msg.timeout;
          }

          break;
        }
      }
    }

    return {
      messages: function () {
        return _messages;
      },
      add: add,
      remove: remove
    };
  }];

});