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

function initCrashStoreDatabase() {
  var dbInit = require('./src/db');
  return dbInit.then(function (db) {
    console.log('initialized db store');
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
