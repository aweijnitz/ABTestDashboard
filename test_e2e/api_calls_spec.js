'use strict';
var startBackend = require('./fixtures/mockBackend.js');

describe('angularjs homepage', function () {
  var server = null;
  var backendUrl = 'http://localhost:9000/';

  beforeEach(function (done) {
    server = startBackend(function onStarted() {
      done(); // Blocks until server is up
    });
  });

  afterEach(function () {
    server.close();
  });


  // Check we are getting the right page
  it('should contain brand element top left', function () {
    browser.get(backendUrl);
    var greeting = element(by.id('brandName'));
    expect(greeting.getText()).toEqual('AB Test Status');
  });


  it('should contain a list of recent tests', function (done) {
    browser.get(backendUrl);
    element.all(by.repeater('tst in recent.tests'))
      .then(function (res) {
        expect(res.length).toEqual(3);
        //console.log(res);
        done();
      });
  });

  it('should have testID in the first column', function (done) {
    browser.get(backendUrl);
    element.all(by.repeater('tst in recent.tests')).get(0)
      .all(by.tagName('td')).get(0)
      .then(function (res) {
        expect(res.getText()).toBe('t012141625722w3283');
        done();
      });
  });

  it('should show details about testId with deep link', function (done) {
    browser.get(backendUrl+'#/details/t123456789');
    element(by.binding('testDetails.testID'))
      .then(function (res) {
        expect(res.getText()).toBe('t123456789');
        done();
      });
  });

  it('should display details after entering testId in text box and pressing ok ', function(done) {
    var textBox = element(by.model('testDetails'));
    var okButton = element(by.id('goDetails'));

    textBox.sendKeys('t123456789');
    okButton.click();

    element(by.binding('testDetails.testID'))
      .then(function (res) {
        expect(res.getText()).toBe('t123456789');
        done();
      });
  });

});
