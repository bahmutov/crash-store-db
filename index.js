var la = require('lazy-ass');
var check = require('check-more-types');
var Promise = require('bluebird');

function testDummy() {
  console.log('testing dummy app key');
  var AppKey = require('./src/models/app-keys');
  return AppKey.saveDummy().then(function (key) {
    console.log('created dummy application key');
    console.log(key);
  }, function (err) {
    console.error(err);
  });
}

function addApplicationKey(db, name) {
  la(db, 'missing db');
  la(check.unemptyString(name), 'missing app name', name);
  return Promise.reject();
}

function isValidApplicationKey(db, key) {
  return Promise.reject();
}

function storeException(db, key, exceptionInformation) {
  return Promise.reject();
}

function initCrashStoreDatabase() {
  var dbInit = require('./src/db');
  return dbInit.then(function (db) {
    console.log('initialized db store');

    db.addApplicationKey = addApplicationKey.bind(null, db);
    db.isValidApplicationKey = isValidApplicationKey.bind(null, db);
    db.storeException = storeException.bind(null, db);
    return db;
  });
}

module.exports = initCrashStoreDatabase;

if (!module.parent) {
  console.log('running stand alone');
  initCrashStoreDatabase()
    .then(testDummy)
    .catch(console.error.bind(console));
}
