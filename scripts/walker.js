var app = angular.module('walkerApp', ['firebase']);
app.firebaseRef = new Firebase("https://blinding-torch-3484.firebaseio.com/");

app.getUserHive = function(user) {
  var usersHive = app.firebaseRef.child('users');
  return usersHive.child(user.uid);
};

app.controller('AuthenticationController', function($scope) {

  function setLoggedInUser(user) {
    loggedInUser = user;
    $scope.$emit('user-change', user);
  };

  function identityCallback(error, user) {
    if(error) {
      $scope.authError = error;
      setLoggedInUser(null);
      $scope.$apply(function() {
        $scope.currentUser = "guest";
        $scope.authError = error;
      });
    } else if(user) {
      setLoggedInUser(user);
      $scope.$apply(function() {
      	$scope.currentUser = user.email;
        $scope.authError = null;
      });
      app.userHive = app.getUserHive(user);
      if( app.isNewUser ) {
      	app.userHive.set({
          email: user.email,
          provider: user.provider,
          provider_id: user.id,
          steps_data: {}
      	});
      }
    }
  }  

  $scope.currentUser = "guest";
  $scope.identityProvider = new FirebaseSimpleLogin(app.firebaseRef, identityCallback);

  $scope.createUser = function() {
  	app.isNewUser = true;
    $scope.identityProvider.createUser($scope.userEmail, $scope.userPassword, identityCallback);
  };

  $scope.login = function() {
  	app.isNewUser = false;
  	$scope.identityProvider.login('password', {
  	  email: $scope.userEmail, 
  	  password: $scope.userPassword,
  	  rememberMe: true
    });
  };

});

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
