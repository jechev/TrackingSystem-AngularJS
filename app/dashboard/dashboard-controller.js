angular.module('trackingSystem.dashboard',[])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/',{
            templateUrl:'app/dashboard/dashboard.html',
            controller:'DashboardController',
            authenticate: true
        })
    }])
    .controller('DashboardController',['$scope',
        '$location',
        'authentication',
        'issueService',
        'notifyService',
        function($scope, $location, authentication,issueService,notifyService) {
            $scope.auth=authentication;
        }]);