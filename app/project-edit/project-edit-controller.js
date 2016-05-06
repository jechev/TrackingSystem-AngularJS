'use strict';
angular.module('trackingSystem.project-edit',[])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/projects/:id/edit',{
            templateUrl:'app/project-edit/project-edit.html',
            controller:'ProjectEditController',
            access: {
                requiresLogin: true
            }
        })
    }])
    .controller('ProjectEditController',['$scope',
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
            $scope.editProject=function (id,data) {
                if($scope.isLeader){
                    projectService.editProject($routeParams.id,data).then(
                        function (success) {
                            notifyService.notifySuccessMsg("Login successful");
                            $location.path("/projects/"+$routeParams.id);
                        },
                        function (error) {
                            notifyService.notifyErrorMsg("Edit project failed!",error);
                        }
                    )
                }
            };
            $scope.getProjectDetails();
        }]);