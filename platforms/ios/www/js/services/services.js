'use-strict'; 

angular.module('drugExpertSystem.services', [])

.factory('substancePropService',['$http', function($http) {

    var substanceProp = {};

    substanceProp.getSubstancePropList = function() {
        return $http({
            url: 'json/substanceProp.json'
        });
    }
    return substanceProp;
}
])

.factory('solubilityService', ['$http',
    function($http) {

        var solubility = {};
        var stringSolubility = '';

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

.factory('flowablityService', ['$http',
    function($http) {

        var flowability = {};
        var stringFlowability = '';

    
        flowability.setCurrentFlowability = function(flowability) {
            stringFlowability = flowability;
            console.log(stringFlowability);

        }

        flowability.resetCurrentFlowability = function() {
            stringFlowability = '';

        }

        flowability.getCurrentFlowability = function() {
            console.log(stringFlowability);
            return stringFlowability;
        }

        return flowability;
    }
])

.factory('solidstateService', ['$http',
    function($http) {

        var solidstate = {};
        var stringSolidstate = '';

    
        solidstate.setCurrentSolidState = function(solidstate) {
            stringSolidstate = solidstate;
            console.log(stringSolidstate);

        }

        solidstate.resetCurrentSolidState = function() {
            stringSolidstate = '';

        }

        solidstate.getCurrentSolidState = function() {
            console.log(stringSolidstate);
            return stringSolidstate;
        }

        return solidstate;
    }
])

.factory('hygroscopityService', ['$http',
    function($http) {

        var hygroscopity = {};
        var stringHygroscopity = '';

        

        hygroscopity.setCurrentHygroscopity = function(hygroscopity) {
            stringHygroscopity = hygroscopity;
            console.log(stringHygroscopity);

        }

        hygroscopity.resetCurrentHygroscopity = function() {
            stringHygroscopity = '';

        }

        hygroscopity.getCurrentHygroscopity = function() {
            console.log(stringHygroscopity);
            return stringHygroscopity;
        }

        return hygroscopity;
    }
])

.factory('particlesizeService', ['$http',
    function($http) {

        var particlesize = {};
        var stringParticlesize = '';

    
        particlesize.setCurrentParticlesize = function(particlesize) {
            stringParticlesize = particlesize;
            console.log(stringParticlesize);

        }

        particlesize.resetCurrentParticlesize = function() {
            stringParticlesize = '';

        }

        particlesize.getCurrentParticlesize = function() {
            console.log(stringParticlesize);
            return stringParticlesize;
        }

        return particlesize;
    }
])

.factory('alcoholService', ['$http',
    function($http) {

        var alcohol = {};
        var stringAlcohol = '';

        alcohol.setCurrentAlcohol = function(alcohol) {
            stringAlcohol = alcohol;
            console.log(stringAlcohol);

        }

        alcohol.resetCurrentAlcohol = function() {
            stringAlcohol = '';

        }

        alcohol.getCurrentAlcohol = function() {
            console.log(stringAlcohol);
            return stringAlcohol;
        }

        return alcohol;
    }
])

.factory('saltFormService', ['$http',
    function($http) {

        var saltForm = {};
        var stringSaltForm = '';

        saltForm.setCurrentSaltForm = function(saltForm) {
            stringSaltForm = saltForm;
            console.log(stringSaltForm);

        }

        saltForm.resetCurrentSaltForm = function() {
            stringSaltForm = '';

        }

        saltForm.getCurrentSaltForm = function() {
            console.log(stringSaltForm);
            return stringSaltForm;
        }

        return saltForm;
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
            url: 'http://54.169.76.170:8080/oegp/substance/add-substance'
        });
    }

    substance.updateSubstance = function(substance) {
        return $http({
            method: "PUT",
            data: substance,
            url: 'http://54.169.76.170:8080/oegp/substance/update-substance'
        });
    }

    substance.deleteSubstance = function(substanceId) {
        return $http({
            method: "DELETE",
            url: 'http://54.169.76.170:8080/oegp/substance/remove-substance/' + substanceId
        });
    }

    substance.getSubstanceList = function() {
        return $http({
            url: 'http://54.169.76.170:8080/oegp/substance/substanceList.json?callback=JSON_CALLBACK'
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
                url: 'http://54.169.76.170:8080/oegp/excipient/add-excipient'
            });
        }

        excipient.updateExcipient = function(excipient) {
            return $http({
                method: "PUT",
                data: excipient,
                url: 'http://54.169.76.170:8080/oegp/excipient/update-excipient'
            });
        }

        excipient.deleteExcipient = function(excipientId) {
            return $http({
                method: "DELETE",
                url: 'http://54.169.76.170:8080/oegp/excipient/remove-excipient/' + excipientId
            });
        }

        excipient.getExcipientList = function() {
            return $http({
                url: 'http://54.169.76.170:8080/oegp/excipient/excipientList.json'
            });
        }

        excipient.getSubstanceListForExcipient = function() {
            return $http({
                url: 'http://54.169.76.170:8080/oegp/excipient/substanceListForExcipient.json'
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

.factory('formulationService', ['$http',
    function($http) {

        var formulation = {};

        formulation.addFormulation = function(currentformulation) {
            return $http({
                method: "POST",
                data: currentformulation,
                url: 'http://54.169.76.170:8080/oegp/formulation/add-formulation'
            });
        }

        formulation.updateFormulation = function(currentformulation) {
            return $http({
                method: "PUT",
                data : currentformulation,
                url: 'http://54.169.76.170:8080/oegp/formulation/update-formulation'
            });
        }

        formulation.deleteFormulation = function(currentformulationId) {
            return $http({
                method: "DELETE",
                url: 'http://54.169.76.170:8080/oegp/formulation/remove-formulation/'+ currentformulationId
            });
        }

        formulation.getFormulationList = function() {
            return $http({
                url: 'http://54.169.76.170:8080/oegp/formulation/formulationList.json'
            });
        }
        return formulation;
    }
])
.factory('productionService', ['$http',
    function($http) {

        var production = {};

        production.addProduction = function(currentProduction) {
            return $http({
                method: "POST",
                data: currentformulation,
                url: 'http://54.169.76.170:8080/oegp/production/create-production'
            });
        }

        production.updateProduction = function(currentProduction) {
            return $http({
                method: "PUT",
                data: currentformulation,
                url: 'http://54.169.76.170:8080/oegp/production/update-production'
            });
        }

        production.deleteProduction = function(currentProductionId) {
            return $http({
                method: "DELETE",
                url: 'http://54.169.76.170:8080/oegp/production/remove-production/' + currentProductionId
            });
        }

        production.getProductionList = function() {
            return $http({
                url: 'http://54.169.76.170:8080/oegp/production/productionlist.json'
            });
        }
        return production;
    }
])

.factory('reformulationService', ['$http',
    function($http) {

        var reformulation = {};

        reformulation.makeReformulation = function(reformulateProduction) {
            return $http({
                method: "POST",
                data: reformulateProduction,
                url: 'http://54.169.76.170:8080/oegp/inference-engine/reformulate-production'
            });
        }

/*
        reformulation.updateFormulation = function(currentformulation) {
            return $http({
                method: "PUT",
                data: currentformulation,
                url: 'http://localhost:8081/solution-formulation/update-solution-formulation'
            });
        }

        reformulation.deleteFormulation = function(currentformulationId) {
            return $http({
                method: "DELETE",
                url: 'http://localhost:8081/solution-formulation/remove-solution-formulation/' + currentformulationId
            });
        }

        reformulation.getFormulationList = function() {
            return $http({
                url: 'http://localhost:8081/solution-formulation/solutionformulationList.json'
            });
        }
*/
         reformulation.testJess = function() {
            return $http({
                method: "POST",
                url: 'http://localhost:8081/rule-base/testjess'
            });
        }
        return reformulation;
    }
])

.factory('reformulationHistoryService', ['$http',
    function($http) {

        var reformulationHistory = {};

        reformulationHistory.createReformulationHistory = function(reformulationHistory) {
            return $http({
                method: "POST",
                data: reformulationHistory,
                url: 'http://54.169.76.170:8080/oegp/reformulation-history/create-reformulation-history'
            });
        }

        reformulationHistory.updateReformulationHistory = function(reformulationHistory) {
            return $http({
                method: "PUT",
                data: reformulationHistory,
                url: 'http://54.169.76.170:8080/oegp/reformulation-history/update-reformulation-history'
            });
        }

        reformulationHistory.deleteReformulationHistory = function(reformulationHistoryId) {
            return $http({
                method: "DELETE",
                url: 'http://54.169.76.170:8080/oegp/reformulation-history/remove-reformulation-history/' + reformulationHistoryId
            });
        }

        reformulationHistory.getReformulationHistoryList = function() {
            return $http({
                url: 'http://54.169.76.170:8080/oegp/reformulation-history/reformulation-history-list.json'
            });
        }

        return reformulationHistory;
    }
]);
