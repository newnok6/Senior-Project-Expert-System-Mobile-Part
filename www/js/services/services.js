'use-strict';

angular.module('drugExpertSystem.services', ['ngCookies', 'ngCordova.plugins.localStorage'])

.factory('userService', ['$http', '$rootScope', '$timeout', '$q', '$cookieStore', '$cordovaLocalStorage',
    function($http, $rootScope, $timeout, $q, $cookieStore, $cordovaLocalStorage) {

        // CAMT Server Path = http://54.169.76.170:8080/oegp
        // Local Host Path = http://localhost:8081
        var self = this
        var serverPath = 'http://localhost:8081';
        var deferred = $q.defer();
        var user = {};
        var currentUser = {};

        user.init = function() {
            //set the session token in the http header
            // $http.defaults.headers.common['X-Access-Token'] = $cookieStore.get('sessionToken') || "";
            // $cookieStore.put('app_user','newnok6');
            var userData = $cookieStore.get('app_user') || {
                email: '',
                password: '',
                type: ''
            };

            //quick check to make sure it's a string ()
            if (typeof(userData) === "string") {
                userData = JSON.parse(userData);
            }
            // // setting currentUser
            // console.log(userData);
            self.currentUser = userData;
            console.log(self.currentUser);

        }

        user.updateCurrentUser = function(user, options) {

            var opts = {
                remove: false,
                set: false
            }

            angular.extend(opts, options);
            //angular.extend(self.currentUser, user);

            if (opts.remove === true) {
                $cookieStore.remove('app_user');
            }

            if (opts.set === true) {
                $cookieStore.put('app_user',user);
            }
        }

        user.isLoggedIn = function() {

            var output = false;
            console.log(self.currentUser);
            if (self.currentUser.id) {
                output = true;
            }



            return output;
        }

        user.createAccount = function(user) {
            return $http({
                method: "POST",
                data: user,
                url: serverPath + '/user/register-as-member'
            });
        }

        user.login = function(data) {

            var success = function(response, status, headers, config) {
                var user = response.user;
                var token = response.token;


                var opts = {
                    remove: false,
                    set: true
                }

                //angular.extend(opts);
                angular.extend(self.currentUser, user);

                if (opts.remove === true) {
                    $cookieStore.remove('app_user');
                }

                if (opts.set === true) {
                    console.log(user);
                    $cookieStore.put('app_user', user);

                }

                //set token on success
                $http.defaults.headers.common['X-Access-Token'] = token;
                $cookieStore.get('sessionToken', token);

                console.log($cookieStore.get('app_user'));

                deferred.resolve(self.currentUser);
            }

            var error = function(error, status, headers, config) {

                console.log("AuthService.error callback function ");
                console.log(error);


                deferred.reject(error);
            }

            $http.post(serverPath + '/user/login', data).success(success).error(error);
            return deferred.promise;
        }

        user.logout = function() {

        }

        user.resetCookie = function() {

            //$cookieStore.remove('sessionToken');
            // $http.defaults.headers.common['X-Access-Token'] = "";

            var opts = {
                remove: true,
                set: false
            }

            var user = {
                email: '',
                password: '',
                type: ''
            };
            angular.extend(self.currentUser, user);

            if (opts.remove === true) {
                $cookieStore.remove('app_user');
            }
        }

        user.getCurrentUser = function() {
            return self.currentUser;
        }

        user.updatePassword = function(userData) {
            var deferred = $q.defer();

            // success callback
            var success = function(response, status, headers, config) {
                    console.log("AuthService.register success callback");
                    console.log(response);
                deferred.resolve(response);

                $cookieStore.put('app_user',userData);
            }

            // error callback
            var error = function(error, status, headers, config) {
                
                    console.log("AuthService.error callback function ");
                    console.log(error);
                deferred.reject(error);
            }

            $http.put(serverPath + '/user/update-password', 
                userData
            ).success(success).error(error);

            return deferred.promise;
        }


        return user;

    }
])

