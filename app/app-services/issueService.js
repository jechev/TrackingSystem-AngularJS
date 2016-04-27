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

            return {
                getUserIssues:getUserIssues
            }
        }]);