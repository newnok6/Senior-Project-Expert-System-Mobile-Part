'use strict';
/**
 * Controllers
 * @constructor
 */
angular.module('drugExpertSystem.templateController', [])

.controller('MenuCtrl', function($scope, $state, solubilityService, stabilityService, $ionicSideMenuDelegate) {
    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
        console.log("test");
    };

    // Go to Excipient Content and refresh existing data //
    $scope.goExcipient = function() {
        solubilityService.resetCurrentSolubility();
        stabilityService.resetStability();
        $state.go("base.excipientContent.showAllExcipient");
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
        $state.go("base.formulationContent.showAllFormulation");
    };

})

.controller('SubMenuCtrl', function($scope) {
    console.log('sub menu controller');

})