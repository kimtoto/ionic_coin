'use strict';
var app = angular.module('App');
    app.controller('CurrenciesController', function ($scope, Currencies) {
        $scope.currencies = Currencies;
        $scope.state = {
            reordering: false
        };

        $scope.$on('$stateChangeStart', function() {
            $scope.state.reordering = false;
        });

        /**
         * [move description]
         * @param  {[type]} currency  [description]
         * @param  {[type]} fromIndex [description]
         * @param  {[type]} toIndex   [description]
         * @return {[type]}           [description]
         * @description: 토글값의 위치를 변경하기 위한 디렉티브.(디렉티브는 컨트롤러에 포함 시키지 않도록 한다.)
         */
        $scope.move = function (currency, fromIndex, toIndex) {
            $scope.currencies.splice(fromIndex, 1);
            $scope.currencies.splice(toIndex, 0, currency);
        };

    });
