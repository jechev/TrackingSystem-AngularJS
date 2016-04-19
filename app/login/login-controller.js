angular.module('trackingSystem.login',[])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/login',{
            templateUrl:'app/login/login.html',
            controller:'LoginController'
        })
    }])
    .controller('LoginController',['$scope',
        '$location',
        'authentication',
        'notifyService',
        function($scope, $location, authentication,notifyService) {
            $scope.login = function (user) {
                authentication.loginUser(user).then(
                function(success){
                    notifyService.notifySuccessMsg("Login successful");
                    $location.path("/");
                },
                function error(err){
                    notifyService.notifyErrorMsg("Login failed", err);
                });
            };
        }]);