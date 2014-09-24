
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

  factory('solubilityService',['$http' , function($http) {

    var solubility = {};
    var stringSolubility = ''; 


    solubility.addSolubility = function(solubility) {
      return $http({
        method : "POST",
        data : solubility,
        url : 'http://localhost:8081/solubility/add-solubility',
       // headers: {'Content-Type': 'application/json;charset=UTF-8'}
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
        url: 'js/solubility.json'
      });
    }

     solubility.setCurrentSolubility = function(solubility) {
          stringSolubility = solubility;
          console.log(stringSolubility);
         
    }

     solubility.resetCurrentSolubility = function() {
        stringSolubility = '';
         
    }

     solubility.getCurrentSolubility = function() {
      console.log(stringSolubility);
        return stringSolubility;      
    }
    
    return solubility;
}])

.factory('stabilityService',['$http' , function($http) {

    var stabilities = {};
    var currentStabilities = [];

     stabilities.setStabilities = function(stability) {
          currentStabilities.push(stability);
          console.log(currentStabilities);
    }

    stabilities.deleteStabilityOnlist = function(stability){
        currentStabilities.splice(currentStabilities.indexOf(stability),1);
        console.log(currentStabilities);
      }

    stabilities.resetStability = function(){
        currentStabilities = [];
        console.log(currentStabilities);
      }  

     stabilities.getStabilities = function() {
      console.log(currentStabilities);
        return currentStabilities;      
    }
    return stabilities;
}])


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
})

.factory('excipientService',['$http', function($http) {

    var excipient = {};

    excipient.addExcipient = function(excipient) {
      return $http({
        method : "POST",
        data : substance,
        url : 'http://localhost:8081/excipient/add-excipient'
      });
    }

    excipient.updateExcipient = function() {
      return $http({
        method : "PUT",
        url: 'http://localhost:8081/excipient/update-excipient'
      });
    }

    excipient.deleteExcipient = function() {
      return $http({
        method : "DELETE",
        url: 'http://localhost:8081/excipient/delete-excipient'
      });
    }

   excipient.getExcipientList = function() {
      return $http({
        url: 'http://localhost:8081/excipient/excipientList.json'
      });
    }
    return excipient;
}]);

