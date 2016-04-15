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
        function($scope, $location, authentication) {

    }]);