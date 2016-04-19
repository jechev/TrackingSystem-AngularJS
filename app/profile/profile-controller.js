angular.module('trackingSystem.profile',[])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/profile/password',{
            templateUrl:'app/profile/change-password.html',
            controller:'ProfileController'
        })
    }])
    .controller('ProfileController',['$scope',
        '$location',
        'authentication',
        'notifyService',
        function($scope, $location, authentication,notifyService) {
            $scope.changePassword = function (passwordData) {
                authentication.changePassword(passwordData).then(
                    function(success){
                        notifyService.notifySuccessMsg("Password changed successfully");
                        $location.path("/");
                    },
                    function error(err){
                        notifyService.notifyErrorMsg("Password change failed", err);
                    });
            };
        }]);