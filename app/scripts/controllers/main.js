'use strict';

/**
 * @ngdoc function
 * @name abtestDashboardApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the abtestDashboardApp
 */
angular.module('abtestDashboardApp')
  .controller('MainCtrl', ['$scope', '$http', '$location' ,'CONFIG', function ($scope, $http, $location, CONFIG) {
    $scope.baseUrl = CONFIG.SERVICE_CONFIG.API_ENDPOINT;
    $scope.recent = { tests: [] };
    $scope.state = 'loading';

    $http.get($scope.baseUrl).success(function(data, status, headers) {
      $scope.recent = data;
      $scope.state = 'ok';
    }).error(function(data, status, headers) {
      $scope.state = 'error';
      $location.path('/error/?errMsg=Failed&status='+status);
    });

  }]);
