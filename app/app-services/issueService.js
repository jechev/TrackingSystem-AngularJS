'use strict';
angular.module('trackingSystem.app-services.issueService',[])
    .factory('issueService',[
        '$http',
        '$q',
        'BASE_URL',
        'authentication',
        function($http, $q, BASE_URL,authentication){
            function getUserIssues(params){
                var deferred=$q.defer();
                $http.get(BASE_URL + 'issues/me?orderBy=DueDate desc, IssueKey&pageSize=' + params.pageSize + '&pageNumber=' + params.startPage
                    ,{headers :authentication.getAuthHeaders()})
                    .success(function(data){
                        deferred.resolve(data);
                    })
                    .error(function(err){
                        deferred.reject(err);
                    });
                return deferred.promise;
            }

            function getIssueById(id){
                var deferred=$q.defer();
                $http.get(BASE_URL + 'issues/'+id,{headers:authentication.getAuthHeaders()})
                    .success(function(issueData){
                        deferred.resolve(issueData);
                    })
                    .error(function(err){
                        deferred.reject(err);
                    });
                return deferred.promise;
            }

            function changeIssueStatus(issueId,statusId){
                var deferred=$q.defer();
                $http.put(BASE_URL + 'issues/'+issueId +'/changestatus?statusId='+statusId,"",{headers:authentication.getAuthHeaders()})
                    .success(function(issueData){
                        deferred.resolve(issueData);
                    })
                    .error(function(err){
                        deferred.reject(err);
                    });
                return deferred.promise;
            }

            return {
                getUserIssues:getUserIssues,
                getIssueById:getIssueById,
                changeIssueStatus:changeIssueStatus
            }
        }]);
