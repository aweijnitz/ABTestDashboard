'use strict';

/**
 * @ngdoc overview
 * @name abtestDashboardApp
 * @description
 * # abtestDashboardApp
 *
 * Main module of the application.
 */
angular
  .module('abtestDashboardApp', [
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'appConfig'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/details/:testId', {
        templateUrl: 'views/details.html',
        controller: 'DetailsCtrl'
      })
      .when('/error?errMsg=:errMsg', {
        templateUrl: 'views/error.html',
        controller: 'ErrorCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
