'use strict';
/**
 * Controllers
 * @constructor
 */
angular.module('drugExpertSystem.controllers', [])

  .controller('MenuCtrl', function ($scope,$ionicSideMenuDelegate) {
    $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
  })

  .controller('SubMenuCtrl', function ($scope) {
    console.log('sub menu controller');

  })

   .controller('solubilityCtrl',['$scope','$ionicModal','solubilityService', function ($scope,$ionicModal,solubilityService) {
    $scope.solubilities = [];
    $scope.currentSolubility = {};

    //Get Solubilities data from the service 
        solubilityService.getSolubilityList().success(function (response) {
            $scope.solubilities = response;
        });

   //Set Solubility data to the service
        $scope.setCurrentSolubility = function(currentSolubility){
            solubilityService.setCurrentSolubility(currentSolubility.type);
            $scope.hideModal(1);
            console.log(currentSolubility);
        };

  //Reset Solubility data
        $scope.resetCurrentSolubility = function(){
            solubilityService.resetCurrentSolubility();
            console.log(currentSolubility);
        };


    //Solubility Modal//
    $ionicModal.fromTemplateUrl('solubilityModal.html', {
      id : 1,
      scope: $scope
        }).then(function(modal) {
    $scope.oModal1 = modal;
    });

    //Open the model//

    $scope.openModal = function(index){
      if(index == 1){
        $scope.oModal1.show();
      }
    }

    // hide the model
    $scope.hideModal = function(index){
      if(index == 1 )
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
  }])

   .controller('stabilityCtrl',['$scope','$ionicModal','stabilityService', function ($scope,$ionicModal,stabilityService){
    $scope.currentStabilities = stabilityService.getStabilities();
     //Stability Modal//
    $ionicModal.fromTemplateUrl('stabilityModal.html', {
      id : 2,
      scope: $scope
        }).then(function(modal) {
    $scope.oModal2 = modal;
    });

     //Open the model//
    $scope.openModal = function(index){
      if(index == 2) 
        $scope.oModal2.show();
    }

    // hide the model
    $scope.hideModal = function(index){
      if(index == 2 )
        $scope.oModal2.hide();
    }

    // Add The Stability//
   $scope.addStability = function(stability) {
   stabilityService.setStabilities(stability);
    $scope.hideModal(2);
  };

  // remove stability from the list
  $scope.deleteStabilityInList = function(stability) {
    stabilityService.deleteStabilityOnlist(stability);
  };

  

   }])

  // Substance Controller //
  .controller('substanceCtrl',['$scope','solubilityService','stabilityService','substanceService','$ionicModal','$ionicPopup', function ($scope,solubilityService,stabilityService,substanceService,$ionicModal,$ionicPopup) {

    $scope.substances = [];
    $scope.currentSubstance = {waterSolubility : '', stability : ''};
    $scope.currentSubstance.stability = stabilityService.getStabilities();
    $scope.orig = angular.copy($scope.currentSubstance);
   
//Show SubstanceList// 
	substanceService.getSubstanceList().success(function (response) {
        //Digging into the response to get the relevant data
         $scope.substances = response;
    });

// Get Current Solubility form Solubility Service//
$scope.reset = function() {
        solubilityService.resetCurrentSolubility();
        stabilityService.resetStability();
        $scope.currentSubstance = angular.copy($scope.orig);
        $scope.currentSubstance.stability = stabilityService.getStabilities();
    };

  $scope.getCurrentSolubility =function(){
     $scope.currentSubstance.waterSolubility = solubilityService.getCurrentSolubility();
     console.log($scope.currentSubstance);
     return $scope.currentSubstance.waterSolubility;

  };

 

    // A confirm dialog
   $scope.showConfirm = function(substance) {
     var confirmPopup = $ionicPopup.confirm({
       title: 'Create Substance',
       template: 'Are you sure you want to create this substance?'
     });
     confirmPopup.then(function(res) {
       if(res) {
          substanceService.addSubstance(substance);
          $scope.reset();
          console.log($scope.currentSubstance);
       } else {
         console.log('You are not sure');
       }
     });
   };

  }])

  // Excipient Controller//
  .controller('excipientCtrl',['$scope','substanceService','excipientService','$ionicModal','$ionicPopup', function ($scope,substanceService,excipientService,$ionicModal,$ionicPopup) {
    
    $scope.excipients = [];
    $scope.currentExcipient = {};
    $scope.substances = {};
    $scope.orig = angular.copy($scope.currentExcipient);
    $scope.searchSubstance = '';
   

//Show ExcipientList// 
  excipientService.getExcipientList().success(function (response) {
        //Digging into the response to get the relevant data
         $scope.excipients = response;
    });

  substanceService.getSubstanceList().success(function (response) {
        //Digging into the response to get the relevant data
         $scope.substances = response;
          console.log($scope.substances);
    });



$scope.clearfilter = function() {
  console.log('dsdsds');
  $scope.searchSubstance = '';
 
}

//Reset the Current Solubility After adding//
$scope.reset = function() {
        excipientService.resetCurrentExcipient();
        $scope.currentExcipient = angular.copy($scope.orig);
    };


    // A confirm dialog
   $scope.showConfirm = function(excipient) {
     var confirmPopup = $ionicPopup.confirm({
       title: 'Confrim Excipient',
       template: 'Are you sure you want to use this substance for creating excipient?'
     });
     confirmPopup.then(function(res) {
       if(res) {
          substanceService.addSubstance(substance);
          $scope.reset();
          console.log($scope.currentSubstance);
       } else {
         console.log('You are not sure');
       }
     });
   };

  }]);


