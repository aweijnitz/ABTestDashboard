'use strict';

// Mockup of backend api. Used by the Protractor integration tests
//

var fs = require('fs')

var serveStatic = require('serve-static');

module.exports = function startMockBackend(onStarted) {
  var port = 9000;

  var express = require('express');
  var app = express();

  app.get('/tests/:testId?', function (req, res) {
    //console.log('======> ' + req.params.testId);
    if (req.params.testId === undefined)
      res.send(JSON.parse(fs.readFileSync('test_e2e/fixtures/recent.json', {encoding: 'utf8'})));
    else
      res.send(JSON.parse(fs.readFileSync('test_e2e/fixtures/details.json', {encoding: 'utf8'})));

  });


  app.use(serveStatic('dist', {'index': ['index.html']}));

  var server = app.listen(port, onStarted);

  return server;
};
