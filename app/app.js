'use strict';

// Declare app level module which depends on views, and components
angular.module('trackingSystem', [
  'ngRoute',
  'validation.match',
  'trackingSystem.home',
   'trackingSystem.users.authentication'
])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.otherwise({redirectTo: '/'});
    }])
    .constant('BASE_URL',' http://softuni-issue-tracker.azurewebsites.net/api/');
