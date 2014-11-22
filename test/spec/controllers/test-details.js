'use strict';

describe('DetailsCtrl', function () {
  var $httpBackend, $rootScope, createController, requestHandler, scope;

  // Text fixture
  var details = {
    testID: 't123456789',
    variantViews: [0, 2],
    conversions: [0, 1],
    stats: {
      isSignificant: false,
      isSignificantForB: false,
      changePercent: 40,
      probabilityOfB: 0.3213503964711087
    }
  };

  var testConf = {
    'SERVICE_CONFIG': {
      'API_ENDPOINT': '/tests'
    }
  };

  beforeEach(module('abtestDashboardApp'));

  beforeEach(inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend');
    requestHandler = $httpBackend.when('GET', testConf.SERVICE_CONFIG.API_ENDPOINT + '/' + details.testID)
      .respond(details);
    $rootScope = $injector.get('$rootScope');
    scope = $rootScope.$new();
    var $controller = $injector.get('$controller');
    createController = function () {
      return $controller('DetailsCtrl',
        {
          '$scope': scope,
          '$http': $injector.get('$http'),
          '$routeParams': {testId: details.testID},
          'CONFIG': testConf
        });
    };
  }));


  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });


  it('should return test details for testId passed in URL', function () {
    $httpBackend.expectGET(testConf.SERVICE_CONFIG.API_ENDPOINT + '/' + details.testID);
    var controller = createController();

    // State before data has beed loaded from server
    expect(scope.state).toBe('loading');
    expect(scope.testDetails).toBeDefined();
    expect(scope.testId).toBe(details.testID);

    // Invoke server mock
    $httpBackend.flush();

    // State after a successful call
    expect(scope.state).toBe('ok');
    expect(scope.testDetails).toBeDefined();
    expect(scope.testDetails.testID).toBe(details.testID);
    expect(scope.testDetails.stats.changePercent).toEqual(details.stats.changePercent);

  });

});
