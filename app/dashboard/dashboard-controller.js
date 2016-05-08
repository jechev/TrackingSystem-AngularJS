angular.module('trackingSystem.dashboard',[])
    .controller('DashboardController',['$scope',
        '$location',
        'authentication',
        'issueService',
        'notifyService',
        'PAGE_SIZE',
        'projectService',
        function($scope, $location, authentication,issueService,notifyService,PAGE_SIZE,projectService) {
            $scope.auth=authentication;
            $scope.issuesParams = {
                'startPage': 1,
                'pageSize': PAGE_SIZE
            };
            var userInfo=authentication.getCurrentUser();
            var userId=userInfo.Id;
            $scope.predicate = 'DueDate';
            $scope.reverse = true;
            $scope.order = function (predicate) {
                $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
                $scope.predicate = predicate;
            };
            
            $scope.projectParams = {
                'startPage': 1,
                'pageSize': PAGE_SIZE
            };
            $scope.predicateProjects = 'Name';
            $scope.reverseProjects = true;
            $scope.orderProjects = function (predicate) {
                $scope.reverseProjects = ($scope.predicateProjects === predicate) ? !$scope.reverseProjects : false;
                $scope.predicateProjects = predicate;
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
            $scope.getOwnProjects=function () {
                if(userId){ projectService.getAllProjectsByLeadId(userId,$scope.projectParams).then(
                    function success(data) {
                        $scope.ownProjects=data.Projects;
                        $scope.allProjects=data.TotalPages * $scope.projectParams.pageSize;
                    },
                    function error(err){
                        notifyService.notifyErrorMsg("Failed loading data...", err);
                    }
                )}
            };
            $scope.viewProject = function (id) {
                $location.path('/projects/' + id);
            };

            $scope.viewIssue = function (id) {
                $location.path('/issues/' + id);
            }
        }]);