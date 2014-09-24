// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('drugExpertSystem', ['ionic', 'drugExpertSystem.controllers','drugExpertSystem.services','drugExpertSystem.directives'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
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
      templateUrl: "templates/base.html"
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
          templateUrl: 'templates/welcome.html'
          
        }
      }
    })

    //Substance Menu
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

    .state('base.substanceContent.menu', {
      url: '/menu',
      views: {
         'substanceContent-view': {
          templateUrl: 'templates/substance/substanceMenu.html'
        }
      }

    })

     .state('base.substanceContent.addSubstance', {
      url: '/addSubstance',
      views: {
        'substanceContent-view': {
          templateUrl: 'templates/substance/addSubstance.html',
          controller: 'solubilityCtrl'
          
        }
      }
   
    })
    .state('base.substanceContent.addStability', {
      url: '/addStability',
      views: {
        'substanceContent-view': {
          templateUrl: 'templates/substance/stability.html',
          controller: 'stabilityCtrl'
          
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

    .state('base.excipientContent.menu', {
      url: '/menu',
      views: {
         'excipientContent-view': {
          templateUrl: 'templates/excipient/excipientMenu.html'
        }
      }

    })
     .state('base.excipientContent.addExcipient', {
      url: '/addExcipient',
      views: {
        'excipientContent-view': {
          templateUrl: 'templates/excipient/addExcipient.html',

        }
      }
   
    });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/base/content');
});

