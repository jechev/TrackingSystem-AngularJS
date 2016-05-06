'use strict';
angular.module('trackingSystem.projects',[])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/projects',{
            templateUrl:'app/projects/projects.html',
            controller:'ProjectsController',
            access: {
                requiresAdmin: true
            }
        })
    }])
    .controller('ProjectsController',['$scope',
        '$location',
        'authentication',
        'projectService',
        'notifyService',
        function($scope, $location, authentication,projectService,notifyService) {
            $scope.projectsParams = {
                'startPage': 1,
                'pageSize': 15
            };
            $scope.predicate = 'Lead.Username';
            $scope.reverse = true;
            $scope.order = function (predicate) {
                $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
                $scope.predicate = predicate;
            };

            $scope.getProjects = function () {
                if(authentication.isAdmin){
                    projectService.getAllProjects($scope.projectsParams).then(
                        function success(data){
                            $scope.projects=data.Projects;
                            $scope.allProjects = data.TotalPages * $scope.projectsParams.pageSize;
                        },
                        function error(err){
                            notifyService.notifyErrorMsg("Failed loading data...", err);
                        }
                    );
                }

            };
            $scope.getProjects();

            $scope.viewProject=function (id) {
                $location.path('/projects/'+id);
            };
            
            $scope.editProject = function(id) {
                $location.path('/projects/'+id+'/edit');
            };
            $scope.addIssue=function (id) {
                $location.path('/projects/'+id+'/add-issue');
            }
        }]);