// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('drugExpertSystem', ['ionic', 'drugExpertSystem.controllers','drugExpertSystem.services'])

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
          templateUrl: 'templates/substance/substanceList.html',
          controller: 'substanceCtrl'
        }
      }
    })

    // Sub Menu
    .state('base.subMenu', {
      url: '/content/subMenu',
      views: {
        'side-view': {
          templateUrl: 'templates/subMenu.html',
          controller: 'SubMenuCtrl'
        }
      }

    })
     .state('base.addSubstance', {
      url: '/content/subMenu/addSubstance',
      views: {

        'side-view': {
          templateUrl: 'templates/subMenu.html',
          controller: 'SubMenuCtrl'
        },
          
        'content-view': {
          templateUrl: 'templates/substance/addSubstance.html',
          
        }
      }
   
    })
    .state('base.addStability', {
      url: '/content/subMenu/addSubstance/addStability',
      views: {
          
        'content-view': {
          templateUrl: 'templates/substance/stability.html',
          
        }
      }
   
    });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/base/content');
});

