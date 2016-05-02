angular.module('trackingSystem.issue-details',[])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/issues/:id',{
            templateUrl:'app/issue-details/issue-details.html',
            controller:'IssueDetailsController'
        })
    }])
    .controller('IssueDetailsController',['$scope',
        '$location',
        'authentication',
        'issueService',
        'notifyService',
        '$routeParams',
        function($scope, $location, authentication,issueService,notifyService,$routeParams) {
            var currentUserData=JSON.parse(sessionStorage['currentUser']);
            var currentUserName=currentUserData.Username;

            $scope.isAssignee=false;
            $scope.isLeader=false;
            $scope.getIssueDetails=function(){
                if (authentication.isLoggedIn()) {
                    issueService.getIssueById($routeParams.id).then(
                        function success(issueData){
                            var assigneeUsername=issueData.Assignee.Username;
                            var leaderUsername=issueData.Author.Username;
                            if(currentUserName ===assigneeUsername){
                                $scope.isAssignee=true;
                            }
                            if(currentUserName==leaderUsername){
                                $scope.isLeader=true;
                            }
                            $scope.issueDetails=issueData;
                            $scope.labels=issueData.Labels;
                            console.log(issueData.Labels);
                            console.log(issueData);
                            console.log($scope.labels);
                        },
                        function error(err){
                            notifyService.notifyErrorMsg("Failed loading data...", err);
                        }
                    )
                }
            };
            $scope.getIssueDetails();
        }]);