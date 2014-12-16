'use strict';
/**
 * Controllers
 * @constructor
 */
angular.module('drugExpertSystem.substanceFnController', [])
    // Substance Function Controller//
    .controller('substanceFnCtrl',
        function($scope, $ionicModal, substanceFnService, $ionicSlideBoxDelegate) {

            $scope.functionNameList = [];
            $scope.functionTypeList = [];
            $scope.currentSubstanceFn = {
                funtionName:''
            };
            $scope.orig = angular.copy($scope.currentSubstanceFn);
            $scope.currentSubstanceFnList = substanceFnService.getCurrentSubstanceFnlist();
            $scope.setSubstanceFnkey = {};

            // Get Substance Function from Json. This function is used when adding or updating a new substance//
            substanceFnService.getSubstanceFnFromJson().success(function(response) {
                $scope.functionNameList = response.funtionName;
                $scope.functionTypeList = response.functionType;
                console.log($scope.functionTypeList);
                console.log($scope.cuurentSubstanceFn);
            });

           
            // This function use for silding the dialog //
            $scope.nextDialogSilde = function(getKey){
                console.log(getKey);
                $scope.setKey = getKey
                console.log($scope.setKey);
                $ionicSlideBoxDelegate.next();
                
            };

            //Set the key


            // This function will use the function name for finding the funciontype that relate with function name //
            $scope.filterFunctionType = function(setFunctionName) {
                var result = [];
                result = $scope.functionTypeList[setFunctionName];
                return result;
            };

            //add substance function to the list //
            $scope.addSunstanceFn = function(substanceFn) {
                substanceFn.funtionName = $scope.setKey;
                substanceFnService.setSunstanceFn(substanceFn);
                $scope.cuurentSubstanceFn = angular.copy($scope.orig);
                $scope.hideModal(1);
            };

            // remove substance function from the list
            $scope.deleteSubstanceFnInList = function(substanceFn) {
                substanceFnService.deleteSubstanceFnOnlist(substanceFn);
            };


            //SubstanceFn Modal (Old Version)//
            $ionicModal.fromTemplateUrl('substanceFnModalV2.html', {
                id: 1,
                scope: $scope
            }).then(function(modal) {
                $scope.oModal1 = modal;
            });

            //SubstanceFn Modal (Old Version)//
            $ionicModal.fromTemplateUrl('substanceFunctionModal.html', {
                id: 2,
                scope: $scope
            }).then(function(modal) {
                $scope.oModal2 = modal;
            });

            //Open the model//
            $scope.openModal = function(index) {
                if (index == 1) {
                    $scope.oModal1.show();
                } else if (index == 2) {
                    $ionicSlideBoxDelegate.slide(0);
                    $scope.oModal2.show();
                }
            };

            // hide the model
            $scope.hideModal = function(index) {
                if (index == 1){
                    $scope.currentSubstanceFn = angular.copy($scope.orig);
                    $scope.oModal1.hide();
                }else if  (index == 2){
                    $scope.cuurentSubstanceFn = angular.copy($scope.orig);
                    $scope.oModal2.hide();
                }
            };
        }
    )
