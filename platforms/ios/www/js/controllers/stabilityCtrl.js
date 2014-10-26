'use strict';
/**
 * Controllers
 * @constructor
 */
angular.module('drugExpertSystem.stabilityController', [])

// Stability Controller //
.controller('stabilityCtrl', ['$scope', '$rootScope', '$ionicModal', '$ionicViewService', 'stabilityService',
    function($scope, $rootScope, $ionicModal, $ionicViewService, stabilityService) {
        $scope.currentStabilities = stabilityService.getStabilities();
        //Stability Modal//
        $ionicModal.fromTemplateUrl('stabilityModal.html', {
            id: 2,
            scope: $scope
        }).then(function(modal) {
            $scope.oModal2 = modal;
        });

        //Open the model//
        $scope.openModal = function(index) {
            if (index == 2)
                $scope.oModal2.show();
        }

        // hide the model
        $scope.hideModal = function(index) {
            if (index == 2)
                $scope.oModal2.hide();
        }

        //add stability to the list//
        $scope.addStability = function(stability) {
            stabilityService.setStabilities(stability);
            console.log(stability);
            $scope.hideModal(2);
        };

        // remove stability from the list
        $scope.deleteStabilityInList = function(stability) {
            stabilityService.deleteStabilityOnlist(stability);
        };

        $scope.goback = function() {
            var history = $ionicViewService.getBackView();
            history.go();
        }
    }
])