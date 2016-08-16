'use strict';
var app = angular.module('App');
    app.controller('HistoryController', function($scope, $http, $state, $stateParams, $ionicLoading, Currencies) {

        $ionicLoading.show({
            template: '<p>로딩중...</p><ion-spinner icon="android"></ion-spinner>'
        });

        $scope.history = {
            currency: $stateParams.currency || 'USD'
        };

        $scope.currencies = Currencies;

        $scope.chancgCurrency = function() {
          console.log("현재 값이 변경 되었습니다.");
          $state.go('tabs.history', {currency: $scope.history.currency});
        };

        /**
         * [chart description]
         * @type {Object}
         * TODO cart 디렉티브 코딩
         */
         $scope.chart = {
             options: {
               chart: {
                 type: 'arearange',
                 type: 'line'
               },
               legend: {
                 enabled: false
               }
             },
             title: {
               text: $scope.history.currency
             },
             yAxis: {
               title: null
             },
             xAxis: {
               type: 'datetime'
             },
             series: []
          };

          $http.get('https://api.bitcoinaverage.com/history/' + $scope.history.currency + '/per_hour_monthly_sliding_window.csv').success(function (prices) {

            prices = prices.split(/\n/);
            var series = {
              data: []
            };

            angular.forEach(prices, function (price, index) {
              price = price.split(',');
              var date = new Date(price[0].replace(' ', 'T')).getTime();
              var value = parseFloat(price[3]);
              if (date && value > 0) {
                series.data.push([date, value]);
              }
            });

            $scope.chart.series.push(series);
            $ionicLoading.hide();
            });

            /** @type {Object} [description]
            *   @description: ionicView가 event를 감지 하지 못한다면 default값을 USD로 설정한다.
            */
             $scope.$on('$ionicView.beforeEnter', function() {
               $scope.history = {
                  currency: $stateParams.currency || 'USD'
               };
             });
    });
