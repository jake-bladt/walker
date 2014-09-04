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
