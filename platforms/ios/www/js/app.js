'use-strict';
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('drugExpertSystem', ['ionic','ngCordova', 'drugExpertSystem.substanceController','drugExpertSystem.substancePropController', 'drugExpertSystem.excipientController', 'drugExpertSystem.formulationController', 'drugExpertSystem.solubilityController', 'drugExpertSystem.stabilityController', 'drugExpertSystem.templateController', 'drugExpertSystem.substanceFnController','drugExpertSystem.productionController','drugExpertSystem.reformulationController', 'drugExpertSystem.reformulationHistoryController', 'drugExpertSystem.services', 'drugExpertSystem.directives'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('base', {
        url: "/base",
        abstract: true,
        templateUrl: "templates/base.html",
        controller: 'MenuCtrl'
    })

    // the pet tab has its own child nav-view and history
    .state('base.content', {
        url: '/content',
        views: {
            // Side Menu
            'side-view': {
                templateUrl: 'templates/menu.html',
                controller: 'MenuCtrl'
            },

            // Main Content
            'content-view': {
                templateUrl: 'templates/welcome.html',
                controller: 'MenuCtrl'
            }
        }
    })

    //Substance Content template
    .state('base.substanceContent', {
        url: '/substance',
        abstract: true,
        views: {
            'side-view': {
                templateUrl: 'templates/menu.html',
                controller: 'MenuCtrl'
            },
            'content-view': {
                templateUrl: 'templates/substance/substanceContent.html',
                controller: 'substanceCtrl'
            }
        }

    })
    //Substance adding form //
    .state('base.substanceContent.addSubstance', {
        url: '/addSubstance',
        views: {
            'substanceContent-view': {
                templateUrl: 'templates/substance/addSubstance.html',
                controller: 'substancePropCtrl'

            }
        }

    })

    //Substance add stability component//
    .state('base.substanceContent.addStability', {
        url: '/addStability',
        views: {
            'substanceContent-view': {
                templateUrl: 'templates/substance/stability.html',
                controller: 'stabilityCtrl'

            }
        }

    })

    //Show All Substance //
    .state('base.substanceContent.showAllSubstance', {
        url: '/showSubstance',
        views: {
            'substanceContent-view': {
                templateUrl: 'templates/substance/substanceList.html'

            }
        }

    })

    //Substance detail//
    .state('base.substanceContent.substanceDetail', {
        url: '/substanceDetail',
        views: {
            'substanceContent-view': {
                templateUrl: 'templates/substance/substancedetail.html'

            }
        }

    })

    //Edit Substance Form//
    .state('base.substanceContent.editSubstance', {
        url: '/editSubstance',
        views: {
            'substanceContent-view': {
                templateUrl: 'templates/substance/editSubstance.html',
                controller: 'substancePropCtrl'

            }
        }

    })
    //Excipient Menu
    .state('base.excipientContent', {
        url: '/excipient',
        abstract: true,
        views: {
            'side-view': {
                templateUrl: 'templates/menu.html',
                controller: 'MenuCtrl'
            },
            'content-view': {
                templateUrl: 'templates/excipient/excipientContent.html',
                controller: 'excipientCtrl'
            }
        }

    })


    // Show All Excipient template // 
    .state('base.excipientContent.showAllExcipient', {
        url: '/excipientlist',
        views: {
            'excipientContent-view': {
                templateUrl: 'templates/excipient/excipientlist.html'
            }
        }

    })

    // Show Excipient Detail in each eacipient
    .state('base.excipientContent.excipientDetail', {
        url: '/excipientDetail',
        views: {
            'excipientContent-view': {
                templateUrl: 'templates/excipient/excipientdetail.html'
            }
        }

    })

    //Show Select Substance Page //    
    .state('base.excipientContent.selectSubstance', {
        url: '/selectSubstance',
        views: {
            'excipientContent-view': {
                templateUrl: 'templates/excipient/substanceSelection.html'

            }
        }

    })

    // Show Excipient Adding//
    .state('base.excipientContent.addExcipient', {
        url: '/addExcipient',
        views: {
            'excipientContent-view': {
                templateUrl: 'templates/excipient/addExcipient.html'

            }
        }

    })

    // Show Substance Function Adding //
    .state('base.excipientContent.addSubstanceFunction', {
        url: '/addSubstanceFunction',
        views: {
            'excipientContent-view': {
                templateUrl: 'templates/excipient/addSubstanceFunction.html',
                controller: 'substanceFnCtrl'
            }
        }

    })

    .state('base.excipientContent.updateExcipient', {
        url: '/updateExcipient',
        views: {
            'excipientContent-view': {
                templateUrl: 'templates/excipient/editExcipient.html'
            }
        }

    })


    //Formulation Part (Menu and Content)
    .state('base.formulationContent', {
        url: '/formulation',
        abstract: true,
        views: {
            'side-view': {
                templateUrl: 'templates/menu.html',
                controller: 'MenuCtrl'
            },
            'content-view': {
                templateUrl: 'templates/formulation/formulationContent.html',
                controller: 'formulationCtrl'
            }
        }

    })


    .state('base.formulationContent.showAllFormulation', {
        url: '/formulationlist',
        views: {
            'formulationContent-view': {
                templateUrl: 'templates/formulation/formulationlist.html'
            }
        }

    })

    .state('base.formulationContent.addFormulation', {
        url: '/addformulation',
        views: {
            'formulationContent-view': {
                templateUrl: 'templates/formulation/addFormulation.html',

            }
        }

    })

     .state('base.formulationContent.updateFormulation', {
        url: '/updateformulation',
        views: {
            'formulationContent-view': {
                templateUrl: 'templates/formulation/updateFormulation.html',

            }
        }

    })

      .state('base.formulationContent.formulationdetail', {
        url: '/formulationdetail',
        views: {
            'formulationContent-view': {
                templateUrl: 'templates/formulation/formulationdetail.html',

            }
        }

    })
        .state('base.formulationContent.selectExcipient', {
            url: '/addExcipient',
            views: {
                'formulationContent-view': {
                    templateUrl: 'templates/formulation/selectExcipient.html'
                }
            }

        })
/*

    //Production State (Menu and Content)
    .state('base.productionContent', {
        url: '/production',
        abstract: true,
        views: {
            'side-view': {
                templateUrl: 'templates/menu.html',
                controller: 'MenuCtrl'
            },
            'content-view': {
                templateUrl: 'templates/production/productionContent.html',
                controller: 'productionCtrl'
            }
        }

    })


    .state('base.productionContent.showAllProduction', {
        url: '/productionlist',
        views: {
            'productionContent-view': {
                templateUrl: 'templates/production/productionlist.html'
            }
        }

    })

    .state('base.productionContent.addProduction', {
        url: '/addproduction',
        views: {
            'productionContent-view': {
                templateUrl: 'templates/production/addProduction.html',

            }
        }

    })

     .state('base.productionContent.updateProduction', {
        url: '/updateproduction',
        views: {
            'productionContent-view': {
                templateUrl: 'templates/production/updateProduction.html',

            }
        }

    })

      .state('base.productionContent.productiondetail', {
        url: '/productiondetail',
        views: {
            'productionContent-view': {
                templateUrl: 'templates/production/productiondetail.html',

            }
        }

    })
        .state('base.productionContent.selectFormulation', {
            url: '/selectFormulation',
            views: {
                'productionContent-view': {
                    templateUrl: 'templates/production/selectFormulation.html'
                }
            }

        })
*/
    //Reformulation State
     .state('base.reformulationContent', {
        url: '/reformulation',
        abstract: true,
        views: {
            'side-view': {
                templateUrl: 'templates/menu.html',
                controller: 'MenuCtrl'
            },
            'content-view': {
                templateUrl: 'templates/drugreformulation/reformulationContent.html',
                controller: 'reformulationCtrl'
            }
        }

    })

     .state('base.reformulationContent.formulationSelection', {
        url: '/formulation-selection',
        views: {
            'reformulationContent-view': {
                templateUrl: 'templates/drugreformulation/formulationSelection.html'
            }
        }

    })

     .state('base.reformulationContent.reformulationSetting', {
        url: '/reformulation-setting',
        views: {
            'reformulationContent-view': {
                templateUrl: 'templates/drugreformulation/reformulationSetting.html',
                controller : 'substancePropCtrl'
            }
        }

    })
     .state('base.reformulationContent.reformulationResult', {
        url: '/reformulation-result',
        views: {
            'reformulationContent-view': {
                templateUrl: 'templates/drugreformulation/reformulationResult.html'
            }
        }

    })

     //Reformulation History State
     .state('base.reformulationHistoryContent', {
        url: '/reformulation-history',
        abstract: true,
        views: {
            'side-view': {
                templateUrl: 'templates/menu.html',
                controller: 'MenuCtrl'
            },
            'content-view': {
                templateUrl: 'templates/reformulationHistory/reformulationHistoryContent.html',
                controller: 'reformulationHisCtrl'
            }
        }

    })
     .state('base.reformulationHistoryContent.reformulationHistorySelection', {
        url: '/reformulation-history-selection',
        views: {
            'reformulationHistoryContent-view': {
                templateUrl: 'templates/reformulationHistory/reformulationhistoryList.html'
            }
        }

    })
     .state('base.reformulationHistoryContent.reformulationHistoryDetail', {
        url: '/reformulation-history-detail',
        views: {
            'reformulationHistoryContent-view': {
                templateUrl: 'templates/reformulationHistory/reformulationHistoryDetail.html'
            }
        }

    });


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/base/content');
});