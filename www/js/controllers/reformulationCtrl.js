'use strict';
/**
 * Controllers
 * @constructor
 */
angular.module('drugExpertSystem.reformulationController', [])
    // Reformulation Controller//
    .controller('reformulationCtrl', function($scope, $timeout, $state, $ionicModal, $ionicPopup, $ionicSlideBoxDelegate, $ionicPopover, $ionicLoading, $ionicViewService, tabletFormulationService, solutionFormulationService, reformulationService) {

        $scope.formulations = [];
        $scope.formulation = {};
        $scope.production = {
            //formulation: '',
            //dfProperty : ''
        };
        $scope.dfProperty = {};

        $scope.dissolutionProfile = [];

        $scope.test = {};

        $scope.origonalDissolutionProfile = {};

        $scope.reformulationResult = {};

        $scope.currentReformulateResult = {};

        $scope.reformulateProduction = {
            //production : '',
            user: {
                userName: 'Binn'
            },
            accept: "false",
            inferenceEngine: 'None'
        };
       
        //Get Formulationlist from database //
        tabletFormulationService.getFormulationList().success(function(response) {
            angular.forEach(response, function(value, key) {
                $scope.formulations.push(value);
            })

            console.log($scope.formulations);
        });

        solutionFormulationService.getFormulationList().success(function(response) {
            angular.forEach(response, function(value, key) {
                $scope.formulations.push(value);
            });

            console.log($scope.formulations);
        });
        $scope.testJess = function() {
            reformulationService.testJess();
        };

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


        //Make Reformulation//
        $scope.makeReformulation = function() {

            $scope.dfProperty.dissolutionProfile = $scope.dissolutionProfile;
            console.log($scope.dfProperty);
            $scope.production.dfProperty = $scope.dfProperty;
            console.log($scope.production.dfProperty);
            $scope.reformulateProduction.production = $scope.production;

            reformulationService.makeReformulation($scope.reformulateProduction).success(function(response) {
            	$scope.reformulationResult = response;
            	console.log($scope.reformulationResult);
            });
            console.log("God Like!!!!");
            
            $state.go('base.reformulationContent.reformulationResult');
            //console.log($scope.formulations);



        };


        $scope.resultSection = "ruleBase";
        $scope.currentReformulateResult = $scope.reformulationResult[0];
        //Set Reformulation Result that user selected//
        $scope.setReformulateResult = function(section) {
            $scope.resultSection = section;
            if (section == "ruleBase") {
                $scope.currentReformulateResult = $scope.reformulationResult[0];
            } else if (section == "caseBase") {
                $scope.currentReformulateResult = $scope.reformulationResult[1];
            } else if (section == "hybrid") {
                $scope.currentReformulateResult = $scope.reformulationResult[2];
            }

        };
    });
