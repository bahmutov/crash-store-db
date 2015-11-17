var la = require('lazy-ass');
var check = require('check-more-types');
var Promise = require('bluebird');
var AppKeys = require('./models/app-keys');

function addApplicationKey(db, name) {
  la(db, 'missing db');
  la(check.unemptyString(name), 'missing app name', name);
  return Promise.reject();
}

var apiKeys = require('./models/api-keys');
var saveCrash = require('./models/crashes');

function initStoreApi() {
  var dbInit = require('./db');
  return dbInit.then(function (db) {
    console.log('initialized db store');

    db.api = {
      addApplicationKey: addApplicationKey.bind(null, db),
      isValidApplicationKey: apiKeys.isValidKey,
      saveCrash: saveCrash
    };

    return db;
  });
}

module.exports = initStoreApi;
