angular.module('drugExpertSystemApp.services', [])
  .factory('substancePropservice', function($http) {

    var substanceProp = {};

    substanceProp.getSolubilityList = function() {
      return $http({
        url: 'http://localhost:8081/subprop/solubilityList.json'
      });
    }

    substanceProp.getSolidstateList = function() {
      return $http({
       // url: 'http://localhost:8081/subprop/solidstateList.json'
      });
    }
    return substanceProp;
  }).

  factory('solubilityService', function($http) {

    var solubility = {};

    solubility.addSolubility = function(solubility) {
      return $http({
        method : "POST",
        data : solubility,
        url : 'http://localhost:8081/solubility/add-solubility'
      });
    }

    solubility.updateSolubility = function() {
      return $http({
        url: 'http://localhost:8081/subprop/solidstateList.json'
      });
    }

    solubility.deleteSolubility = function() {
      return $http({
        url: 'http://localhost:8081/subprop/solidstateList.json'
      });
    }

    solubility.getSolubilityList = function() {
      return $http({
        url: 'http://localhost:8081/solubility/solubilities.json'
      });
    }
    return solubility;
});

/*
angular.module('drugExpertSystem.services', [])

  .factory('substancePropservice', function($http) {

    var substanceProp = {};

    substanceProp.getSolubilityList = function() {
      return $http({
        url: 'http://localhost:8081/subprop/solubilityList.json'
      });
    }

    substanceProp.getSolidstateList = function() {
      return $http({
       // url: 'http://localhost:8081/subprop/solidstateList.json'
      });
    }
    return substanceProp;
  }).

  factory('solubilityService', function($http) {

    var solubility = {};

    solubility.addSolubility = function(solubility) {
      return $http({
        method : "POST",
        data : solubility,
        url : 'http://localhost:8081/solubility/add-solubility',
        headers: {'Content-Type': 'application/json;charset=UTF-8'}
      });
    }

    solubility.updateSolubility = function() {
      return $http({
        url: 'http://localhost:8081/subprop/solidstateList.json'
      });
    }

    solubility.deleteSolubility = function() {
      return $http({
        url: 'http://localhost:8081/subprop/solidstateList.json'
      });
    }

    solubility.getSolubilityList = function() {
      return $http({
    
        url: 'http://localhost:8081/solubility/solubilities.json'
      });
    }
    return solubility;
})

.factory('substanceService', function($http) {

    var substance = {};

    substance.addSubstance = function(substance) {
      return $http({
        method : "POST",
        data : substance,
        url : 'http://localhost:8081/substance/add-substance'
      });
    }

    substance.updateSubstance = function() {
      return $http({
        method : "PUT",
        url: 'http://localhost:8081/substance/update-substance'
      });
    }

    substance.deleteSubstance = function() {
      return $http({
        method : "DELETE",
        url: 'http://localhost:8081/substance/delete-substance'
      });
    }

    substance.getSubstanceList = function() {
      return $http({
        url: 'http://localhost:8081/substance/substanceList.json'
      });
    }
    return substance;
});
*/