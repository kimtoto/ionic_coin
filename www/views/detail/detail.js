'use strict';

var app = angular.module('App');
    app.controller('DetailController', function ($scope, $stateParams, $state, Currencies) {

        anuglar.forEach(Currencies, function(currency) {
            if (currency.code === $stateParams.currency) {
                $scope.currency = currency;
            }
        });

        /** object is undefined ==> redirect tabs. rates */
        if (angular.isUndefined($scope.currency.ticker) {
            $state.go('tabs.rates');
        });
    });
