app.controller('ReadingsController', function($scope, $firebase) {
  var loggedInUser = null;

  $scope.readingDate = '20120101';
  $scope.stepsCount = '7415';

  $scope.$on('user-change', function(e, user) {
    loggedInUser = user;
  });

  $scope.bindUser = function() {
    if(loggedInUser) {
      $scope.stepsSource = app.getUserHive(loggedInUser).child('steps_data');
      $scope.stepsSource.$on('loaded', loadStepsData);
      $scope.stepsSource.$on('change', loadStepsData);
    }
  };

  function loadStepsData() {
    $scope.stepsData = $scope.stepsSource.$asArray();
  };

  $scope.addReading = function() {
    if(loggedInUser) {
      $scope.stepsSource.push({
        readingDate: $scope.readingDate,
        stepsCount:  $scope.stepsCount
      });    	

      $scope.readingDate = '';
      $scope.stepsCount = '';
    }
  }
});
