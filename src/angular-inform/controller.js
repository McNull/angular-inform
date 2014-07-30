inform.controller('InformCtrl', function($scope, inform) {

  $scope.messages = inform.messages();
  $scope.remove = inform.remove;
  $scope.cancelTimeout = inform.cancelTimeout;
  $scope.setTimeout = inform.setTimeout;

});
