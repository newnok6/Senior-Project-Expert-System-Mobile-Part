angular.module('services.common.auth', ['services.models.user', 'ngCordova.plugins.localStorage'])

.service('userService', ['$http', '$rootScope', '$timeout', '$q', '$cookieStore', '$cordovaLocalStorage',
            function($http, $rootScope, $timeout, $q, $cookieStore, $cordovaLocalStorage) {

                var auth = {
                    // CAMT Server Path = http://54.169.76.170:8080/oegp
                    // Local Host Path = http://localhost:8081
                  
                    var serverPath = 'http://localhost:8081';
                    
                    currentUser: {},

                    init: function() {
                        var self = this;
                        //set the session token in the http header
                        // $http.defaults.headers.common['X-Access-Token'] = $cookieStore.get('sessionToken') || "";
                        // $cookieStore.put('app_user','newnok6');
                        var userData = $cookieStore.get('app_user') || {
                            email: '',
                            password: '',
                            type: ''
                        };

                        //quick check to make sure it's a string ()
                        if (typeof(userData) === "string") {
                            userData = JSON.parse(userData);
                        }
                        // // setting currentUser
                        // console.log(userData);
                        self.currentUser = userData;
                        console.log(self.currentUser);

                    },

                    updateUser: function(user, options) {

                        var opts = {
                            remove: false,
                            set: false
                        }

                        angular.extend(opts, options);
                        angular.extend(self.currentUser, user);

                        if (opts.remove === true) {
                            $cordovaLocalStorage.removeItem('app_user');
                        }

                        if (opts.set === true) {
                            $cordovaLocalStorage.setItem('app_user', JSON.stringify(self.currentUser));
                        }
                    },

                    isLoggedIn: function() {

                        var output = false;
                        console.log(self.currentUser);
                        if (self.currentUser.id) {
                            output = true;
                        }



                        return output;
                    },




                    login: function(userData, provider) {

                        var deferred = $q.defer();

                        var success = function(response, status, headers, config) {
                            var user = response.user;
                            var token = response.token;


                            var opts = {
                                remove: false,
                                set: true
                            }

                            //angular.extend(opts);
                            angular.extend(self.currentUser, user);

                            if (opts.remove === true) {
                                $cookieStore.remove('app_user');
                            }

                            if (opts.set === true) {
                                console.log(user);
                                $cookieStore.getItem('app_user', user);

                            }

                            //set token on success
                            $http.defaults.headers.common['X-Access-Token'] = token;
                            $cookieStore.get('sessionToken', token);

                            console.log($cookieStore.get('app_user'));

                            deferred.resolve(self.currentUser);
                        }

                        var error = function(error, status, headers, config) {

                            console.log("AuthService.error callback function ");
                            console.log(error);


                            deferred.reject(error);
                        }

                        $http.post(serverPath + '/user/login', data).success(success).error(error);
                        return deferred.promise;
                    },

                    logout: function() {
                            var self = this;
                            var deferred = $q.defer();

                            var success = function(response, status, headers, config) {
                                self.resetCookie();
                                deferred.resolve(response.payload);
                            }

                            var error = function(error, status, headers, config) {
                                if (error.status === 400) {
                                    self.resetCookie();
                                }
                                deferred.reject(error);
                            }

                            $http.get(Constants.API.baseUrl + '/logout').success(success).error(error);

                            return deferred.promise;
                        },

                        user.resetCookie = function() {

                            $cordovaLocalStorage.removeItem('sessionToken');
                            $http.defaults.headers.common['X-Access-Token'] = "";

                            var opts = {
                                remove: true,
                                set: false
                            }

                            var user = {
                                email: '',
                                password: '',
                                type: ''
                            };
                            angular.extend(self.currentUser, user);

                            if (opts.remove === true) {
                                $cookieStore.remove('app_user');
                            }
                        }


                    return auth;

                }
            ])
