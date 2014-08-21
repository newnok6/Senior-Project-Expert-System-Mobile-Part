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

   .controller('solubilityCtrl',function($scope) {

   

  })

  .controller('substanceCtrl',function ($scope,substanceService,$ionicModal) {

    $scope.solubilities = [{type : "1"},{type : "2"}];
    $scope.substances = [];
   

	substanceService.getSubstanceList().success(function (response) {
        //Digging into the response to get the relevant data
         $scope.substances = response;
    });

   $scope.addSubstance = function (substance) {
        substanceService.addSubstance($scope.substance);
        
    }

  $ionicModal.fromTemplateUrl('waterSolubilityModal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.addWaterSolubility = function(data) {        
    $scope.waterSolubilities = data;
    console.log(data);
    $scope.modal.hide();
  };

  $scope.createContact = function(u) {        
    $scope.contacts = [{ name: u.firstName + ' ' + u.lastName }];
    $scope.modal.hide();
    console.log(u.firstName);
  };
 
  });