.factory('substancePropService', ['$http', function($http) {

    var substanceProp = {};

    substanceProp.getSubstancePropList = function() {
        return $http({
            url: 'json/substanceProp.json'
        });
    }
    return substanceProp;
}])

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

    // CAMT Server Path = http://54.169.76.170:8080/oegp
    // Local Host Path = http://localhost:8081
    var serverPath = 'http://54.169.76.170:8080/oegp';
    var substance = {};

    substance.addSubstance = function(substance) {
        return $http({
            method: "POST",
            data: substance,
            url: serverPath + '/substance/add-substance'
        });
    }

    substance.updateSubstance = function(substance) {
        return $http({
            method: "PUT",
            data: substance,
            url: serverPath + '/substance/update-substance'
        });
    }

    substance.deleteSubstance = function(substanceId) {
        return $http({
            method: "DELETE",
            url: serverPath + '/substance/remove-substance/' + substanceId
        });
    }

    substance.getSubstanceList = function() {
        return $http({
            url: serverPath + '/substance/substanceList.json?callback=JSON_CALLBACK'
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
            console.log("This is a list " + currentsubstanceFnlist);
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

        // CAMT Server Path = http://54.169.76.170:8080/oegp
        // Local Host Path = http://localhost:8081
        var serverPath = 'http://localhost:8081';
        var excipient = {};
        var currentExcipientlist = [];

        excipient.addExcipient = function(excipient) {
            return $http({
                method: "POST",
                data: excipient,
                url: serverPath + '/excipient/add-excipient'
            });
        }

        excipient.updateExcipient = function(excipient) {
            return $http({
                method: "PUT",
                data: excipient,
                url: serverPath + '/excipient/update-excipient'
            });
        }

        excipient.deleteExcipient = function(excipientId) {
            return $http({
                method: "DELETE",
                url: serverPath + '/excipient/remove-excipient/' + excipientId
            });
        }

        excipient.getExcipientList = function() {
            return $http({
                url: serverPath + '/excipient/excipientList.json'
            });
        }

        excipient.getSubstanceListForExcipient = function() {
            return $http({
                url: serverPath + '/excipient/substanceListForExcipient.json'
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

        // CAMT Server Path = http://54.169.76.170:8080/oegp
        // Local Host Path = http://localhost:8081
        var serverPath = 'http://localhost:8081';
        var formulation = {};

        formulation.addFormulation = function(currentformulation) {
            return $http({
                method: "POST",
                data: currentformulation,
                url: serverPath + '/formulation/add-formulation'
            });
        }

        formulation.updateFormulation = function(currentformulation) {
            return $http({
                method: "PUT",
                data: currentformulation,
                url: serverPath + '/formulation/update-formulation'
            });
        }

        formulation.deleteFormulation = function(currentformulationId) {
            return $http({
                method: "DELETE",
                url: serverPath + '/formulation/remove-formulation/' + currentformulationId
            });
        }

        formulation.getFormulationList = function() {
            return $http({
                url: serverPath + '/formulation/formulationList.json'
            });
        }
        return formulation;
    }
])

.factory('unitOperationService', ['$http', function($http) {

    var unitOpreation = {};

    unitOpreation.getUnitOpreationList = function() {
        return $http({
            url: 'json/unitOperation.json'
        });
    }
    return unitOpreation;
}])

.factory('unitOperationServiceV2', ['$http', function($http) {

    var unitOpreation = {};

    unitOpreation.getUnitOpreationList = function() {
        return $http({
            url: 'json/unitOperationsV2.json'
        });
    }
    return unitOpreation;
}])

.factory('productionService', ['$http',
    function($http) {

        // CAMT Server Path = http://54.169.76.170:8080/oegp
        // Local Host Path = http://localhost:8081
        var serverPath = 'http://localhost:8081';
        var production = {};

        production.addProduction = function(currentProduction) {
            return $http({
                method: "POST",
                data: currentProduction,
                url: serverPath + '/production/add-production'

            });
        }

        production.updateProduction = function(currentProduction) {
            return $http({
                method: "PUT",
                data: currentProduction,
                url: serverPath + '/production/update-production'

            });
        }

        production.deleteProduction = function(currentProductionId) {
            return $http({
                method: "DELETE",
                url: serverPath + '/production/delete-production/' + currentProductionId

            });
        }

        production.getProductionList = function() {
            return $http({
                url: serverPath + '/production/productionList.json?callback=JSON_CALLBACK'

            });
        }
        return production;
    }
])

.factory('reformulationService', ['$http',
    function($http) {

        // CAMT Server Path = http://54.169.76.170:8080/oegp
        // Local Host Path = http://localhost:8081
        var serverPath = 'http://localhost:8081';
        var reformulation = {};

        reformulation.makeReformulation = function(reformulationSetting) {
            return $http({
                method: "POST",
                data: reformulationSetting,
                url: serverPath + '/inference-engine/reformulate-production'
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

        // CAMT Server Path = http://54.169.76.170:8080/oegp
        // Local Host Path = http://localhost:8081
        var serverPath = 'http://54.169.76.170:8080/oegp';
        var reformulationHistory = {};

        reformulationHistory.createReformulationHistory = function(reformulationHistory) {
            return $http({
                method: "POST",
                data: reformulationHistory,
                url: serverPath + '/reformulation-history/create-reformulation-history'
            });
        }

        reformulationHistory.updateReformulationHistory = function(reformulationHistory) {
            return $http({
                method: "PUT",
                data: reformulationHistory,
                url: serverPath + '/reformulation-history/update-reformulation-history'
            });
        }

        reformulationHistory.deleteReformulationHistory = function(reformulationHistoryId) {
            return $http({
                method: "DELETE",
                url: serverPath + '/reformulation-history/remove-reformulation-history/' + reformulationHistoryId
            });
        }

        reformulationHistory.getReformulationHistoryList = function() {
            return $http({
                url: serverPath + '/reformulation-history/reformulation-history-list.json'
            });
        }

        return reformulationHistory;
    }
]);
