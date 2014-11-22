'use strict';

var configData = {
  'SERVICE_CONFIG': {
    'API_ENDPOINT': 'http://localhost:9000/tests'
  }
};

angular.module('appConfig', [])
  .constant('CONFIG', configData);

