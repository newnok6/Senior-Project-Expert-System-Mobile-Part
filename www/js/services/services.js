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

factory('solubilityService', ['$http',
    function($http) {

        var solubility = {};
        var stringSolubility = '';

        solubility.getSolubilityList = function() {
            return $http({
                url: 'json/solubility.json'
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
    }
])

.factory('stabilityService', ['$http',
    function($http) {

        var stabilities = {};
        var currentStabilities = [];

        stabilities.setStabilities = function(stability) {
            currentStabilities.push(stability);
            console.log(currentStabilities);
            
        }

        stabilities.deleteStabilityOnlist = function(stability) {
            currentStabilities.splice(currentStabilities.indexOf(stability), 1);
            console.log(currentStabilities);
        }

        stabilities.resetStability = function() {
            currentStabilities = [];
            console.log(currentStabilities);
        }

        stabilities.getStabilities = function() {
            console.log(currentStabilities);
            return currentStabilities;
        }
        return stabilities;
    }
])


.factory('substanceService', function($http) {

    var substance = {};

    substance.addSubstance = function(substance) {
        return $http({
            method: "POST",
            data: substance,
            url: 'http://localhost:8081/substance/add-substance'
        });
    }

    substance.updateSubstance = function(substance) {
        return $http({
            method: "PUT",
            data: substance,
            url: 'http://localhost:8081/substance/update-substance'
        });
    }

    substance.deleteSubstance = function(substanceId) {
        return $http({
            method: "DELETE",
            url: 'http://localhost:8081/substance/remove-substance/' + substanceId
        });
    }

    substance.getSubstanceList = function() {
        return $http({
            url: 'http://localhost:8081/substance/substanceList.json'
        });
    }
    return substance;
})

.factory('substanceFnService', ['$http',
    function($http) {

        var substanceFn = {};
        var currentsubstanceFnlist = [];

        substanceFn.setSunstanceFn = function(currentSubstanceFn) {
            currentsubstanceFnlist.push(currentSubstanceFn);
            console.log(currentsubstanceFnlist);
        }

        substanceFn.deleteSubstanceFnOnlist = function(currentSubstanceFn) {
            currentsubstanceFnlist.splice(currentsubstanceFnlist.indexOf(currentSubstanceFn), 1);
            console.log(currentsubstanceFnlist);
        }

        substanceFn.resetsSubstanceFn = function() {
            currentsubstanceFnlist = [];
            console.log(currentsubstanceFnlist);
        }

        substanceFn.getCurrentSubstanceFnlist = function() {
            console.log(currentsubstanceFnlist);
            return currentsubstanceFnlist;
        }

        substanceFn.getSubstanceFnFromJson = function() {
            return $http({
                url: 'json/substanceFunction.json'
            });
        }
        return substanceFn;
    }
])

.factory('excipientService', ['$http',
    function($http) {

        var excipient = {};
        var currentExcipientlist = [];

        excipient.addExcipient = function(excipient) {
            return $http({
                method: "POST",
                data: excipient,
                url: 'http://localhost:8081/excipient/add-excipient'
            });
        }

        excipient.updateExcipient = function(excipient) {
            return $http({
                method: "PUT",
                data: excipient,
                url: 'http://localhost:8081/excipient/update-excipient'
            });
        }

        excipient.deleteExcipient = function(excipientId) {
            return $http({
                method: "DELETE",
                url: 'http://localhost:8081/excipient/remove-excipient/' + excipientId
            });
        }

        excipient.getExcipientList = function() {
            return $http({
                url: 'http://localhost:8081/excipient/excipientList.json'
            });
        }

        excipient.setExcipientToList = function(currentExcipient) {
            currentExcipientlist.push(currentExcipient);
            console.log(currentExcipientlist);
        }

        excipient.deleteExcipientOnlist = function(currentExcipient) {
            currentExcipientlist.splice(currentExcipientlist.indexOf(currentExcipient), 1);
            console.log(currentExcipientlist);
        }

        excipient.resetExcipient = function() {
            currentExcipientlist = [];
            console.log(currentExcipientlist);
        }

        excipient.getCurrentExcipientlist = function() {
            console.log(currentExcipientlist);
            return currentExcipientlist;
        }
        return excipient;
    }
])

.factory('tabletFormulationService', ['$http',
    function($http) {

        var tabletformulation = {};

        tabletformulation.addFormulation = function(currentformulation) {
            return $http({
                method: "POST",
                data: currentformulation,
                url: 'http://localhost:8081/tablet-formulation/add-tablet-formulation'
            });
        }

        tabletformulation.updateFormulation = function(currentformulation) {
            return $http({
                method: "PUT",
                data : currentformulation,
                url: 'http://localhost:8081/tablet-formulation/update-tablet-formulation'
            });
        }

        tabletformulation.deleteFormulation = function(currentformulationId) {
            return $http({
                method: "DELETE",
                url: 'http://localhost:8081/tablet-formulation/remove-tablet-formulation/'+ currentformulationId
            });
        }

        tabletformulation.getFormulationList = function() {
            return $http({
                url: 'http://localhost:8081/tablet-formulation/tabletformulationList.json'
            });
        }
        return tabletformulation;
    }
])

.factory('solutionFormulationService', ['$http',
    function($http) {

        var solutionformulation = {};

        solutionformulation.addFormulation = function(currentformulation) {
            return $http({
                method: "POST",
                data: currentformulation,
                url: 'http://localhost:8081/solution-formulation/add-solution-formulation'
            });
        }

        solutionformulation.updateFormulation = function(currentformulation) {
            return $http({
                method: "PUT",
                data: currentformulation,
                url: 'http://localhost:8081/solution-formulation/update-solution-formulation'
            });
        }

        solutionformulation.deleteFormulation = function(currentformulationId) {
            return $http({
                method: "DELETE",
                url: 'http://localhost:8081/solution-formulation/remove-solution-formulation/' + currentformulationId
            });
        }

        solutionformulation.getFormulationList = function() {
            return $http({
                url: 'http://localhost:8081/solution-formulation/solutionformulationList.json'
            });
        }
        return solutionformulation;
    }
]);
