
(function(app) {
  app.utils = {
    toDashCased: function (str) {
      return str.replace(/([a-z])([A-Z])/g, "$1-$2").split(' ').join('-').toLowerCase();
    }
  };
})(app);

