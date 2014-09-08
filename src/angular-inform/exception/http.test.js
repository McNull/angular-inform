describe('angular-inform', function () {

  describe('informHttpInterceptor', function() {

    var inform, informHttpInterceptor;

    beforeEach(function() {

      module('inform-http-exception');

      inject(function(_inform_, _informHttpInterceptor_) {

        inform = _inform_;
        informHttpInterceptor = _informHttpInterceptor_;

      });

    });

    it('should have the same methods for response and request', function() {
      // Just to safeguard the tests ... if this fails we'll need to test both functions.
      expect(informHttpInterceptor.responseError).toBe(informHttpInterceptor.requestError);
    });

    it('should add an error message if a http exception has occured', function() {

      expect(inform.messages().length).toBe(0);

      var rejection = {
        status: 123,
        statusText: 'This is bad!'
      };

      try {
        informHttpInterceptor.responseError(rejection);
      }
      catch(e) {
        if(e !== error) {
          throw e;
        }
      }
      finally {
        expect(inform.messages().length).toBe(1);
        var content = inform.messages()[0].content;
        expect(content.indexOf(rejection.status.toString())).not.toBe(-1);
        expect(content.indexOf(rejection.statusText.toString())).not.toBe(-1);
      }
    });
  });

});
