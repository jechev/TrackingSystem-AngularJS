'use strict';

angular.module('trackingSystem.app-services.projectService',[])
    .factory('projectService',[
        '$http',
        '$q',
        'BASE_URL',
        'authentication',
        function($http, $q, BASE_URL,authentication){
            function getProjectById(id){
                var deferred=$q.defer();
                $http.get(BASE_URL + 'projects/'+id,{headers:authentication.getAuthHeaders()})
                    .success(function(projectData){
                        deferred.resolve(projectData);
                    })
                    .error(function(err){
                        deferred.reject(err);
                    });
                return deferred.promise;
            }

            function getProjectIssues(id){
                var deferred=$q.defer();
                $http.get(BASE_URL + 'projects/'+id+'/issues',{headers:authentication.getAuthHeaders()})
                    .success(function(issuesData){
                        deferred.resolve(issuesData);
                    })
                    .error(function(err){
                        deferred.reject(err);
                    });
                return deferred.promise;
            }

            function editProject(id,data) {
                var deferred=$q.defer();
                $http.put(BASE_URL + 'projects/'+id+'/edit',data,{headers:authentication.getAuthHeaders()})
                    .success(function (data) {
                        deferred.resolve(data)
                    })
                    .error(function (err) {
                        deferred.reject(err);
                    });
                return deferred.promise;
            }

            function getAllProjects(params) {
                var deferred=$q.defer();
                $http.get(BASE_URL +'projects?filter=&pageSize='+params.pageSize+'&pageNumber='+params.startPage,{headers:authentication.getAuthHeaders()})
                    .success(function (data) {
                        deferred.resolve(data);
                    }).error(function (err) {
                        deferred.reject(err);
                });
                return deferred.promise;
            }

            return {
                getProjectById:getProjectById,
                getProjectIssues:getProjectIssues,
                editProject:editProject,
                getAllProjects:getAllProjects
            }
        }]);
