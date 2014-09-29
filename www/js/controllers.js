'use strict';
/**
 * Controllers
 * @constructor
 */
angular.module('drugExpertSystem.controllers', [])


.controller('MenuCtrl', function($scope, $state, solubilityService, stabilityService, $ionicSideMenuDelegate) {
    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
        console.log("test");
    };

    // Go to Excipient Content and refresh existing data //
    $scope.goExcipient = function() {
        solubilityService.resetCurrentSolubility();
        stabilityService.resetStability();
        $state.go("base.excipientContent.menu");
    };

    // Go to substance Content and refresh existing data //
    $scope.goSubstance = function() {
        solubilityService.resetCurrentSolubility();
        stabilityService.resetStability();
        $state.go("base.substanceContent.showAllSubstance");
    };

    // Go to Formulation Content and refresh existing data //
    $scope.goFormulation = function() {
        solubilityService.resetCurrentSolubility();
        stabilityService.resetStability();
        $state.go("base.formulationContent.menu");
    };

})

.controller('SubMenuCtrl', function($scope) {
    console.log('sub menu controller');

})

//Solubility Controller //
.controller('solubilityCtrl', ['$scope', '$ionicModal', 'solubilityService',
    function($scope, $ionicModal, solubilityService) {
        $scope.solubilities = [];
        $scope.currentSolubility = {};

        //Get Solubilities data from the service 
        solubilityService.getSolubilityList().success(function(response) {
            $scope.solubilities = response;
            console.log($scope.currentSolubility);
        });

        //Set Solubility data to the service
        $scope.setCurrentSolubility = function(currentSolubility) {
            solubilityService.setCurrentSolubility(currentSolubility.type);
            $scope.hideModal(1);
            console.log($scope.currentSolubility);
        };

        //Reset Solubility data
        $scope.resetCurrentSolubility = function() {
            solubilityService.resetCurrentSolubility();
            console.log(currentSolubility);
        };


        //Solubility Modal//
        $ionicModal.fromTemplateUrl('solubilityModal.html', {
            id: 1,
            scope: $scope
        }).then(function(modal) {
            $scope.oModal1 = modal;
        });

        //Open the model//
        $scope.openModal = function(index) {
            if (index == 1) {
                $scope.oModal1.show();
            }
        }

        // hide the model
        $scope.hideModal = function(index) {
            if (index == 1)
                $scope.oModal1.hide();
        }
        /*
    // Add The WaterSolubility //
   $scope.addWaterSolubility = function(data) {        
    $scope.waterSolubilities = [{type : data.type }];
    console.log(data);
    $scope.modal.hide();
  };
*/
    }
])

// Stability Controller //
.controller('stabilityCtrl', ['$scope', '$rootScope', '$ionicModal', '$ionicViewService', 'stabilityService',
    function($scope, $rootScope, $ionicModal, $ionicViewService, stabilityService) {
        $scope.currentStabilities = stabilityService.getStabilities();
        //Stability Modal//
        $ionicModal.fromTemplateUrl('stabilityModal.html', {
            id: 2,
            scope: $scope
        }).then(function(modal) {
            $scope.oModal2 = modal;
        });

        //Open the model//
        $scope.openModal = function(index) {
            if (index == 2)
                $scope.oModal2.show();
        }

        // hide the model
        $scope.hideModal = function(index) {
            if (index == 2)
                $scope.oModal2.hide();
        }

        //add stability to the list//
        $scope.addStability = function(stability) {
            stabilityService.setStabilities(stability);
            $scope.hideModal(2);
        };

        // remove stability from the list
        $scope.deleteStabilityInList = function(stability) {
            stabilityService.deleteStabilityOnlist(stability);
        };

        $scope.goback = function() {
            var history = $ionicViewService.getBackView();
            history.go();
        }

        $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
            if (from.name == "app.view2" && to.name == "app.view1") {
                console.log("ABCDEFGHIJK");
            }

            // $state.href(from, fromParams)

        });



    }
])

