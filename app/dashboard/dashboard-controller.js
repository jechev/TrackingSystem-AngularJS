angular.module('trackingSystem.dashboard',[])
    .controller('DashboardController',['$scope',
        '$location',
        'authentication',
        'issueService',
        'notifyService',
        'PAGE_SIZE',
        function($scope, $location, authentication,issueService,notifyService,PAGE_SIZE) {
            $scope.auth=authentication;
            $scope.issuesParams = {
                'startPage': 1,
                'pageSize': PAGE_SIZE
            };
            $scope.predicate = 'DueDate';
            $scope.reverse = true;
            $scope.order = function (predicate) {
                $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
                $scope.predicate = predicate;
            };

            $scope.getIssues = function () {
                if (authentication.isLoggedIn()) {
                    issueService.getUserIssues($scope.issuesParams).then(
                        function success(data){
                            $scope.issues=data.Issues;
                            $scope.allIssues = data.TotalPages * $scope.issuesParams.pageSize;
                        },
                        function error(err){
                            notifyService.notifyErrorMsg("Failed loading data...", err);
                        }
                    );
                }
            };
            $scope.getIssues();

            $scope.viewProject = function (id) {
                $location.path('/projects/' + id);
            };

            $scope.viewIssue = function (id) {
                $location.path('/issues/' + id);
            }
        }]);