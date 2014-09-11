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

   .controller('solubilityCtrl',function ($scope) {

  })

  .controller('substanceCtrl',function ($scope,solubilityService,substanceService,$ionicModal) {

    $scope.solubilities = [];
    $scope.substances = [];
    $scope.waterSolubilities = [];
    $scope.stabilities = [];

    //Solubility Modal//
    $ionicModal.fromTemplateUrl('solubilityModal.html', {
      id : 1,
      scope: $scope
        }).then(function(modal) {
    $scope.oModal1 = modal;
    });

    //Stability Model//
    $ionicModal.fromTemplateUrl('stabilityModal.html', {
      id : 2,
      scope: $scope
        }).then(function(modal) {
    $scope.oModal2 = modal;
    });


    //Open the model//

    $scope.openModal = function(index){
      if(index == 1) 
        $scope.oModal1.show();
      else if (index == 2)
        $scope.oModal2.show();
    }

    // hide the model
    $scope.hideModal = function(index){
      if(index == 1 )
        $scope.oModal1.hide();
      else if(index == 2 )
        $scope.oModal2.hide();
    }

   
//Show SubstanceList// 
	substanceService.getSubstanceList().success(function (response) {
        //Digging into the response to get the relevant data
         $scope.substances = response;
    });

//Get Solubility data from the service 
 solubilityService.getSolubilityList().success(function (response) {
        $scope.solubilities = response;
 });

// Add The WaterSolubility //
   $scope.addWaterSolubility = function(data) {        
    $scope.waterSolubilities = [{type : data.type }];
    console.log(data);
    $scope.modal.hide();
  };



  // Add The Stability//
   $scope.addStability = function(data) {        
    $scope.stabilities.push({type : data.type });
    console.log(data);
    $scope.hideModal(2);
  };

  // remove stability from the list
  $scope.onItemDelete = function(item) {
    $scope.stabilities.splice($scope.stabilities.indexOf(item), 1);
  };

// Add New Substance //
   $scope.addSubstance = function (substance) {
        substanceService.addSubstance($scope.substance);  
    }


   
  });


