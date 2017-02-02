'use strict';

angular.module('myApp.view1', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$firebaseObject', function($firebaseObject) {
  const rootRef = firebase.database().ref().child('users');
  const ref = rootRef.child('admin');
  var obj = $firebaseObject(ref);

    obj.$loaded().then(function() {
        console.log("loaded record:", obj.$id);

        // To iterate the key/value pairs of the object, use angular.forEach()
        angular.forEach(obj, function(value, key) {
            console.log(key, value);
        });
    });

    this.object = obj;
}]);