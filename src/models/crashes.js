var la = require('lazy-ass');
var check = require('check-more-types');
var Promise = require('bluebird');
var mongoose = require('mongoose');
var appKeys = require('./app-keys');

function isValidCrash(crash) {
  return check.object(crash);
}

var crashSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  info: { type: mongoose.Schema.Types.Mixed }
});

var Crash = mongoose.model('Crash', crashSchema);

function saveCrash(key, crash) {
  la(check.unemptyString(key), 'missing or invalid key', key);
  la(check.object(crash), 'invalid crash info', crash);

  if (!isValidCrash(crash)) {
    return Promise.reject(new Error('invalid crash object'));
  }

  return appKeys.isValidKey(key)
    .then(function onKey(isValid) {
      la(check.bool(isValid),
        'could not get app key validity', isValid, 'for', key);
      if (!isValid) {
        return Promise.reject(new Error('invalid app key ' + key));
      }
      var aCrash = new Crash({ info: crash });
      return aCrash.save();
    });
}

module.exports = saveCrash;

if (!module.parent) {
  require('../db')
    .then(function () {
      var crash = {
        title: 'a test',
        problem: 42
      };
      return saveCrash('test-crashes', crash)
        .then(console.log.bind(console))
        .catch(console.error.bind(console));
    }).then(function () {
      mongoose.disconnect();
      console.log('disconnected');
    });
}
