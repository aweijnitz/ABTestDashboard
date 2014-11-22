'use strict';

// Based on example from https://docs.angularjs.org/api/ngMock/service/$httpBackend


// testing controller
describe('MainCtrl', function() {
  var $httpBackend, $rootScope, createController, requestHandler, scope;

  var testConf = {
    'SERVICE_CONFIG': {
      'API_ENDPOINT': '/tests'
    }
  };

  // Text fixture
  var recentTests = {
    tests: [
      {
        testID: 't012141625722w3283',
        variantViews: [0, 0],
        conversions: [0, 0],
        stats: {
          isSignificant: false,
          isSignificantForA: false,
          isSignificantForB: false,
          changePercent: 0,
          probabilityOfB: 0.5
        }
      },
      {
        testID: 't11416257230291',
        variantViews: [0, 0],
        conversions: [0, 0],
        stats: {
          isSignificant: false,
          isSignificantForA: false,
          isSignificantForB: true,
          changePercent: 0,
          probabilityOfB: 0.5
        }
      },
      {
        testID: 't21416257230293',
        variantViews: [0, 0],
        conversions: [0, 0],
        stats: {
          isSignificant: false,
          isSignificantForA: false,
          isSignificantForB: false,
          changePercent: 0,
          probabilityOfB: 0.5
        }
      }
    ]
  };

  // Set up the module
  beforeEach(module('abtestDashboardApp'));


  beforeEach(inject(function($injector) {

    // Set up the mock http service responses
    // The mock httpBackend is loaded "automatically", since it is specified in the karma.conf.js file (angular-mocks.js)
    $httpBackend = $injector.get('$httpBackend');

    // mock backend definition common for all tests
    // Setup responses to calls triggered by the tests
    requestHandler = $httpBackend.when('GET', '/tests')
      .respond(recentTests);

    // Create a fresh scope before each test
    $rootScope = $injector.get('$rootScope');
    scope = $rootScope.$new();

    // The $controller service is used to create instances of controllers
    var $controller = $injector.get('$controller');

    // Create a new instance of the controller under test before each test,
    // supplying the mock scope and test config
    createController = function() {
      return $controller('MainCtrl', {'$scope' : scope, '$http': $injector.get('$http'), 'CONFIG': testConf });
    };

  }));


  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });


  it('should return most recent tests when created', function() {
    $httpBackend.expectGET(testConf.SERVICE_CONFIG.API_ENDPOINT);
    var controller = createController();

    // State before data has beed loaded from server
    expect(scope.state).toBe('loading');
    expect(scope.recent).toBeDefined();
    expect(scope.recent.tests.length).toBe(0);

    // Invoke server mock
    $httpBackend.flush();

    // State after a successful call
    expect(scope.state).toBe('ok');
    expect(scope.recent).toBeDefined();
    expect(scope.recent.tests.length).toBe(3);
    expect(scope.recent.tests[0].testID).toBe('t012141625722w3283');

  });

});
