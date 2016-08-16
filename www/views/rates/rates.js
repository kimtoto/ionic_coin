'use strict';
var app = angular.module('App');
    app.controller('RatesController', function($scope, $http, $ionicPopover, Currencies) {
        $scope.currencies = Currencies;

        /** ios-native popOver **/
        $ionicPopover.fromTemplateUrl('views/rates/help-popover.html', {
          scope: $scope,
        }).then(function (popover) {
          $scope.popover = popover;
        });
        $scope.openHelp = function($event) {
          $scope.popover.show($event);
        };
        $scope.$on('$destroy', function() {
          $scope.popover.remove();
        });

        $scope.load = function() {
            $http.get('https://api.bitcoinaverage.com/ticker/all')
                 .success(function(tickers) {
                      angular.forEach($scope.currencies, function (currency) {
                            currency.ticker = tickers[currency.code];
                            currency.ticker.timestamp = new Date(currency.ticker.timestamp);
                      })
                 })
                 .error(function(exception) {
                    console.log(exception);
                 })
                 .finally(function() {
                    $scope.$broadcast('scroll.refreshComplete');
                 });
        };

        $scope.load();
    });