// Substance Function Controller//
.controller('substanceFnCtrl', ['$scope', '$ionicModal', 'substanceFnService',
    function($scope, $ionicModal, substanceFnService) {

        $scope.functionNameList = [];
        $scope.functionTypeList = [];
        $scope.currentSubstanceFn = {};
        $scope.orig = angular.copy($scope.currentSubstanceFn);
        $scope.currentSubstanceFnList = substanceFnService.getCurrentSubstanceFnlist();


        substanceFnService.getSubstanceFnFromJson().success(function(response) {
            $scope.functionNameList = response.funtionName;
            $scope.functionTypeList = response.functionType;
            console.log($scope.functionTypeList);
            console.log($scope.cuurentSubstanceFn);
        });

        // $scope.currentSubstanceFn = {
        //  name: 'binder'
        //};


        $scope.filterFunctionType = function(functionName) {
            var result = {};
            result = $scope.functionTypeList[functionName];
            console.log($scope.currentSubstanceFn);
            return result;
        }

        //add substance function to the list//
        $scope.addSunstanceFn = function(substanceFn) {
            var setSubstance = substanceFn;
            substanceFnService.setSunstanceFn(setSubstance);
            $scope.hideModal(3);
        };

        // remove substance function from the list
        $scope.deleteSubstanceFnInList = function(substanceFn) {
            substanceFnService.deleteSubstanceFnOnlist(substanceFn);
        };


        //Stability Modal//
        $ionicModal.fromTemplateUrl('substanceFnModal.html', {
            id: 3,
            scope: $scope
        }).then(function(modal) {
            $scope.oModal3 = modal;
        });

        //Open the model//
        $scope.openModal = function(index) {
            if (index == 3)
                $scope.oModal3.show();
        }

        // hide the model
        $scope.hideModal = function(index) {
            if (index == 3)
                $scope.currentSubstanceFn = angular.copy($scope.orig);
            $scope.oModal3.hide();
        }
    }
])

// Substance Controller //
.controller('substanceCtrl', ['$scope', '$state', '$rootScope', '$timeout', 'solubilityService', 'stabilityService', 'substanceService', '$ionicModal', '$ionicPopup', '$ionicPopover', '$ionicLoading',
    function($scope, $state, $rootScope, $timeout, solubilityService, stabilityService, substanceService, $ionicModal, $ionicPopup, $ionicPopover, $ionicLoading) {
        var scope = $rootScope;
        $scope.substances = [];
        $scope.substanceSelected = {};
        $scope.currentSubstance = {
            waterSolubility: '',
            stability: ''
        };
        $scope.currentSubstance.stability = stabilityService.getStabilities();
        $scope.orig = angular.copy($scope.currentSubstance);
        $scope.waterSolubility = solubilityService;
        $scope.watchStability = stabilityService;



        // Watch Substance water solubility change or not /
        $scope.$watch('waterSolubility.getCurrentSolubility()', function() {
            if( $scope.currentSubstance.waterSolubility != $scope.waterSolubility.getCurrentSolubility()){
            $scope.currentSubstance.waterSolubility = $scope.waterSolubility.getCurrentSolubility();
            console.log($scope.currentSubstance);
            console.log($scope.currentSubstance.stablity);
            console.log($scope.watchStability.getStabilities());
            }
        })
        
        //Show SubstanceList// 
        substanceService.getSubstanceList().success(function(response) {
            //Digging into the response to get the relevant data
            $scope.substances = response;
        });

        // Get Current Solubility form Solubility Service//
        $scope.reset = function() {
            solubilityService.resetCurrentSolubility();
            stabilityService.resetStability();
            $scope.currentSubstance = angular.copy($scope.orig);
            $scope.currentSubstance.stability = stabilityService.getStabilities();
        }

        /*
        $scope.getCurrentSolubility = function() {
            $scope.currentSubstance.waterSolubility = solubilityService.getCurrentSolubility();
            console.log($scope.currentSubstance.waterSolubility);
            return $scope.currentSubstance.waterSolubility;

        }

        */

        $scope.setSelectedSubstance = function(getValue) {
            $scope.substanceSelected = getValue;
            $state.go('base.substanceContent.substanceDetail');

        }

        //Substance Option such "edit" or "delete"//
        $ionicPopover.fromTemplateUrl('substanceoption.html', {
            scope: $scope,
        }).then(function(popover) {
            $scope.popover = popover;
        });

        $scope.openPopover = function($event) {
            $scope.popover.show($event);
        };
        $scope.closePopover = function() {
            $scope.popover.hide();
        };


        $scope.gotoEdit = function() {
            $scope.closePopover();
            $scope.currentSubstance = $scope.substanceSelected;
            solubilityService.setCurrentSolubility($scope.substanceSelected.waterSolubility);
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
        };



        // A confirm dialog for adding a new substance
        $scope.showConfirm = function(substance) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Create Substance',
                template: 'Are you sure you want to create this substance?'
            });
            confirmPopup.then(function(res) {
                if (res) {
                    substanceService.addSubstance(substance);
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
                    $scope.currentSubstance.stability = $scope.watchStability.getStabilities();
                    substanceService.updateSubstance(substance);
                    $scope.reset();
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
                title: 'Delete Substance',
                template: 'Are you sure you want to delete this substance?'
            });
            confirmPopup.then(function(res) {
                if (res) {
                    substanceService.deleteSubstance($scope.substanceSelected.id);
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


        $scope.doRefresh = function() {
            console.log('Refreshing!');
            $timeout(function() {

                substanceService.getSubstanceList().success(function(response) {
                    $scope.substances = response;
                });

                //Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');

            }, 1000);

        };

    }
])

// Excipient Controller//
.controller('excipientCtrl', ['$scope', '$state', 'substanceService', 'excipientService', 'substanceFnService', '$ionicModal', '$ionicPopup', '$ionicSlideBoxDelegate',
    function($scope, $state, substanceService, excipientService, substanceFnService, $ionicModal, $ionicPopup, $ionicSlideBoxDelegate) {

        $scope.setkey = '';
        $scope.excipients = {};
        $scope.excipientInlist = excipientService.getCurrentExcipientlist();
        $scope.setSubstanceFunctions = [];
        $scope.currentExcipient = {
            substanceFunctions: '',
            usedWeight: '',
            minWeight: '',
            maxWeight: ''
        };
        $scope.orig = angular.copy($scope.currentExcipient);
        $scope.currentExcipient.substanceFunctions = substanceFnService.getCurrentSubstanceFnlist();
        $scope.orig = angular.copy($scope.currentExcipient);
        $scope.substances = {};
        $scope.searchSubstance = '';


        //Show ExcipientList// 
        excipientService.getExcipientList().success(function(response) {
            //Digging into the response to get the relevant data
            $scope.excipients = response;
            console.log($scope.excipients);
        });

        substanceService.getSubstanceList().success(function(response) {
            //Digging into the response to get the relevant data
            $scope.substances = response;
            console.log($scope.substances);
        });

        $scope.addExcipientToFormulation = function(currentExcipient) {
            excipientService.setExcipientToList(currentExcipient);
            console.log($scope.currentExcipient);
            $scope.hideModal(5);
        }

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

        // hide the model
        $scope.hideModal = function(index) {
            if (index == 5)
                $scope.currentExcipient = angular.copy($scope.orig);
            $scope.oModal5.hide();

        }

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


        $scope.clearfilter = function() {
            console.log('dsdsds');
            $scope.searchSubstance = '';

        }

        //Reset the Current Solubility After adding//
        $scope.reset = function() {
            substanceFnService.resetsSubstanceFn();
            $scope.currentExcipient = angular.copy($scope.orig);
            $scope.currentExcipient.substanceFunctions = substanceFnService.getCurrentSubstanceFnlist();
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
                } else {
                    console.log('You are not sure');
                }
            });
        };

    }
])

