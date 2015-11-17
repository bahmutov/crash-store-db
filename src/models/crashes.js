var la = require('lazy-ass');
var check = require('check-more-types');
var Promise = require('bluebird');
var mongoose = require('mongoose');

function isValidCrash(crash) {
  return check.object(crash);
}

var crashSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  info: { type: mongoose.Schema.Types.Mixed }
});

var Crash = mongoose.model('Crash', crashSchema);

function saveCrash(db, key, crash) {
  la(check.unemptyString(key), 'missing or invalid key', key);
  la(check.object(crash), 'invalid crash info', crash);

  if (!isValidCrash(crash)) {
    return Promise.reject(new Error('invalid crash object'));
  }

  var aCrash = new Crash({ info: crash });
  return aCrash.save();
}

module.exports = saveCrash;

if (!module.parent) {
  require('../db')
    .then(function (db) {
      var crash = {
        title: 'a test',
        problem: 42
      };
      saveCrash(db, 'test-crashes', crash)
        .then(console.log.bind(console))
        .catch(console.error.bind(console));
    });
  // TODO implement closing the connection and exit
}
