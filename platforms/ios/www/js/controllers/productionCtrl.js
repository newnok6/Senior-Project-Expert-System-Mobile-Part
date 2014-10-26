'use strict';
/**
 * Controllers
 * @constructor
 */
angular.module('drugExpertSystem.productionController', [])

 .controller('productionCtrl', function($scope, $timeout, $state, $ionicModal, $ionicPopup, $ionicSlideBoxDelegate, $ionicPopover, $ionicLoading, $ionicViewService, tabletFormulationService, solutionFormulationService, reformulationService, reformulationHistoryService) {

 			$scope.currentProduction = {};
 			$scope.formulations ={};

 		//Get the formulation list form the database by using production service //
        excipientService.getExcipientList().success(function(response) {
            $scope.excipients = response;
            console.log($scope.excipients);
        });


 	  });