// Formulation Controller//
.controller('formulationCtrl', ['$scope', 'excipientService', 'formulationService', '$ionicModal', '$ionicPopup',
    function($scope, excipientService, formulationService, $ionicModal, $ionicPopup) {

        $scope.excipients = [];
        $scope.formulationTypes = [{
            type: "Tablet Formulation"
        }, {
            type: "Solution Formulation"
        }];
        $scope.currentFormulation = {
            api: {}
        };
        $scope.currentFormulation.api = excipientService.getCurrentExcipientlist();
        $scope.orig = angular.copy($scope.currentFormulation);
        $scope.formulationlist = [];

        //Show ExcipientList// 
        excipientService.getExcipientList().success(function(response) {
            //Digging into the response to get the relevant data
            $scope.excipients = response;
        });

        $ionicModal.fromTemplateUrl('formulationTypeModal.html', {
            id: 4,
            scope: $scope
        }).then(function(modal) {
            $scope.oModal4 = modal;
        });

        $scope.openModal = function(index) {
            if (index == 4)
                $scope.oModal4.show();
        }

        // hide the model
        $scope.hideModal = function(index) {
            if (index == 4)
            //  $scope.currentSubstanceFn = angular.copy($scope.orig);
                $scope.oModal4.hide();
        }




        $scope.clearfilter = function() {
            console.log('dsdsds');
            $scope.searchSubstance = '';

        }

        //Reset the Current Formulation After adding//
        $scope.reset = function() {
            excipientService.resetExcipient();
            $scope.currentFormulation = angular.copy($scope.orig);
            $scope.currentFormulation.api = excipientService.getCurrentExcipientlist();
        };


        // A confirm dialog for add a new formulation to the database //
        $scope.showConfirm = function(formulation) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Confrim Excipient',
                template: 'Are you sure you want to use this substance for creating excipient?'
            });
            confirmPopup.then(function(res) {
                if (res) {
                    console.log($scope.currentFormulation);
                    formulationService.addFormulation(formulation);
                    $scope.reset();
                    //console.log($scope.currentFormulation);
                } else {
                    console.log('You are not sure');
                }
            });
        };

    }
]);
