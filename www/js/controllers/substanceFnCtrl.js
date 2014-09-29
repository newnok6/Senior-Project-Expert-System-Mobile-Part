'use strict';
/**
 * Controllers
 * @constructor
 */
angular.module('drugExpertSystem.substanceFnController', [])
// Substance Function Controller//
.controller('substanceFnCtrl', ['$scope', '$ionicModal', 'substanceFnService',
    function($scope, $ionicModal, substanceFnService) {

        $scope.functionNameList = [];
        $scope.functionTypeList = [];
        $scope.currentSubstanceFn = {};
        $scope.orig = angular.copy($scope.currentSubstanceFn);
        $scope.currentSubstanceFnList = substanceFnService.getCurrentSubstanceFnlist();


        // Get Substance Function from Json. This function is used when adding or updating a new substance//
        substanceFnService.getSubstanceFnFromJson().success(function(response) {
            $scope.functionNameList = response.funtionName;
            $scope.functionTypeList = response.functionType;
            console.log($scope.functionTypeList);
            console.log($scope.cuurentSubstanceFn);
        });


        // This function will use the function name for finding the funciontype that relate with function name //
        $scope.filterFunctionType = function(functionName) {
            var result = {};
            result = $scope.functionTypeList[functionName];
            console.log($scope.currentSubstanceFn);
            return result;
        }

        //add substance function to the list //
        $scope.addSunstanceFn = function(substanceFn) {
            var setSubstance = substanceFn;
            substanceFnService.setSunstanceFn(setSubstance);
            $scope.hideModal(3);
        };

        // remove substance function from the list
        $scope.deleteSubstanceFnInList = function(substanceFn) {
            substanceFnService.deleteSubstanceFnOnlist(substanceFn);
        };


        //SubstanceFn Modal//
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
