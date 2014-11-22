'use strict';

/**
 * @ngdoc function
 * @name abtestDashboardApp.controller:DetailsCtrl
 * @description
 * # DetailsCtrl
 * presents status of a given test
 */
angular.module('abtestDashboardApp')
  .controller('DetailsCtrl', ['$scope', '$http', '$routeParams', '$location', 'CONFIG',
    function ($scope, $http, $routeParams, $location, CONFIG) {
      $scope.baseUrl = CONFIG.SERVICE_CONFIG.API_ENDPOINT;
      $scope.testDetails = {};
      $scope.state = 'loading';
      $scope.testId = $routeParams.testId;

      $http.get($scope.baseUrl + '/' + $scope.testId).success(function (data, status, headers) {
        $scope.testDetails = data;
        $scope.state = 'ok';
      }).error(function (data, status, headers) {
        $scope.state = 'error';
        $location.path('/error/?errMsg=Failed&status=' + status);
      });

    }]);
