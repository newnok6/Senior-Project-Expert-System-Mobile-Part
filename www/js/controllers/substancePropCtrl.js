'use strict';
/**
 * Controllers
 * @constructor
 */
angular.module('drugExpertSystem.substancePropController', [])


//Substance Properties Controller //
.controller('substancePropCtrl', function($scope, $ionicModal, substancePropService, solubilityService, flowablityService, solidstateService, hygroscopityService, particlesizeService, alcoholService, saltFormService) {

    // Substance Properties data that query from the json file//
    $scope.solubilities = [];
    $scope.flowabilityList = [];
    $scope.solidstateList = [];
    $scope.hygroscopityList = [];
    $scope.particleSizeList = [];
    $scope.alcoholList = [];
    $scope.saltformList = [];
    /////////////////////////


    // Current Substance Property that the user selected //
    $scope.currentSolubility = {};
    $scope.currentFlowability = {};
    $scope.currentSolidState = {};
    $scope.currentHygroscopity = {};
    $scope.currentParticleSize = {};
    $scope.currentAlcohol = {};
    $scope.currentSaltForm = {};
    /////////////////////////////


    //Get Substance Properties from the JSON file//
    substancePropService.getSubstancePropList().success(function(response) {
        $scope.solubilities = response.solubility;
        $scope.flowabilityList = response.flowability;
        $scope.solidstateList = response.solidstate;
        $scope.hygroscopityList = response.hygroscopity;
        $scope.particleSizeList = response.particlesize;
        $scope.alcoholList = response.solubility;
        $scope.saltformList = response.saltform;
    });



    //Set Solubility data to the service
    $scope.setCurrentSolubility = function(currentSolubility) {
        solubilityService.setCurrentSolubility(currentSolubility.type);
        $scope.hideModal(1);
        console.log($scope.currentSolubility);
    };

    //Reset Solubility data that the user selected
    $scope.resetCurrentSolubility = function() {
        solubilityService.resetCurrentSolubility();
        console.log(currentSolubility);
    };



    //Set Flowability data to the service
    $scope.setCurrentFlowability = function(currentFlowability) {
        flowablityService.setCurrentFlowability(currentFlowability.type);
        $scope.hideModal(2);
        console.log(currentFlowability);
    };

    //Reset Solubility data that the user selected
    $scope.resetCurrentFlowability = function() {
        flowablityService.resetCurrentFlowability();
        console.log(currentFlowability);
    };




    //Set Solid State  data to the service
    $scope.setCurrentSolidState = function(currentSolidState) {
        solidstateService.setCurrentSolidState(currentSolidState.type);
        $scope.hideModal(3);
        console.log(currentSolidState);
    };

    //Reset Solid State data that the user selected
    $scope.resetCurrentSolidState = function() {
        solidstateService.resetCurrentSolidState();
        console.log(currentSolubility);
    };



    //Set Hygroscopity data to the service
    $scope.setCurrentHygroscopity = function(currentHygroscopity) {
        hygroscopityService.setCurrentHygroscopity(currentHygroscopity.type);
        $scope.hideModal(4);
        console.log(currentHygroscopity);
    };

    //Reset Hygroscopity data that the user selected
    $scope.resetCurrentHygroscopity = function() {
        hygroscopityService.resetCurrentHygroscopity();
        console.log($scope.currentHygroscopity);
    };



    //Set Particle Size data to the service
    $scope.setCurrentPartcleSize = function(currentParticleSize) {
        particlesizeService.setCurrentParticlesize(currentParticleSize.type);
        $scope.hideModal(5);
        console.log(currentParticleSize);
    };

    //Reset Particle Size data that the user selected
    $scope.resetCurrentParticlesize = function() {
        particlesizeService.resetCurrentParticlesize();
        console.log($scope.currentParticlesize);
    };




    //Set Alcohol Solubility data to the service
    $scope.setCurrentAlcohol = function(currentAlcohol) {
        alcoholService.setCurrentAlcohol(currentAlcohol.type);
        $scope.hideModal(6);
        console.log($scope.currentAlcohol);
    };

    //Reset Alcohol Solubility data that the user selected
    $scope.resetCurrentAlcohol = function() {
        alcoholService.resetCurrentAlcohol();
        console.log($scope.currentAlcohol);
    };

    //Set SaltForm data to the service
    $scope.setCurrentSaltForm = function(currentSaltform) {
        saltFormService.setCurrentSaltForm(currentSaltform.type);
        $scope.hideModal(7);
        console.log($scope.currentSaltForm);
    };

    //Reset SaltForm data that the user selected
    $scope.resetCurrentSaltForm = function() {
        saltFormService.resetCurrentSaltForm();
        console.log($scope.currentSaltForm);
    };



    //Solubility Modal//
    $ionicModal.fromTemplateUrl('solubilityModal.html', {
        id: 1,
        scope: $scope
    }).then(function(modal) {
        $scope.oModal1 = modal;
    });

    //Flowability Modal//
    $ionicModal.fromTemplateUrl('flowabilityModal.html', {
        id: 2,
        scope: $scope
    }).then(function(modal) {
        $scope.oModal2 = modal;
    });

    //Solid State Modal//
    $ionicModal.fromTemplateUrl('solidstateModal.html', {
        id: 3,
        scope: $scope
    }).then(function(modal) {
        $scope.oModal3 = modal;
    });

    //Hygroscopity Modal//
    $ionicModal.fromTemplateUrl('hygroscopityModal.html', {
        id: 4,
        scope: $scope
    }).then(function(modal) {
        $scope.oModal4 = modal;
    });

    //Particle Size Modal//
    $ionicModal.fromTemplateUrl('particleSizeModal.html', {
        id: 5,
        scope: $scope
    }).then(function(modal) {
        $scope.oModal5 = modal;
    });

    // Alcohol Modal//
    $ionicModal.fromTemplateUrl('alcoholModal.html', {
        id: 6,
        scope: $scope
    }).then(function(modal) {
        $scope.oModal6 = modal;
    });

    //SaltForm Modal//
    $ionicModal.fromTemplateUrl('saltFormModal.html', {
        id: 7,
        scope: $scope
    }).then(function(modal) {
        $scope.oModal7 = modal;
    });

    //Open the model//
    $scope.openModal = function(index) {
        if (index == 1) {
            $scope.oModal1.show();
        } else if (index == 2) {
            $scope.oModal2.show();
        } else if (index == 3) {
            $scope.oModal3.show();
        } else if (index == 4) {
            $scope.oModal4.show();
        } else if (index == 5) {
            $scope.oModal5.show();
        } else if (index == 6) {
            $scope.oModal6.show();
        } else if (index == 7) {
            $scope.oModal7.show();
        }
    }

    // hide the model
    $scope.hideModal = function(index) {
        if (index == 1) {
            $scope.oModal1.hide();
        } else if (index == 2) {
            $scope.oModal2.hide();
        } else if (index == 3) {
            $scope.oModal3.hide();
        } else if (index == 4) {
            $scope.oModal4.hide();
        } else if (index == 5) {
            $scope.oModal5.hide();
        } else if (index == 6) {
            $scope.oModal6.hide();
        } else if (index == 7) {
            $scope.oModal7.hide();
        }
    }



    /*
    // Add The WaterSolubility //
   $scope.addWaterSolubility = function(data) {        
    $scope.waterSolubilities = [{type : data.type }];
    console.log(data);
    $scope.modal.hide();
  };
*/
});
