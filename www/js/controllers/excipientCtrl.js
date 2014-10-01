'use strict';
/**
 * Controllers
 * @constructor
 */
angular.module('drugExpertSystem.excipientController', [])
// Excipient Controller//
.controller('excipientCtrl', ['$scope', '$timeout', '$state', 'substanceService', 'excipientService', 'substanceFnService', '$ionicModal', '$ionicPopup', '$ionicSlideBoxDelegate', '$ionicPopover', '$ionicLoading', '$ionicViewService',
    function($scope, $timeout, $state, substanceService, excipientService, substanceFnService, $ionicModal, $ionicPopup, $ionicSlideBoxDelegate, $ionicPopover, $ionicLoading, $ionicViewService) {

        $scope.setkey = '';
        $scope.excipients = {};
        //$scope.excipientInlist = excipientService.getCurrentExcipientlist();
        $scope.setSubstanceFunctions = [];
        $scope.currentExcipient = {
            substanceFunctions: '',
            usedWeight: '',
            minWeight: '',
            maxWeight: ''
        };
        $scope.orig = angular.copy($scope.currentExcipient);
        $scope.currentExcipient.substanceFunctions = substanceFnService.getCurrentSubstanceFnlist();
        //$scope.orig = angular.copy($scope.currentExcipient);
        $scope.substances = {};
        $scope.searchSubstance = '';
        $scope.excipientSelected = {};


        //Get the excipient list form the service //
        excipientService.getExcipientList().success(function(response) {
            $scope.excipients = response;
            console.log($scope.excipients);
        });

        // Get the substance list from the service //
        substanceService.getSubstanceList().success(function(response) {
            $scope.substances = response;
            console.log($scope.substances);
        });



        /*
        $scope.addExcipientToFormulation = function(currentExcipient) {
            excipientService.setExcipientToList(currentExcipient);
            console.log($scope.currentExcipient);
            $scope.hideModal(5);
        }
        */

        // Set Selected Excipient that select from the excipient list //
        $scope.setSelectedExcipient = function(getValue) {
            $scope.excipientSelected = getValue;
            //$scope.origSelectedSubstance = angular.copy($scope.substanceSelected);
            $state.go('base.excipientContent.excipientDetail');

        }

        $scope.goEditExcipient = function() {
            $scope.closePopover();
            $scope.reset();
            $scope.currentExcipient = $scope.excipientSelected;
            angular.forEach($scope.excipientSelected.substanceFunctions, function(value, key) {
                substanceFnService.setSunstanceFn(value);
            })
            $ionicLoading.show({
                template: '<i class="icon ion-loading-c"></i>',
                showDelay: 5 // If the delay is too fast and you also change states, while the loader is showing, you can get flashing behavior
            });

            // Hide the loadingIndicator 1500 ms later
            $timeout(function() {
                $ionicLoading.hide();
            }, 1500);

            // 500 ms after showing the loadingIndicator, do a state change.  The idea is that when the loader is hidden, you will be in the new state.  But as you'll see there is flashing.
            $timeout(function() {
                $state.go('base.excipientContent.updateExcipient');
            }, 500);
        }

        /*
        //Excipient Modal//
        $ionicModal.fromTemplateUrl('excipientModal.html', {
            id: 5,
            scope: $scope
        }).then(function(modal) {
            $scope.oModal5 = modal;
        });

        //Open the model//
        $scope.openModal = function(index) {
            if (index == 5)
                $ionicSlideBoxDelegate.slide(0);
            $scope.oModal5.show();

            //$state.go('excipientModal.html', {}, {
            //reload: true,
            //inherit: false
            // });
        }
*/
        // hide the model
        // $scope.hideModal = function(index) {
        // if (index == 5)
        //   $scope.currentExcipient = angular.copy($scope.orig);
        //$scope.oModal5.hide();

        //  }
        /*
        $scope.filter = function(key) {
            var set = [];
            set = $scope.excipients[key];
            $scope.currentExcipient.minWeight = set.minWeight;
            $scope.currentExcipient.maxWeight = set.maxWeight;
            $scope.currentExcipient.usedWeight = set.usedWeight;
            $scope.currentExcipient.substanceFunctions = $scope.setSubstanceFunctions;
            console.log($scope.currentExcipient);
            console.log(set);
            return set;

        }



        $scope.next = function(getkey) {
            $scope.setkey = getkey;
            $ionicSlideBoxDelegate.next();
        };

*/
        //Reset the Current Solubility After adding//
        $scope.reset = function() {
            substanceFnService.resetsSubstanceFn();
            $scope.currentExcipient = angular.copy($scope.orig);
            $scope.currentExcipient.substanceFunctions = substanceFnService.getCurrentSubstanceFnlist();
        };




        //Substance Option such "edit" or "delete"//
        $ionicPopover.fromTemplateUrl('excipientoption.html', {
            scope: $scope,
        }).then(function(popover) {
            $scope.popover = popover;
        });

        $scope.openPopover = function($event) {
            document.body.classList.add('platform-ios');
            $scope.popover.show($event);
        };
        $scope.closePopover = function() {
            $scope.popover.hide();
        };


        // A confirm dialog
        $scope.showConfirm = function(excipient) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Confrim Excipient',
                template: 'Are you sure you want to use this substance for creating excipient?'
            });
            confirmPopup.then(function(res) {
                if (res) {
                    excipientService.addExcipient(excipient);
                    $scope.reset();
                    console.log($scope.currentSubstance);
                    $ionicLoading.show({
                        template: '<i class="icon ion-loading-c"></i>',
                        showDelay: 5 // If the delay is too fast and you also change states, while the loader is showing, you can get flashing behavior
                    });

                    // Hide the loadingIndicator 1500 ms later
                    $timeout(function() {
                        $ionicLoading.hide();
                    }, 1500);

                    // 500 ms after showing the loadingIndicator, do a state change.  The idea is that when the loader is hidden, you will be in the new state.  But as you'll see there is flashing.
                    $timeout(function() {
                        $state.go('base.excipientContent.showAllExcipient');
                    }, 500);
                } else {
                    console.log('You are not sure');
                }
            });
        };

        // A confirm dialog for updating an exiting excipient
        $scope.showConfirmForUpdate = function(excipient) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Update Excipient',
                template: 'Are you sure you want to update this excipient ?'
            });
            confirmPopup.then(function(res) {
                if (res) {
                    $scope.currentExcipient.substanceFunctions = substanceFnService.getCurrentSubstanceFnlist();
                    excipientService.updateExcipient(excipient);
                    $scope.reset();
                    $ionicLoading.show({
                        template: '<i class="icon ion-loading-c"></i>',
                        showDelay: 5 // If the delay is too fast and you also change states, while the loader is showing, you can get flashing behavior
                    });

                    // Hide the loadingIndicator 1500 ms later
                    $timeout(function() {
                        $ionicLoading.hide();
                    }, 1500);

                    // 500 ms after showing the loadingIndicator, do a state change.  The idea is that when the loader is hidden, you will be in the new state.  But as you'll see there is flashing.
                    $timeout(function() {
                        $state.go('base.excipientContent.showAllExcipient');
                    }, 500);
                    console.log($scope.currentSubstance);
                } else {
                    console.log('You are not sure');
                }
            });
        };

        // Confrim Form for deleling substance in the database
        $scope.showConfirmForDelete = function() {
            $scope.closePopover();
            var confirmPopup = $ionicPopup.confirm({
                title: 'Delete Excipient',
                template: 'Are you sure you want to delete this excipient ?'
            });
            confirmPopup.then(function(res) {
                if (res) {
                    excipientService.deleteExcipient($scope.excipientSelected.id);
                    $scope.reset();
                    $ionicLoading.show({
                        template: '<i class="icon ion-loading-c"></i>',
                        showDelay: 5 // If the delay is too fast and you also change states, while the loader is showing, you can get flashing behavior
                    });

                    // Hide the loadingIndicator 1500 ms later
                    $timeout(function() {
                        $ionicLoading.hide();
                    }, 1500);

                    // 500 ms after showing the loadingIndicator, do a state change.  The idea is that when the loader is hidden, you will be in the new state.  But as you'll see there is flashing.
                    $timeout(function() {
                        $state.go('base.excipientContent.showAllExcipient');
                    }, 500);
                } else {
                    console.log('You are not sure');
                }
            });
        };


        // refresh excipient data//
        $scope.doRefresh = function() {
            $timeout(function() {
                excipientService.getExcipientList().success(function(response) {
                    $scope.excipients = response;

                });

                //Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');

            }, 1000);

        };

        $scope.clearfilter = function() {
            //$scope.searchSubstance = null;
            console.log("sddsd");
        };

        $scope.cancel = function() {
            $scope.reset();
            var history = $ionicViewService.getBackView();
            history.go();
        };

        $scope.goback = function() {
            var history = $ionicViewService.getBackView();
            history.go();
        };

    }
])
