'use strict';

angular.module('abtestDashboardApp')
  .controller('ErrorCtrl', ['$scope','$routeParams', function ($scope, $routeParams) {
    $scope.errorMsg = $routeParams.errMsg;
    $scope.status = $routeParams.status;
  }]);
