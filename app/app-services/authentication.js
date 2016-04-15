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
                    .then(function (response) {
                        sessionStorage['currentUserName']=JSON.stringify(response.data.userName);
                        sessionStorage['currentUserToken']=JSON.stringify(response.data.access_token);
                    deferred.resolve(response);

                    },function (err) {

                    });

                return deferred.promise;
            }

            function logout() {

            }

            return {
                registerUser: registerUser,
                loginUser: loginUser,
                logout: logout
            }
        }]);