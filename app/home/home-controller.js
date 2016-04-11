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
            $scope.login = function (user) {
                user.grant_type='password';
                authentication.loginUser(user)
                    .then(function(loggedInUser){
                        console.log(loggedInUser);
                    });
            };

            $scope.register = function (user) {

                console.log(user);
                authentication.registerUser(user)
                    .then(function(registeredUser) {
                        console.log(registeredUser);
                    });
            };
    }]);