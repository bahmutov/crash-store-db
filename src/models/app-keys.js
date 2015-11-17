var mongoose = require('mongoose');

var appKeySchema = new mongoose.Schema({
  name:  String,
  date: { type: Date, default: Date.now }
});

var AppKey = mongoose.model('AppKey', appKeySchema);

AppKey.saveDummy = function saveDummy() {
  var newAppKey = new AppKey({
    name: 'dummy'
  });
  return newAppKey.save();
};

AppKey.isValidKey = function isValidKey(key) {
  return AppKey.findById(key)
    .then(function () {
      return true;
    }, function () {
      return false;
    });
};

module.exports = AppKey;

if (!module.parent) {
  require('../db')
    .then(function () {
      var id = '564822fa5295ec1100aa0ce7';
      console.log('checking api key %s', id);
      AppKey.isValidKey(id)
        .then(function (answer) {
          console.log('is key %s valid?', id, answer);
        })
        .catch(console.error.bind(console))
        .then(function () {
          mongoose.disconnect();
          console.log('disconnected');
        });
    });
}
