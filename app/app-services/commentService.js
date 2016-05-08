'use strict';

angular.module('trackingSystem.app-services.commentService',[])
    .factory('commentService',[
        '$http',
        '$q',
        'BASE_URL',
        'authentication',
        function($http, $q, BASE_URL,authentication){
            function getCommentsForIssueById(id){
                var deferred=$q.defer();
                $http.get(BASE_URL + 'issues/' + id +'/comments',{headers:authentication.getAuthHeaders()})
                    .success(function(data){
                        deferred.resolve(data);
                    })
                    .error(function(err){
                        deferred.reject(err);
                    });
                return  deferred.promise;
            }

            function addCommentForIssueById(id,data){
                var deferred=$q.defer();
                $http.post(BASE_URL + 'issues/'+id+'/comments',data,{headers:authentication.getAuthHeaders()})
                    .success(function(data){
                        deferred.resolve(data);
                    })
                    .error(function(err){
                        deferred.reject(err);
                    });
                return  deferred.promise;
            }

            return {
                getCommentsForIssueById:getCommentsForIssueById,
                addCommentForIssueById:addCommentForIssueById
            }
        }]);
