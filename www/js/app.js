/**
 * powered by kyung tae
 */
var app = angular.module('App', ['ionic']);
    app.config(function($stateProvider, $urlRouterProvider) {
          $stateProvider
              .state('tabs', {
                  url: '/tabs',
                  abstract: true, //부모를 상속받는다.( etc) tabs.xxx),// 직접 사용이 불가능하다.
                  templateUrl: 'views/tabs/tabs.html'
              })
              .state('tabs.rates', {
                  url: '/rates',
                  views: {
                    'rats-tab': {
                        templateUrl: 'views/rates/rates.html'
                    }
                  }
              })
              .state('tabs.history', {
                  url: '/history',
                  views: {
                    'history-tab' : {
                        templateUrl: 'views/history/history.html'
                    }
                  }
              })
              .state('tabs.currencies', {
                  url: '/currencies',
                  views: {
                    'currencies-tab': {
                        templateUrl: 'views/currencies/currencies.html'
                    }
                  }
              });

          $urlRouterProvider.otherwise('/tabs/rates');
    });

    app.run(function($ionicPlatform) {
      $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
          StatusBar.styleDefault();
        }
      });
    });
