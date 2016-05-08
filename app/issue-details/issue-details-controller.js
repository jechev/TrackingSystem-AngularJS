'use strict';
angular.module('trackingSystem.issue-details',[])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/issues/:id',{
            templateUrl:'app/issue-details/issue-details.html',
            controller:'IssueDetailsController',
            access: {
                requiresLogin: true
            }
        })
    }])
    .controller('IssueDetailsController',['$scope',
        '$location',
        'authentication',
        'issueService',
        'notifyService',
        '$routeParams',
        'commentService',
        function($scope, $location, authentication,issueService,notifyService,$routeParams,commentService) {
            var currentUserData=JSON.parse(sessionStorage['currentUser']);
            var currentUserName=currentUserData.Username;
            $scope.auth=authentication;
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
                            if(currentUserName===leaderUsername){
                                $scope.isLeader=true;
                            }
                            $scope.issueDetails=issueData;
                            $scope.labels=issueData.Labels;
                        },
                        function error(err){
                            notifyService.notifyErrorMsg("Failed loading data...", err);
                        }
                    )
                }
            };
            $scope.changeStatus = function(statusId) {
                issueService.changeIssueStatus($routeParams.id,statusId).then(
                    function success(data) {
                        issueService.getIssueById($routeParams.id).then(
                            function success(issueData){
                                $scope.issueDetails.Status=issueData.Status;
                            },
                            function error(err){
                                notifyService.notifyErrorMsg(err.Message, err)
                            }
                        )
                    }, function error(err) {
                        notifyService.notifyErrorMsg(err.Message, err);
                    }
                );
            };

            $scope.getComments=function(){
                commentService.getCommentsForIssueById($routeParams.id).then(
                    function success(commentsData){
                        $scope.comments=commentsData;
                    },
                    function error(err){
                        notifyService.notifyErrorMsg(err.Message, err);
                    }
                )
            };

            $scope.addComment=function(text){
                commentService.addCommentForIssueById($routeParams.id,text).then(
                    function success(newComment){
                        $scope.getComments();
                    },
                    function error(err){
                        notifyService.notifyErrorMsg(err.Message, err);
                    }
                )
            };

            $scope.getIssueDetails();
            $scope.getComments();
            $scope.viewProject = function (id) {
                $location.path('/projects/' + id);
            };
        }]);