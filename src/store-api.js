var la = require('lazy-ass');
var check = require('check-more-types');
var Promise = require('bluebird');

function addApplicationKey(db, name) {
  la(db, 'missing db');
  la(check.unemptyString(name), 'missing app name', name);
  return Promise.reject();
}

function isValidApplicationKey(db, key) {
  la(check.unemptyString(key), 'missing or invalid key', key);
  return Promise.reject();
}

var saveCrash = require('./models/crashes');

function initStoreApi() {
  var dbInit = require('./db');
  return dbInit.then(function (db) {
    console.log('initialized db store');

    db.api = {
      addApplicationKey: addApplicationKey.bind(null, db),
      isValidApplicationKey: isValidApplicationKey.bind(null, db),
      saveCrash: saveCrash.bind(null, db)
    };

    return db;
  });
}

module.exports = initStoreApi;
