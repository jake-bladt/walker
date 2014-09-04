app.controller('ReadingsController', function($scope, $firebase) {
  $scope.readingDate = '20120101';
  $scope.stepsCount = '7415';

  $scope.$on('user-change', function(e, user) {
    this.loggedInUser = user;
  });

  $scope.bindUser = function() {
    if(this.loggedInUser) {
      $scope.stepsSource = app.getUserHive(this.loggedInUser).child('steps_data');
      $scope.stepsSource.$on('loaded', loadStepsData);
      $scope.stepsSource.$on('change', loadStepsData);
    }
  };

  function loadStepsData() {
    $scope.stepsData = $scope.stepsSource.$asArray();
  };

  $scope.addReading = function() {
    if(app.userHive) {
      app.userHive.child('steps_data').push({
        readingDate: $scope.readingDate,
        stepsCount:  $scope.stepsCount
      });    	

      $scope.readingDate = '';
      $scope.stepsCount = '';
    }
  }
});
