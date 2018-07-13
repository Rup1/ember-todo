'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'todo-tutorial',
    environment,
    rootURL: '/',
    locationType: 'auto',

    firebase: {
      apiKey: "AIzaSyCjot_R7AZ5l63zN9a-ICgEAtJkdTlbUBA",
      authDomain: "todo-tutorial-22175.firebaseapp.com",
      databaseURL: "https://todo-tutorial-22175.firebaseio.com",
      projectId: "todo-tutorial-22175",
      storageBucket: "",
      messagingSenderId: "234147019097"
    },

    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
