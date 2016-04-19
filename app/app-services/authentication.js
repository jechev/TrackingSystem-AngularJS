angular.module('trackingSystem.app-services.authentication', [])
    .factory('authentication', [
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q, BASE_URL) {

            function loginUser(user) {
                var data = "grant_type=password&username=" + user.email + "&password=" + user.password;

                var deferred = $q.defer();

                $http.post(BASE_URL + 'Token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                    .success(function (response) {
                        sessionStorage['currentUserName']=response.userName;
                        sessionStorage['currentUserToken']=response.access_token;
                        deferred.resolve(response);
                    }).error(function (err) {
                    deferred.reject(err);
                });

                return deferred.promise;
            }

            function registerUser(user) {
                var deferred = $q.defer();

                $http.post(BASE_URL + 'Account/Register', user)
                    .then(function(response) {
                        loginUser(user);
                        deferred.resolve(response);
                    }, function(error) {
                        deferred.reject(error)
                    });

                return deferred.promise;
            }

            function logout() {
                var deferred= $q.defer();
                var data='';
                $http.post(BASE_URL +'Account/Logout',data, { headers: { 'Authorization': 'Bearer ' +sessionStorage['currentUserToken'] } })
                    .success(function(response){
                        delete sessionStorage['currentUserName'];
                        delete sessionStorage['currentUserToken'];
                        deferred.resolve(response);
                }).error(function(err){
                        deferred.reject(err);
                });
                return deferred.promise;
            }

            function changePassword(data){
                var deferred=$q.defer();
                $http.post(BASE_URL +'Account/ChangePassword',data,{ headers: {'Authorization': 'Bearer ' +sessionStorage['currentUserToken'] } })
                    .success(function(response){
                        deferred.resolve(response);
                    })
                    .error(function(err){
                        deferred.reject(err);
                    });
                return deferred.promise;

            }
            function isAnonymous(){
                return sessionStorage['currentUserName']==undefined;
            }

            function isLoggedIn(){
                return sessionStorage['currentUserName']!=undefined;
            }

            return {
                registerUser: registerUser,
                loginUser: loginUser,
                logout: logout,
                isAnonymous:isAnonymous,
                isLoggedIn:isLoggedIn,
                changePassword:changePassword
            }
        }]);