angular.module('trackingSystem.app-services.authentication', [])
    .factory('authentication', [
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q, BASE_URL) {

            function registerUser(user) {
                var deferred = $q.defer();

                $http.post(BASE_URL + 'Account/Register', user)
                    .then(function(response) {
                        loginUser(user);
                        deferred.resolve(response);
                    }, function(error) {

                    });

                return deferred.promise;
            }

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

            function logout() {
                delete sessionStorage['currentUserName'];
                delete sessionStorage['currentUserToken'];
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
                isLoggedIn:isLoggedIn
            }
        }]);