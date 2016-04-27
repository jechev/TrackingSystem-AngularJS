angular.module('trackingSystem.app-services.authentication', [])
    .factory('authentication', [
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q, BASE_URL) {

            function getAuthHeaders(){
                var headers={};
                if (sessionStorage['currentUserToken'] !=undefined){
                    headers['Authorization']='Bearer '+sessionStorage['currentUserToken'];
                }
                return headers;
            }

            function loginUser(user) {
                var data = "grant_type=password&username=" + user.email + "&password=" + user.password;

                var deferred = $q.defer();

                $http.post(BASE_URL + 'api/Token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                    .success(function (response) {
                        sessionStorage['currentUserToken']=response.access_token;
                        getCurrentUserInfo();
                        deferred.resolve(response);
                    }).error(function (err) {
                    deferred.reject(err);
                });

                return deferred.promise;
            }

            function registerUser(user) {
                var deferred = $q.defer();

                $http.post(BASE_URL + 'api/Account/Register', user)
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
                $http.post(BASE_URL +'api/Account/Logout',data, { headers: this.getAuthHeaders()})
                    .success(function(response){
                        delete sessionStorage['currentUserToken'];
                        delete sessionStorage['currentUser'];
                        deferred.resolve(response);
                }).error(function(err){
                        deferred.reject(err);
                });
                return deferred.promise;
            }

            function changePassword(data){
                var deferred=$q.defer();
                $http.post(BASE_URL +'api/Account/ChangePassword',data,{ headers: this.getAuthHeaders()})
                    .success(function(response){
                        deferred.resolve(response);
                    })
                    .error(function(err){
                        deferred.reject(err);
                    });
                return deferred.promise;

            }
            function isAnonymous(){
                return sessionStorage['currentUserToken']==undefined;
            }

            function isLoggedIn(){
                return sessionStorage['currentUserToken']!=undefined;
            }

            function isNormalUser(){

            }

            function getCurrentUserInfo(){
                var deferred=$q.defer();

                $http.get(BASE_URL +'users/me',{headers:getAuthHeaders()})
                    .success(function(userData){
                        var data=JSON.stringify(userData);
                        sessionStorage['currentUser']=data;
                        deferred.resolve(userData);
                    })
                    .error(function(err){
                        deferred.reject(err);
                    });
                return deferred.promise;
            }

            function getCurrentUser(){
                var userObject=sessionStorage['currentUser'];
                if(userObject){
                    return JSON.parse(sessionStorage['currentUser']);
                }
            }

            function isNormalUser(){
                var currentUser=this.getCurrentUser();
                return (currentUser !=undefined) && (!currentUser.isAdmin);
            }

            function isAdmin() {
                var currentUser=this.getCurrentUser();
                return (currentUser !=undefined) && (currentUser.isAdmin);
            }

            return {
                registerUser: registerUser,
                loginUser: loginUser,
                logout: logout,
                isAnonymous:isAnonymous,
                isLoggedIn:isLoggedIn,
                changePassword:changePassword,
                getAuthHeaders:getAuthHeaders,
                getCurrentUserInfo:getCurrentUserInfo,
                getCurrentUser:getCurrentUser,
                isNormalUser:isNormalUser,
                isAdmin:isAdmin
            }
        }]);