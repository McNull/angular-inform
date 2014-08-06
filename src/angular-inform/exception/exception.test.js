describe('angular-inform', function () {

  describe('exception', function() {

    var inform, $exceptionHandler;

    beforeEach(function() {

      module('inform-exception');

      inject(function(_inform_, _$exceptionHandler_) {

        inform = _inform_;
        $exceptionHandler = _$exceptionHandler_;

      });

    });

    it('should add an error message if a unhandled exception has occured', function() {

      expect(inform.messages().length).toBe(0);

      var error = new Error('This is a baddass error!');

      try {
        $exceptionHandler(error);
      }
      catch(e) {
        if(e !== error) {
          throw e;
        }
      }
      finally {
        expect(inform.messages().length).toBe(1);
        expect(inform.messages()[0].content).toBe(error.toString());
      }
    });
  });

});
