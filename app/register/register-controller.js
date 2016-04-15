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
        function($scope, $location, authentication) {
            $scope.register = function (user) {
                authentication.registerUser(user)
                    .then(function(registeredUser) {
                        console.log(registeredUser);
                    });
            };
        }]);