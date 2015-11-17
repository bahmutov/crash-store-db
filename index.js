var la = require('lazy-ass');
la(!module.parent, 'should be used stand alone - just a demo');
console.log('running stand alone');

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

var setupApi = require('./src/store-api');
setupApi()
  .then(testDummy)
  .catch(console.error.bind(console));
// TODO implement closing the connection and exit
