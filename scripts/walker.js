var app = angular.module('walkerApp', ['firebase']);
app.firebaseRef = new Firebase("https://blinding-torch-3484.firebaseio.com/");

app.getUserHive = function(user) {
  var usersHive = app.firebaseRef.child('users');
  return usersHive.child(user.uid);
};
