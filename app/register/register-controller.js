angular.module('trackingSystem.register',[])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/register',{
            templateUrl:'app/register/register.html',
            controller:'RegisterController'
        })
    }])
    .controller('RegisterController',['$scope',
        '$location',
        'authentication',
        'notifyService',
        function($scope, $location, authentication,notifyService) {
            $scope.register = function (user) {
                authentication.registerUser(user)
                    .then(function(success){
                            notifyService.notifySuccessMsg("Register successful");
                            $location.path("/");
                        },
                        function error(err){
                            notifyService.notifyErrorMsg("Register failed", err);
                        });
            };
        }]);