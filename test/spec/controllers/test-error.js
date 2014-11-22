'use strict';

describe('Controller: ErrorCtrl', function () {

  // load the controller's module
  beforeEach(module('abtestDashboardApp'));

  var ErrorCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    var params = {errMsg:'Bad things happened', status:500 };

    ErrorCtrl = $controller('ErrorCtrl', {
      $scope: scope,
      $routeParams: params
    });
  }));

  it('should set errorMsg and statsus on scope', function () {
    expect(scope.errorMsg).toBeDefined();
    expect(scope.errorMsg).toBe('Bad things happened');
    expect(scope.status).toBe(500);

  });
});
