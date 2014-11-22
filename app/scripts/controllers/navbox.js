'use strict';

angular.module('abtestDashboardApp')
  .controller('NavBoxCtrl', ['$scope', '$http', '$location', 'CONFIG', function ($scope, $http, $location, CONFIG) {
    $scope.state = 'loading';
    $scope.submit = function () {
      if ($scope.testDetails) {
        var url = CONFIG.SERVICE_CONFIG.API_ENDPOINT+'/' + $scope.testDetails;
        $http.get(url).
          success(function (data, status) { // function (data, status, headers, config)
            $scope.state = 'ok';
            if (status === 200)
              $location.path('/details/' + data.testID);
            else
              $location.path('/error/?errMsg='+$scope.testDetails+'&status='+status);
          }).
          error(function (data, status) { // function (data, status, headers, config)
            $scope.state = 'error';
            if (status === 404) {
              $location.path('/error/?errMsg=NotFound-'+$scope.testDetails+'&status=404');
            }
          });

      }
    };
  }]);


