'use strict';
/**
 * Controllers
 * @constructor
 */
angular.module('drugExpertSystem.solubilityController', [])


//Solubility Controller //
.controller('solubilityCtrl', ['$scope', '$ionicModal', 'solubilityService',
    function($scope, $ionicModal, solubilityService) {
        $scope.solubilities = [];
        $scope.currentSolubility = {};

/*
        //Get Solubilities data from the service 
        solubilityService.getSolubilityList().success(function(response) {
            $scope.solubilities = response;
            console.log($scope.currentSolubility);
        });
*/
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