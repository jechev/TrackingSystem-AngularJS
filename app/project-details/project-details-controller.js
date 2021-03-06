'use strict';
angular.module('trackingSystem.project-details',[])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/projects/:id',{
            templateUrl:'app/project-details/project-details.html',
            controller:'ProjectDetailsController',
            access: {
                requiresLogin: true
            }
        })
    }])
    .controller('ProjectDetailsController',['$scope',
        '$location',
        'authentication',
        'projectService',
        'notifyService',
        '$routeParams',
        function($scope, $location, authentication,projectService,notifyService,$routeParams) {
            var currentUserData=JSON.parse(sessionStorage['currentUser']);
            var currentUserName=currentUserData.Username;
            $scope.auth=authentication;
            $scope.isAssignee=false;
            $scope.isLeader=false;
            $scope.getProjectDetails=function(){
                if (authentication.isLoggedIn()) {
                    projectService.getProjectById($routeParams.id).then(
                        function success(projectData){
                            var leaderUsername=projectData.Lead.Username;
                            if(currentUserName===leaderUsername){
                                $scope.isLeader=true;
                            }
                            $scope.projectDetails=projectData;
                            $scope.labels=projectData.Labels;
                            $scope.priorities=projectData.Priorities;
                        },
                        function error(err){
                            notifyService.notifyErrorMsg("Failed loading data...", err);
                        }
                    )
                }
            };

            $scope.predicate = 'DueDate';
            $scope.reverse = true;
            $scope.order = function (predicate) {
                $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
                $scope.predicate = predicate;
            };

            $scope.getProjectIssues=function(){
                if(authentication.isLoggedIn()){
                    projectService.getProjectIssues($routeParams.id).then(
                        function success(issuesData){
                            $scope.issues=issuesData;
                        },
                        function error(err){
                            notifyService.notifyErrorMsg("Failed loading data...", err);
                        }
                    )
                }
            };
            $scope.getProjectDetails();
            $scope.getProjectIssues();
            $scope.viewIssue = function(id) {
                $location.path("issues/" + id);
            };
            $scope.editProject=function (id) {
                $location.path('projects/'+id+'/edit');
            }
        }]);