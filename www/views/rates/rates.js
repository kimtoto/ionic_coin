'use strict';
var app = angular.module('App');
    app.controller('RatesController', function($scope, $http, Currencies) {
        $scope.currencies = Currencies;
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
                 });
        };

        $scope.load();
    });
