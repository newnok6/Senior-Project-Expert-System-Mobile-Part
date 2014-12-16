'use strict';
/**
 * Controllers
 * @constructor
 */
angular.module('drugExpertSystem.productionController', [])

.controller('productionCtrl',
    function($scope, $timeout, $state, $ionicModal, $ionicPopup, $ionicSlideBoxDelegate, $ionicPopover, $ionicLoading, $ionicViewService, formulationService, unitOperationService, productionService, unitOperationServiceV2) {

        $scope.currentProduction = {};
        $scope.formulations = {};
        $scope.unitOperations = {};
        $scope.realUniOperationList = [];
        $scope.productions = {};
        $scope.directCompress = [];
        $scope.dryCompress = [];
        $scope.wetCompress = [];
        $scope.processName = '';

        //Get the formulation list form JSON file //
        unitOperationService.getUnitOpreationList().success(function(response) {
            $scope.unitOperations = response;
            console.log($scope.unitOperations);
        });

        //Get the formulation list form the database by using production service //
        formulationService.getFormulationList().success(function(response) {
            $scope.formulations = response;
            console.log($scope.formulations);
        });

        //Get the production list form the database by using production service //
        productionService.getProductionList().success(function(response) {
            $scope.productions = response;
            console.log($scope.productions);
        });



        //Show Amount of Excipient In UnitOperation//
        $scope.showAmount = function(unitOpration) {
            var amount = '';
            angular.forEach(unitOpration.excipients, function(value, key) {
                if (value.checked != false) {
                    amount++;
                }
            });
            return amount;
        }

        // Unit Operation Selection Modal //
        $ionicModal.fromTemplateUrl('excipientInUnitOperationModal.html', {
            id: 1,
            scope: $scope
        }).then(function(modal) {
            $scope.oModal1 = modal;
        });


        // Set Excipient in Unit Operation // 
        $scope.setExcipientForSelectInUnitOpration = function(excipients) {
            $scope.excipientswithChecked = [];

            angular.forEach(excipients, function(value, key) {

                $scope.excipientswithChecked.push({
                    excipient: value,
                    checked: false
                })
            });

            return $scope.excipientswithChecked;
        };

        // Add Unit Operation that selected from the checklist //
        $scope.addUnitOperationSelected = function() {
            var unitOperations = [];
            $scope.unitOperationsSelected = [];
            angular.forEach($scope.unitOperations, function(value, key) {
                if (value.checked != false) {
                    $scope.unitOperationsSelected.push({
                        name: value.type,
                        excipients: $scope.setExcipientForSelectInUnitOpration($scope.currentProduction.formulation.excipient)
                    })
                }
            });
            console.log($scope.unitOperationsSelected);
            //$scope.realUniOperationList = unitOperations;
            $state.go('base.productionContent.selectExcipientInUnitOperation');
            // console.log($scope.realUniOperationList);
        };

        //Set the Key and open modal for selecting the excipient in unitOperation //
        $scope.selectExcipientInUnitOperation = function(unitOperation) {
            $scope.setKey = unitOperation;
            console.log($scope.setKey);
            $scope.openModal(1);
        }

        // Get Excipient from the formulation that user selected //
        $scope.getExcipientFromFormulation = function(unitOperation) {
            return unitOperation.excipients;
            /*
            $scope.currentExcipientList = [];
            var currentExcipientList = [];
            angular.forEach($scope.currentProduction.formulation.excipient, function(value, key) {
                $scope.currentExcipient = {
                    name: '',
                    checked: false
                };
                //console.log(value.substance.name);
                //$scope.currentExcipient.name = value.substance.name;
                $scope.currentExcipientList.push({
                    name: value.substance.name,
                    checked: false
                });

            })
            */
            console.log($scope.currentExcipientList);
            return $scope.currentExcipientList;

        }

        // Open the Model
        $scope.openModal = function(index) {
            if (index == 1) {
                $scope.oModal1.show();
            }
        }

        // hide the model
        $scope.hideModal = function(index) {
            if (index == 1) {
                $scope.oModal1.hide();
            }
        }

        //Add new Production //
        $scope.addProduction = function(unitOperationsSelected) {
            $scope.realUnitOperationList = [];

            angular.forEach(unitOperationsSelected, function(value, key) {
                var excipients = [];
                angular.forEach(value.excipients, function(value2, key2) {
                    if (value2.checked != false) {
                        excipients.push(
                            value2.excipient
                        )
                    }
                });
                $scope.realUnitOperationList.push({
                    name: value.name,
                    excipients: excipients
                });
            });


            $scope.currentProduction.pharmaceuticalProcess = {
                name : $scope.processName,
                unitOperations: $scope.realUnitOperationList
            };
            //$scope.currentProduction.pharmaceuticalProcess = {};
            productionService.addProduction($scope.currentProduction);
            console.log($scope.currentProduction);
        };

        //Update existing Production //
        $scope.updateProduction = function() {

        };

        //Delete existing Production//
        $scope.deleteProduction = function() {

        };

        //Get Production list //
        $scope.getAllProduction = function() {

        };


        // A confirm dialog for add a new production to the database //
        $scope.showConfirmForAdding = function(unitOperationsSelected) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Confrim to create production',
                template: 'Are you sure you want to create a new production?'
            });
            //$scope.currentFormulation.api
            confirmPopup.then(function(res) {
                if (res) {
                    $scope.addProduction(unitOperationsSelected);
                    // $scope.reset();
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
                        $state.go('base.productionContent.showAllProduction');
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


        unitOperationServiceV2.getUnitOpreationList().success(function(response) {
               
                    $scope.directCompress  = response.directCompression;
                
                    $scope.dryCompress= response.dryGranulation;
                
                    $scope.wetCompress = response.wetGranulation;
                
            })


        // Set Unit Operation list for Each Process Name For V2 only //
        $scope.setUnitOperation = function(order) {

            //Get Unit Operation from the JSON file//
            $scope.unitOperationsV2 = [];
             if (order == 0) {
                     $scope.unitOperationsV2  = $scope.directCompress;
                     $scope.processName = 'direct compression';
                     
                } else if (order == 1) {
                     $scope.unitOperationsV2 = $scope.dryCompress;
                     $scope.processName = 'dry granulation';
                     
                } else {
                    $scope.unitOperationsV2 = $scope.wetCompress
                    $scope.processName = 'wet granulation';
                    
                }
            $scope.unitOperationsSelectedV2 = [];
            
            console.log($scope.unitOperationsV2)            
            angular.forEach($scope.unitOperationsV2, function(value, key) {
                console.log('value' + value.type);
                $scope.unitOperationsSelectedV2.push({
                    name: value.type,
                    excipients: $scope.setExcipientForSelectInUnitOpration($scope.currentProduction.formulation.excipient)
                })
                console.log(value);
            })

            console.log($scope.unitOperationsSelectedV2);
            $state.go('base.productionContent.selectExcipientInUnitOperationV2');
        }

        // Go to unit operation setting //
        $scope.goUnitOperationSetting = function() {
                $state.go('base.productionContent.selectProcess');
            }
            // Go to Production Deatil State //
        $scope.goProductionDetail = function(production) {
                $scope.productionSelected = production;
                console.log();
                $state.go('base.productionContent.showDetail');
            }
            // Cancel to do this page //
        $scope.cancel = function() {
            //$scope.reset();
            var history = $ionicViewService.getBackView();
            history.go();
        };

        //Go back to previus page//
        $scope.goBack = function() {
            var history = $ionicViewService.getBackView();
            history.go();
        };




    });
