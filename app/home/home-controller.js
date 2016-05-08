'use strict';
angular.module('trackingSystem.home',[])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/',{
            templateUrl:'app/home/home.html',
            controller:'HomeController'
        })
    }])
    .controller('HomeController',['$scope',
        '$location',
        'authentication',
        'notifyService',
        function($scope, $location, authentication,notifyService) {
            $scope.auth=authentication;
            $scope.logout=function(){
                authentication.logout().then(
                    function(success){
                        notifyService.notifySuccessMsg("Logout successful");
                        $location.path("/");
                    },
                    function(err){
                        notifyService.notifyErrorMsg("Logout failed", err);
                    }
                )
            }
    }]);