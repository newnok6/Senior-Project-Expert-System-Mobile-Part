'use strict';
/**
 * Controllers
 * @constructor
 */
angular.module('drugExpertSystem.formulationController', [])


// Formulation Controller//
.controller('formulationCtrl',
    function($scope, $state, $timeout, $ionicPopover, $ionicModal, $ionicPopup, $ionicViewService, $ionicSlideBoxDelegate, $ionicLoading, excipientService, formulationService) {

        $scope.excipients = [];
        $scope.excipientInlist = excipientService.getCurrentExcipientlist();
        $scope.currentExcipient = {
            substanceFunctions: [],
            usedWeight: ''
        };
        $scope.excipientOrig = angular.copy($scope.currentExcipient);
        $scope.setSubstanceFunctions = [];
        $scope.formulationTypes = [{
            type: "Tablet Formulation"
        }, {
            type: "Solution Formulation"
        }];
        $scope.currentFormulation = {
            excipient: {}
        };
        $scope.currentFormulation.excipient = excipientService.getCurrentExcipientlist();

        $scope.orig = angular.copy($scope.currentFormulation);
        $scope.formulations = [];
        $scope.formulationSelected = {};

        


        //Get Formulationlist from database //
        formulationService.getFormulationList().success(function(response) {
            $scope.formulations = response;
        });

        // Get Rxcipient list from the database //
        excipientService.getExcipientList().success(function(response) {
            $scope.excipients = response;
        });


        // Get Formulation data from the database
        $scope.getFormulationList = function() {
            formulationService.getFormulationList().success(function(response) {
                $scope.formulations = response;
            });
        }


        // Set Selected Excipient that select from the excipient list //
        $scope.setSelectedFormulation = function(getValue) {
            $scope.formulationSelected = getValue;
            //$scope.origSelectedSubstance = angular.copy($scope.substanceSelected);
            $state.go('base.formulationContent.formulationdetail');

        }

        // Add a new Formulation to the database //
        $scope.addFormulation = function(formulation) {
             formulationService.addFormulation(formulation);
        }

        // Update the existing Formulation to the database //
        $scope.updateFormulation = function(formulation) {
            formulationService.updateFormulation(formulation);
        }

        // Delete the existing Formulation in the database//
        $scope.deleteFormulation = function(formulation) {
             formulationService.deleteFormulation(formulation.id);
        }

        // Get Excipient data from the database//
        $scope.getExcipientList = function() {
            excipientService.getExcipientList().success(function(response) {
                $scope.excipients = response;
            });
        }


        //This Method will work when the user select "Edit Formulation"
        $scope.goEditFormulation = function() {
            $scope.closePopover();
            $scope.reset();
            $scope.currentFormulation = $scope.formulationSelected;
            // excipientService.setExcipientToList($scope.formulationSelected.api);
            angular.forEach($scope.formulationSelected.excipient, function(value, key) {
                excipientService.setExcipientToList(value);
            })
            $scope.excipientInlist = excipientService.getCurrentExcipientlist();
            console.log($scope.excipientInlist);
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
                $state.go('base.formulationContent.updateFormulation');
            }, 500);
        }



        // Set key for find the formulation type that relate with formulation name
        $scope.nextFormulationType = function(getkey) {
            console.log($scope.currentExcipient);
            $scope.setkey = getkey;
            $ionicSlideBoxDelegate.next();
        };


        // Get the FunctionType By the key that set before
        $scope.filter = function(key) {
            var set = [];
            set = $scope.excipients[key];
            //$scope.currentExcipient.minWeight = $scope.excipients[key].minWeight;
            //$scope.currentExcipient.maxWeight = set.maxWeight;
            //$scope.currentExcipient.usedWeight = set.usedWeight;
            // $scope.currentExcipient.substanceFunctions = $scope.setSubstanceFunctions.substanceFunctions;
            console.log($scope.currentExcipient);
            console.log(set);
            return set;
            //

        }

        // add Excipient to formulation
        $scope.addExcipientToFormulation = function(currentExcipient) {
            $scope.currentExcipient.substanceFunctions.push($scope.setSubstanceFunctions.substanceFunctions);
            excipientService.setExcipientToList(currentExcipient);

            //currentStabilities.splice(currentStabilities.indexOf(stability), 1);
            $scope.currentExcipient = angular.copy($scope.excipientOrig);
            console.log($scope.currentExcipient);
            $scope.hideModal(5);
        }

        // remove substance function from the list
        $scope.deleteExcipientFromList = function(excipient) {
            excipientService.deleteExcipientOnlist(excipient);
        };


       
        // A confirm dialog for add a new formulation to the database //
        $scope.showConfirm = function(formulation) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Confrim Formulation',
                template: 'Are you sure you want to create a new formulation?'
            });
            //$scope.currentFormulation.api
            confirmPopup.then(function(res) {
                if (res) {
                    console.log($scope.currentFormulation.excipient);
                    $scope.addFormulation(formulation);
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
                        $state.go('base.formulationContent.showAllFormulation');
                    }, 500);
                    //console.log($scope.currentFormulation);
                } else {
                    console.log('You are not sure');
                }
            });
        };

        // A confirm dialog for updating an exiting excipient
        $scope.showConfirmForUpdate = function(formulation) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Update Formulation',
                template: 'Are you sure you want to update this formulation ?'
            });
            confirmPopup.then(function(res) {
                if (res) {
                    $scope.updateFormulation(formulation);
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
                        $state.go('base.formulationContent.showAllFormulation');
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
                title: 'Delete Formulation',
                template: 'Are you sure you want to delete this excipient ?'
            });
            confirmPopup.then(function(res) {
                if (res) {
                    $scope.deleteFormulation($scope.formulationSelected);
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
                        $state.go('base.formulationContent.showAllFormulation');
                    }, 500);
                } else {
                    console.log('You are not sure');
                }
            });
        };



        // Show the Formulation Type list //
        $ionicModal.fromTemplateUrl('formulationTypeModal.html', {
            id: 4,
            scope: $scope
        }).then(function(modal) {
            $scope.oModal4 = modal;
        });

        //Excipient Modal//
        $ionicModal.fromTemplateUrl('excipientModal.html', {
            id: 5,
            scope: $scope
        }).then(function(modal) {
            $scope.oModal5 = modal;
        });

        $scope.openModal = function(index) {
            if (index == 4) {
                $scope.oModal4.show();
            } else {
                $ionicSlideBoxDelegate.slide(0);
                $scope.oModal5.show();
            }
        }

        // hide the model
        $scope.hideModal = function(index) {
            if (index == 4) {
                //  $scope.currentSubstanceFn = angular.copy($scope.orig);
                $scope.oModal4.hide();
            } else {
                $scope.currentExcipient = angular.copy($scope.excipientOrig);
                $scope.oModal5.hide();
            }
        }

        //Call Formulation Option Pop Over such as  "edit formulation" or "delete formulation"//
        $ionicPopover.fromTemplateUrl('formulationoption.html', {
            scope: $scope,
        }).then(function(popover) {
            $scope.popover = popover;
        });

        //Open Popover view //
        $scope.openPopover = function($event) {
            document.body.classList.add('platform-ios');
            $scope.popover.show($event);
        };
        //Close Popover view //
        $scope.closePopover = function() {
            $scope.popover.hide();
        };

        //Clear Search world at search bar//
        $scope.clearfilter = function() {
            console.log('dsdsds');
            $scope.searchSubstance = '';

        }

        //Reset the Current Formulation After adding//
        $scope.reset = function() {
            excipientService.resetExcipient();
            $scope.currentFormulation = angular.copy($scope.orig);
            $scope.currentFormulation.excipient = excipientService.getCurrentExcipientlist();
        };

        // refresh excipient data//
        $scope.doRefresh = function() {
            $timeout(function() {
                $scope.formulations = [];
                //Get Formulationlist from database //

                 $scope.getFormulationList();
                //Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');

            }, 1000);

        };


        // Cancel to adding or updating formulation.This function will clear the data //
        $scope.cancel = function() {
            $scope.reset();
            var history = $ionicViewService.getBackView();
            history.go();

        }


        $scope.goback = function() {
            var history = $ionicViewService.getBackView();
            history.go();
        };

    }
);
