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
        function($scope, $location, authentication) {
            $scope.login = function (user) {
                user.grant_type='password';
                authentication.loginUser(user)
                    .then(function(loggedInUser){
                        console.log(loggedInUser);
                    });
            };
        }]);