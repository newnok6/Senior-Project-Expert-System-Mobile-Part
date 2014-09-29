'use strict';
/**
 * Controllers
 * @constructor
 */
angular.module('drugExpertSystem.formulationController', [])


// Formulation Controller//
.controller('formulationCtrl',
    function($scope, $timeout, excipientService, formulationService, $ionicModal, $ionicPopup, $ionicViewService, $ionicSlideBoxDelegate) {

        $scope.excipients = [];
        $scope.excipientInlist = excipientService.getCurrentExcipientlist();
        $scope.currentExcipient = {
            substanceFunctions: [],
            usedWeight: '',
            minWeight: '',
            maxWeight: ''
        };
        $scope.excipientOrig = angular.copy($scope.currentExcipient);
        $scope.setSubstanceFunctions = [];
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
        $scope.formulations = [];

        //Show ExcipientList// 
        excipientService.getExcipientList().success(function(response) {
            //Digging into the response to get the relevant data
            $scope.excipients = response;
        });

        // Show the Formulation Type list //
        $ionicModal.fromTemplateUrl('formulationTypeModal.html', {
            id: 4,
            scope: $scope
        }).then(function(modal) {
            $scope.oModal4 = modal;
        });

          //Excipient Modal//
        $ionicModal.fromTemplateUrl('excipientModal.html', {
            id: 5,
            scope: $scope
        }).then(function(modal) {
            $scope.oModal5 = modal;
        });

        $scope.openModal = function(index) {
            if (index == 4){
                $scope.oModal4.show();
            }
            else{
                $ionicSlideBoxDelegate.slide(0);
                $scope.oModal5.show();
            } 
        }

        // hide the model
        $scope.hideModal = function(index) {
            if (index == 4){
            //  $scope.currentSubstanceFn = angular.copy($scope.orig);
                $scope.oModal4.hide();
            }
            else{
                 $scope.currentExcipient = angular.copy($scope.excipientOrig);
                 $scope.oModal5.hide();
            } 
        }

      /*

        //Open the model//
        $scope.openModal = function(index) {
            if (index == 5)
            $ionicSlideBoxDelegate.slide(0);
            $scope.oModal5.show();
        }

        $scope.hideModal = function(index) {
            if (index == 5)
            $scope.currentExcipient = angular.copy($scope.orig);
            $scope.oModal5.hide();
        }
*/
        // Set key for find the formulation type that relate with formulation name
        $scope.nextFormulationType = function(getkey) {
            console.log($scope.currentExcipient);
            $scope.setkey = getkey;
            $ionicSlideBoxDelegate.next();
        };

        // Get the FunctionType By the key that set before
        $scope.filter = function(key) {
            var set = [];
            set = $scope.excipients[key];
            $scope.currentExcipient.minWeight = $scope.excipients[key].minWeight;
            $scope.currentExcipient.maxWeight = set.maxWeight;
            $scope.currentExcipient.usedWeight = set.usedWeight;
           // $scope.currentExcipient.substanceFunctions = $scope.setSubstanceFunctions.substanceFunctions;
            console.log($scope.currentExcipient);
            console.log(set);
            return set;
            //

        }

        // add Excipient to formulation
        $scope.addExcipientToFormulation = function(currentExcipient) {
            $scope.currentExcipient.substanceFunctions.push($scope.setSubstanceFunctions.substanceFunctions);
            excipientService.setExcipientToList(currentExcipient);
            
            //currentStabilities.splice(currentStabilities.indexOf(stability), 1);
            $scope.currentExcipient = angular.copy($scope.excipientOrig);
            console.log($scope.currentExcipient);
            $scope.hideModal(5);
        }




        $scope.clearfilter = function() {
            console.log('dsdsds');
            $scope.searchSubstance = '';

        }

        // Cancel to adding or updating formulation.This function will clear the data //
        $scope.cancel = function() {
            $scope.reset();
            var history = $ionicViewService.getBackView();
            history.go();

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
            //$scope.currentFormulation.api
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
);
