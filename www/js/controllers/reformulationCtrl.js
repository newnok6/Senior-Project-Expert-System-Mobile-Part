'use strict';
/**
 * Controllers
 * @constructor
 */
angular.module('drugExpertSystem.reformulationController', [])
    // Reformulation Controller//
    .controller('reformulationCtrl', function($scope, $timeout, $state, $ionicModal, $ionicPopup, $ionicSlideBoxDelegate, $ionicPopover, $ionicLoading, $ionicViewService, formulationService, reformulationService, reformulationHistoryService, solubilityService, flowablityService, solidstateService, hygroscopityService, particlesizeService, alcoholService, saltFormService, stabilityService) {

        $scope.formulations = [];
        $scope.formulation = {};

        // Production
        $scope.production = {};
        $scope.originalProduction = angular.copy($scope.production);


        // Df Property in the Production //
        $scope.dfProperty = {};
        $scope.originalDfProperty = angular.copy($scope.dfProperty);


        //Active Ingredient Properties in production //
        $scope.activeIngredient = {
            waterSolubility: '',
            flowability: '',
            solidState: '',
            hygroscopicity: '',
            particleSize: '',
            alcoholSolubility: '',
            saltForm: '',
            stability: ''
        };

        $scope.activeIngredient.stability = stabilityService.getStabilities();
        $scope.activeIngredientOrginal = angular.copy($scope.activeIngredient);

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
            if ($scope.activeIngredient.waterSolubility != $scope.waterSolubility.getCurrentSolubility()) {
                $scope.activeIngredient.waterSolubility = $scope.waterSolubility.getCurrentSolubility();
            }
        });

        // Watch Substance water solubility change or not /
        $scope.$watch('flowability.getCurrentFlowability()', function() {
            if ($scope.activeIngredient.flowability != $scope.flowability.getCurrentFlowability()) {
                $scope.activeIngredient.flowability = $scope.flowability.getCurrentFlowability();
            }
        });

        // Watch Substance water solubility change or not /
        $scope.$watch('solidState.getCurrentSolidState()', function() {
            if ($scope.activeIngredient.solidState != $scope.solidState.getCurrentSolidState()) {
                $scope.activeIngredient.solidState = $scope.solidState.getCurrentSolidState();
            }
        });

        // Watch Substance water solubility change or not /
        $scope.$watch('hygroscopicity.getCurrentHygroscopity()', function() {
            if ($scope.activeIngredient.hygroscopicity != $scope.hygroscopicity.getCurrentHygroscopity()) {
                $scope.activeIngredient.hygroscopicity = $scope.hygroscopicity.getCurrentHygroscopity();
            }
        });

        // Watch Substance water solubility change or not /
        $scope.$watch('particleSize.getCurrentParticlesize()', function() {
            if ($scope.activeIngredient.particleSize != $scope.particleSize.getCurrentParticlesize()) {
                $scope.activeIngredient.particleSize = $scope.particleSize.getCurrentParticlesize();
            }
        });

        // Watch Substance water solubility change or not /
        $scope.$watch('alcohol.getCurrentAlcohol()', function() {
            if ($scope.activeIngredient.alcoholSolubility != $scope.alcohol.getCurrentAlcohol()) {
                $scope.activeIngredient.alcoholSolubility = $scope.alcohol.getCurrentAlcohol();
            }
        });

        // Watch Substance water solubility change or not /
        $scope.$watch('saltForm.getCurrentSaltForm()', function() {
            if ($scope.activeIngredient.saltForm != $scope.saltForm.getCurrentSaltForm()) {
                $scope.activeIngredient.saltForm = $scope.saltForm.getCurrentSaltForm();
            }
        });
        // Dissolution Profile in the DF Property //
        $scope.dissolutionProfile = [];
        $scope.originalDissolutionProfile = angular.copy($scope.dissolutionProfile);

        $scope.test = {};

        $scope.origonalDissolutionProfile = {};

        $scope.reformulationResult = {};

        $scope.currentReformulatedProduction = {};

        $scope.reformulatedProductionList = [];



        //Reformulation History that will be save after the user select "save reformulated production" //
        $scope.reformulationHistory = {
            user: {
                userName: 'Binn'
            },
            date: '',
            reformulatedProductionList: ''
        }




        //Get Formulationlist from database //
        formulationService.getFormulationList().success(function(response) {
            console.log(response);
            $scope.formulations = response;
        });

        /*
        $scope.testJess = function() {
            reformulationService.testJess();
        };
        */

        // Get Formulation data from the database //
        $scope.getFormulationList = function() {
            formulationService.getFormulationList().success(function(response) {
                $scope.formulations = response;
            });

        }

        // create a new reformulation history to the database//
        $scope.createReformulationHistory = function(reformulationHistory) {
            reformulationHistoryService.createReformulationHistory(reformulationHistory);
        }

        // Show the Formulation Type list //
        $ionicModal.fromTemplateUrl('dissolutionProfileModal.html', {
            id: 7,
            scope: $scope
        }).then(function(modal) {
            $scope.oModal7 = modal;
        });

        $scope.openModal = function(index) {
            if (index == 7) {
                $scope.oModal7.show();
            }
        };
        // hide the model
        $scope.hideModal = function(index) {
            if (index == 7)
                $scope.oModal7.hide();
        };


        /*      
         $scope.$watch('DFProperty', function() {
            if ($scope.DFProperty.dissolutionProfile != $scope.dissolutionProfile) {
                $scope.DFProperty.dissolutionProfile = $scope.dissolutionProfile;
                console.log($scope.DFProperty.dissolutionProfile);
                console.log("See you");
            }
        });
        */


        $scope.openDissolutionProfileSetting = function() {
            //$scope.origonalDissolutionProfile = angular.copy($scope.dissolutionProfile);
            console.log($scope.dfProperty.dissolutionProfile);
            $scope.openModal(7);
        };

        $scope.createDisSolutionProfile = function() {
            console.log($scope.dissolutionProfile);
            console.log($scope.dfProperty.dissolutionProfile);
            $scope.hideModal(7);
        };
        $scope.cancelDissolutionProfileSetting = function() {
            //$scope.dissolutionProfile = $scope.origonalDissolutionProfile;
            $scope.hideModal(7);
        };




        //Start Reformulation//
        $scope.startReformulation = function() {

            $scope.dfProperty.dissolutionProfile = $scope.dissolutionProfile;
            console.log($scope.dfProperty);
            $scope.production.dfProperty = $scope.dfProperty;
            $scope.production.activeIngredient = $scope.activeIngredient;
            $scope.activeIngredient.stability = stabilityService.getStabilities();
            console.log($scope.production.dfProperty);
            // $scope.reformulateProduction.production = $scope.production;

            reformulationService.makeReformulation($scope.production).success(function(response) {
                $scope.reformulatedProductionList = response;
                $scope.currentReformulatedProduction = $scope.reformulatedProductionList[0];
                console.log($scope.reformulatedProductionList);
                $ionicLoading.show({
                    template: '<i class="icon ion-loading-c"></i>',
                    showDelay: 5 // If the delay is too fast and you also change states, while the loader is showing, you can get flashing behavior
                });

                // Hide the loadingIndicator 1500 ms later
                $timeout(function() {
                    $ionicLoading.hide();
                }, 3000);

                // 500 ms after showing the loadingIndicator, do a state change.  The idea is that when the loader is hidden, you will be in the new state.  But as you'll see there is flashing.
                $timeout(function() {
                    $state.go('base.reformulationContent.reformulationResult');
                }, 1000);

            });





        };


        // Set Current Reformulated Product follow the tab that user selected //
        $scope.resultSection = "ruleBase";

        //Set Reformulation Result that user selected//
        $scope.setReformulateResult = function(section) {
            $scope.resultSection = section;
            if (section == "ruleBase") {
                $scope.currentReformulatedProduction = $scope.reformulatedProductionList[0];
            } else if (section == "caseBase") {
                $scope.currentReformulatedProduction = $scope.reformulatedProductionList[1];
            } else if (section == "hybrid") {
                $scope.currentReformulatedProduction = $scope.reformulatedProductionList[2];
            }

        };


        //Reformulation Result Option such as "save"//
        $ionicPopover.fromTemplateUrl('reformulateResultOption.html', {
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

        // A confirm dialog for saveing the reformulate result to the database
        $scope.showConfirmForCreateHistory = function() {
            $scope.closePopover();
            var confirmPopup = $ionicPopup.confirm({
                title: 'Save Reformulate Production',
                template: 'Are you sure you want to save this reformulation to the history ?'
            });
            confirmPopup.then(function(res) {
                if (res) {
                    $scope.reformulationHistory.date = new Date();
                    $scope.reformulationHistory.reformulatedProductionList = $scope.reformulatedProductionList;
                    $scope.createReformulationHistory($scope.reformulationHistory);
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
                        $state.go('base.reformulationContent.formulationSelection');
                    }, 500);

                } else {
                    console.log('You are not sure');
                }
            });
        };

        // refresh formulation data//
        $scope.doRefresh = function() {
            $timeout(function() {
                $scope.getFormulationList();

                //Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');

            }, 1000);

        };

        $scope.reset = function() {
            solubilityService.resetCurrentSolubility();
            flowablityService.resetCurrentFlowability();
            solidstateService.resetCurrentSolidState();
            hygroscopityService.resetCurrentHygroscopity();
            particlesizeService.resetCurrentParticlesize();
            alcoholService.resetCurrentAlcohol();
            saltFormService.resetCurrentSaltForm;
            stabilityService.resetStability();

            $scope.activeIngredient = angular.copy($scope.activeIngredientOrginal);
            $scope.activeIngredientOrginal.stability = stabilityService.getStabilities();
            $scope.production = angular.copy($scope.originalProduction);
            $scope.dfProperty = angular.copy($scope.originalDfProperty);
            $scope.dissolutionProfile = angular.copy($scope.originalDissolutionProfile);
        }

        $scope.cancel = function() {
            $scope.reset();
            var history = $ionicViewService.getBackView();
            history.go();
        };

        $scope.back = function() {
            var history = $ionicViewService.getBackView();
            history.go();
        }

    });
