'use strict';
/**
 * Controllers
 * @constructor
 */
angular.module('drugExpertSystem.substanceController', [])

// Substance Controller //
.controller('substanceCtrl', ['$scope', '$state', '$timeout', 'solubilityService', 'flowablityService', 'solidstateService', 'hygroscopityService', 'particlesizeService', 'alcoholService', 'saltFormService', 'stabilityService', 'substanceService', '$ionicModal', '$ionicPopup', '$ionicPopover', '$ionicLoading', '$ionicViewService', function($scope, $state, $timeout, solubilityService, flowablityService, solidstateService, hygroscopityService, particlesizeService, alcoholService, saltFormService, stabilityService, substanceService, $ionicModal, $ionicPopup, $ionicPopover, $ionicLoading, $ionicViewService) {

    $scope.substances = $scope.getSubstanceList;
    $scope.substanceSelected = {};
    $scope.currentSubstance = {
        waterSolubility: '',
        flowability: '',
        solidState: '',
        hygroscopicity: '',
        particleSize: '',
        alcoholSolubility: '',
        saltForm: '',
        stability: ''
    };

    $scope.currentSubstance.stability = stabilityService.getStabilities();
    $scope.orig = angular.copy($scope.currentSubstance);
    $scope.origSelectedSubstance = {};

    //Bind the Substance Property for watching//
    $scope.waterSolubility = solubilityService;
    $scope.flowability = flowablityService;
    $scope.solidState = solidstateService;
    $scope.hygroscopicity = hygroscopityService;
    $scope.particleSize = particlesizeService;
    $scope.alcohol = alcoholService;
    $scope.saltForm = saltFormService;



    // Watch Substance water solubility change or not /
    $scope.$watch('waterSolubility.getCurrentSolubility()', function() {
        if ($scope.currentSubstance.waterSolubility != $scope.waterSolubility.getCurrentSolubility()) {
            $scope.currentSubstance.waterSolubility = $scope.waterSolubility.getCurrentSolubility();
        }
    });

    // Watch Substance water solubility change or not /
    $scope.$watch('flowability.getCurrentFlowability()', function() {
        if ($scope.currentSubstance.flowability != $scope.flowability.getCurrentFlowability()) {
            $scope.currentSubstance.flowability = $scope.flowability.getCurrentFlowability();
        }
    });

    // Watch Substance water solubility change or not /
    $scope.$watch('solidState.getCurrentSolidState()', function() {
        if ($scope.currentSubstance.solidState != $scope.solidState.getCurrentSolidState()) {
            $scope.currentSubstance.solidState = $scope.solidState.getCurrentSolidState();
        }
    });

    // Watch Substance water solubility change or not /
    $scope.$watch('hygroscopicity.getCurrentHygroscopity()', function() {
        if ($scope.currentSubstance.hygroscopicity != $scope.hygroscopicity.getCurrentHygroscopity()) {
            $scope.currentSubstance.hygroscopicity = $scope.hygroscopicity.getCurrentHygroscopity();
        }
    });

    // Watch Substance water solubility change or not /
    $scope.$watch('particleSize.getCurrentParticlesize()', function() {
        if ($scope.currentSubstance.particleSize != $scope.particleSize.getCurrentParticlesize()) {
            $scope.currentSubstance.particleSize = $scope.particleSize.getCurrentParticlesize();
        }
    });

    // Watch Substance water solubility change or not /
    $scope.$watch('alcohol.getCurrentAlcohol()', function() {
        if ($scope.currentSubstance.alcoholSolubility != $scope.alcohol.getCurrentAlcohol()) {
            $scope.currentSubstance.alcoholSolubility = $scope.alcohol.getCurrentAlcohol();
        }
    });

    // Watch Substance water solubility change or not /
    $scope.$watch('saltForm.getCurrentSaltForm()', function() {
        if ($scope.currentSubstance.saltForm != $scope.saltForm.getCurrentSaltForm()) {
            $scope.currentSubstance.saltForm = $scope.saltForm.getCurrentSaltForm();
        }
    });

    // get Substance Data from the data base //
    $scope.getSubstanceList = function() {
        substanceService.getSubstanceList().success(function(response) {
            $scope.substances = response;
        });

    }

    // Add A new substance function//
    $scope.addNewSubstance = function(substance) {
        substanceService.addSubstance(substance);
    }

    // Update the exsiting substance//
    $scope.updateSubstance = function(substance) {
        substanceService.updateSubstance(substance);
    }

    // Delete the exsiting substance //
    $scope.deleteSubstance = function(substance) {
        substanceService.deleteSubstance($scope.substanceSelected.id);
    }

    //Get Substance List at the first time// 
    substanceService.getSubstanceList().success(function(response) {
        //igging into the response to get the relevant data
        $scope.substances = response;
    });





    // Set the current substance that user selected //
    $scope.setSelectedSubstance = function(getValue) {
        $scope.substanceSelected = getValue;
        $scope.origSelectedSubstance = angular.copy($scope.substanceSelected);
        $state.go('base.substanceContent.substanceDetail');

    }



    // A confirm dialog for adding a new substance
    $scope.showConfirm = function(substance) {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Create Substance',
            template: 'Are you sure you want to create this substance?'
        });
        confirmPopup.then(function(res) {
            if (res) {
                $scope.currentSubstance.stability = stabilityService.getStabilities();
                $scope.addNewSubstance(substance);
                console.log("test");
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
                    $state.go('base.substanceContent.showAllSubstance');
                }, 500);
            } else {
                console.log('You are not sure');
            }
        });
    };

    // A confirm dialog for updating an exiting substance
    $scope.showConfirmForUpdate = function(substance) {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Update Substance',
            template: 'Are you sure you want to update this substance?'
        });
        confirmPopup.then(function(res) {
            // $scope.currentSubstance.stability = $scope.watchStability.getStabilities();
            //console.log($scope.currentSubstance);
            if (res) {
                $scope.currentSubstance.stability = stabilityService.getStabilities();
                $scope.updateSubstance(substance);
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
                    $state.go('base.substanceContent.showAllSubstance');
                }, 500);

            } else {
                console.log('You are not sure');
            }
        });
    };

    // Confrim Form for deleling substance in the database
    $scope.showConfirmForDelete = function() {
        $scope.closePopover();
        var confirmPopup = $ionicPopup.confirm({
            title: 'Delete Substance',
            template: 'Are you sure you want to delete this substance?'
        });
        confirmPopup.then(function(res) {
            if (res) {
                $scope.deleteSubstance($scope.substanceSelected);
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
                    $state.go('base.substanceContent.showAllSubstance');
                }, 500);
            } else {
                console.log('You are not sure');
            }
        });
    };


    //Substance Option window such as  "edit" or "delete"//
    $ionicPopover.fromTemplateUrl('substanceoption.html', {
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

    // Go back to previous page //
    $scope.goback = function() {
        $scope.reset();
        // $scope.substanceSelected = null;
        // $scope.substanceSelected = $scope.origSelectedSubstance;

        var history = $ionicViewService.getBackView();
        console.log(history);
        history.go();
    };

    // Go to edit substance that user selected //
    $scope.gotoEdit = function() {
        $scope.closePopover();
        //$scope.reset();
        $scope.currentSubstance = $scope.substanceSelected;
        solubilityService.setCurrentSolubility($scope.substanceSelected.waterSolubility);
        console.log($scope.currentSubstance);
        angular.forEach($scope.substanceSelected.stability, function(value, key) {
            stabilityService.setStabilities(value);
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
            $state.go('base.substanceContent.editSubstance');
        }, 500);
    }


    // Get Current Solubility form Solubility Service//
    $scope.reset = function() {
        solubilityService.resetCurrentSolubility();
        flowablityService.resetCurrentFlowability();
        solidstateService.resetCurrentSolidState();
        hygroscopityService.resetCurrentHygroscopity();
        particlesizeService.resetCurrentParticlesize();
        alcoholService.resetCurrentAlcohol();
        saltFormService.resetCurrentSaltForm;
        stabilityService.resetStability();

        $scope.currentSubstance = angular.copy($scope.orig);
        $scope.currentSubstance.stability = stabilityService.getStabilities();
    }

    //Refresh Substance data in the list, the refresh will call data from db //
    $scope.doRefresh = function() {
        console.log('Refreshing!');
        $timeout(function() {
            $scope.getSubstanceList();
            //Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');

        }, 1000);

    };

    $scope.clearfilter = function() {


    }

}]);
