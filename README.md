ABTest Dashboard
================

This is a basic UI to see what is going on in the [ABTestServer.js](https://github.com/aweijnitz/ABTestServer.js).
It is a webapp written using [Angular.js](https://angularjs.org/).


# Installing
## Requirements
You need to have the following components in order to install, develop, test and build the project
- Node.js
- Yeoman (not strictly required, but the project was started using the Yeoman angular scaffolding)
- Bower
- Grunt
- Karma
- Protractor and webdriver-manager. See the Protractor website

## Installing after download
```bash
npm install
bower install
```

# Running and testing
- ```grunt serve``` will start a webserver and launch the app in Chrome, then starts watching the files for changes
- ```karma start``` starts the test server for the unit tests
- ```karma run test/karma.conf.js``` starts the test runner which watches tests for changes and runs them (not needed fo you use *grunt serve*)
- ```protractor test_e2e/protractor_conf.js``` manually run the end to end tests


# Building a distribution
Everything is driven by Grunt. 
Create a dist using ```grunt build```. The final build ends up in the folder ```dist```.


TODO:
Make protractor and karma part of dev-dependencies instead of globals

