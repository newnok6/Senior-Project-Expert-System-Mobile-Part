'use strict'

/**
 * Controllers
 * @constructor
 */
angular.module('drugExpertSystem.userController', [])

.controller('userCtrl', ['$scope', '$rootScope', '$location', 'userService', '$state', '$ionicModal', '$ionicPopup','$ionicLoading','$timeout',

    function($scope, $rootScope, $location, userService, $state, $ionicModal, $ionicPopup,$ionicLoading,$timeout) {
        // reset login status
        //AuthenticationService.ClearCredentials();
        $scope.loginUser = {email:'',password:''};
        $scope.user = {
            type: 'General Phamacist'
        };


        // $scope.oldPass = '';
        $scope.currentUser = {};
        $scope.currentUser = userService.getCurrentUser();

        $scope.login = function() {


            var success = function(response) {
                $state.go('base.content');
            }


            var error = function(error) {
                console.log('error');
            }

            userService.login($scope.loginUser).then(success, error);

            // // $scope.dataLoading = true;
            // // AuthenticationService.Login($scope.username, $scope.password, function(response) {
            //      if(response.success) {
            //          AuthenticationService.SetCredentials($scope.username, $scope.password);
            //          $location.path('/');
            //      } else {
            //          $scope.error = response.message;
            //          $scope.dataLoading = false;
            //      }
            //  });
        };


        $scope.logout = function() {
            userService.resetCookie();
            $state.go('signin');
        }

        // Show the Formulation Type list //
        $ionicModal.fromTemplateUrl('registrationModal.html', {
            id: 1,
            scope: $scope
        }).then(function(modal) {
            $scope.oModal1 = modal;
        });

        // Show Change User Status Modal //
        $ionicModal.fromTemplateUrl('changeUserStatus.html', {
            id: 2,
            scope: $scope
        }).then(function(modal) {
            $scope.oModal2 = modal;
        });

        // Show Change Password Modal //
        $ionicModal.fromTemplateUrl('changeUserPasswodModal.html', {
            id: 3,
            scope: $scope
        }).then(function(modal) {
            $scope.oModal3 = modal;
        });

        $scope.openModal = function(index) {
            if (index == 1) {
                $scope.oModal1.show();
            } else if (index == 2) {
                $scope.oModal2.show();
            } else if (index == 3) {
                $scope.oModal3.show();
            }
        }

        // hide the model
        $scope.hideModal = function(index) {
            if (index == 1) {
                $scope.oModal1.hide();
            } else if (index == 2) {
                $scope.oModal2.hide();
            } else if (index == 3) {
                $scope.oModal3.hide();
            }
        }


        // Update Loading screen Result //
        $scope.updateLoading = function(msg) {
            $ionicLoading.show({
                template: msg
            });

            $timeout(function() {
                $ionicLoading.hide();
                $scope.hideModal(3);
            }, 2000);
        }

        // Update User Password Function //
        $scope.updateUserPassword = function(newPass) {
            $ionicLoading.show({
                template: 'Updating profile...'
            });

            var success = function() {
                $ionicLoading.hide();
                $scope.updateLoading("Update successful");
                
            }

            var error = function() {
                $scope.updateLoading("Error!, can not update user password");
            }

            $scope.currentUser.password = newPass;
            userService.updatePassword($scope.currentUser).then(success, error);
        }

        // Show Confirm for updating a password
        $scope.showConfirmToChangePass = function(oldPass, newPass) {
            //
            if (oldPass != $scope.currentUser.password) {
                console.log(oldPass);
                var alertPopup = $ionicPopup.alert({
                    title: 'Your old password is not correct',
                    template: 'Please input your old password again'
                });
                alertPopup.then(function(res) {
                    console.log('The user input password again');
                })
            } else {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Update Password',
                    template: 'Are you sure to update your password?'
                });
                confirmPopup.then(function(res) {
                    if (res) {
                        $scope.updateUserPassword(newPass);
                    } else {
                        console.log('You are not sure');
                    }
                });
            }


        }


        // Show Popup "Yes", "No" option for confirming to delete //
        $scope.showConfirmTodelete = function() {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Delete Member Account',
                template: 'Are you sure you want to delate this user account?'
            });
            confirmPopup.then(function(res) {
                if (res) {
                    console.log('You are sure');
                } else {
                    console.log('You are not sure');
                }
            });
        };

        $scope.showPopup = function() {
            $scope.data = {}

            // An elaborate, custom popup
            $scope.data = {}

            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<input type="password" ng-model="data.wifi">',
                title: 'Enter Your New Password',
                subTitle: 'Please Use the charater with number',
                scope: $scope,
                buttons: [{
                    text: 'Cancel'
                }, {
                    text: '<b>Save</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        if (!$scope.data.wifi) {
                            //don't allow the user to close unless he enters wifi password
                            e.preventDefault();
                        } else {
                            return $scope.data.wifi;
                        }
                    }
                }, ]
            });
        };

        $scope.createAccount = function() {
            userService.createAccount($scope.user);
        };




        $scope.updateAccount = function() {

        };

        $scope.deleteAccount = function() {
            userService.updateAccount($scope.user)
        };

        $scope.getAllAccount = function() {

        }
    }
]);
