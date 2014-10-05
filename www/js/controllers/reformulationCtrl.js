'use strict';
/**
 * Controllers
 * @constructor
 */
angular.module('drugExpertSystem.reformulationController', [])
// Excipient Controller//
.controller('reformulationCtrl', ['$scope', '$timeout', '$state','$ionicModal', '$ionicPopup', '$ionicSlideBoxDelegate', '$ionicPopover', '$ionicLoading', '$ionicViewService','reformulationService',
    function($scope, $timeout, $state, $ionicModal, $ionicPopup, $ionicSlideBoxDelegate, $ionicPopover, $ionicLoading, $ionicViewService,reformulationService) {
    	$scope.testJess = function(){
    			reformulationService.testJess();
    	}
    }
])
