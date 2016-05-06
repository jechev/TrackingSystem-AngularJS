'use strict';

// Declare app level module which depends on views, and components
angular.module('trackingSystem', [
    'ngRoute',
    'ui.bootstrap.pagination',
    'validation.match',
    'trackingSystem.home',
    'trackingSystem.app-services.authentication',
    'trackingSystem.app-services.notifyService',
    'trackingSystem.app-services.issueService',
    'trackingSystem.app-services.projectService',
    'trackingSystem.login',
    'trackingSystem.register',
    'trackingSystem.profile',
    'trackingSystem.dashboard',
    'trackingSystem.issue-details',
    'trackingSystem.project-details',
    'trackingSystem.project-edit',
    'trackingSystem.projects',
    'trackingSystem.app-directives.issues-statues',
    'trackingSystem.app-directives.issues-view'
])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.otherwise({redirectTo: '/'});
    }])
    .constant('BASE_URL',' http://softuni-issue-tracker.azurewebsites.net/')
    .constant('PAGE_SIZE',5)
    .run(function ($rootScope, $location, authentication) {
      $rootScope.$on('$routeChangeStart', function (event, next) {
        if (next.access.requiresAnonymous && authentication.isLoggedIn()) {
          $location.path('/');
        }
    
        if (next.access.requiresLogin && !authentication.isLoggedIn()) {
          $location.path('/');
        }
    
        if (next.access.requiresAdmin && !authentication.isAdmin()) {
          $location.path('/');
        }
      });
    });
