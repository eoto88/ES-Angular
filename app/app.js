'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
    'firebase'
])
.config(['$locationProvider', '$routeProvider', '$firebaseRefProvider', function($locationProvider, $routeProvider, $firebaseRefProvider) {
  $locationProvider.hashPrefix('');

  $routeProvider.otherwise({redirectTo: '/view1'});

  var config = {
    apiKey: "AIzaSyAb1_vidBV9aasR1F6tCK2KYUlucaCzH-0",
    authDomain: "ecosystems-23aa2.firebaseapp.com",
    databaseURL: "https://ecosystems-23aa2.firebaseio.com",
    storageBucket: "ecosystems-23aa2.appspot.com",
    messagingSenderId: "175616621394"
  };
  firebase.initializeApp(config);

    $firebaseRefProvider.registerUrl({
        default: config.databaseURL,
        users: `${config.databaseURL}/users`
    });
}])
.factory('Auth', ['$firebaseAuth', function($firebaseAuth) {
    return $firebaseAuth();
}])
.controller("LoginCtrl", ["$scope", "Auth", function($scope, Auth) {
    $scope.auth = Auth;
    // $scope.auth.$onAuth(function(authData) {
    //     $scope.authData = authData;
    // });
    $scope.login = function() {
        debugger;
        Auth.$signInWithEmailAndPassword({
            email: $scope.email,
            password: $scope.password
        })
            .then(function(authData) {
                console.log('Logged in as:', authData.uid);
                //$state.go('profile');
            })
            .catch(function(err) {
                console.log('error:',err);
                //$state.go('login');
            });
    };
}]);
