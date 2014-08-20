'use strict';
/**
 * Controllers
 * @constructor
 */
angular.module('drugExpertSystem.controllers', [])

  .controller('MenuCtrl', function ($scope) {
    console.log('menu controller');
  })

  .controller('SubMenuCtrl', function ($scope) {
    console.log('sub menu controller');

  })

   .controller('solubilityCtrl',function($scope,solubilityService) {

    $scope.solubilities = [];

	solubilityService.getSolubilityList().success(function (response) {
        //Digging into the response to get the relevant data
         $scope.solubilities = response;
    });

   $scope.addSolubility = function (solubility) {
        solubilityService.addSolubility($scope.solubility);
        
    }

  })

  .controller('substanceCtrl',function($scope,substanceService) {

    $scope.substances = [];

	substanceService.getSubstanceList().success(function (response) {
        //Digging into the response to get the relevant data
         $scope.substances = response;
    });

   $scope.addSubstance = function (substance) {
        substanceService.addSubstance($scope.substance);
        
    }
 
  });


