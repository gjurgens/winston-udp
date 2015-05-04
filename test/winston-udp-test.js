/*
 * winston-udp-test.js: Tests for instances of the UDP transport
 */
var vows = require('vows');
var assert = require('assert');
var winston = require('winston');
var helpers = require('winston/test/helpers');
var UDP = require('../lib/winston-udp').UDP;

function assertUDP (transport) {
  assert.instanceOf(transport, UDP);
  assert.isFunction(transport.log);
}

var transport = new (UDP)();

vows.describe('winston-udp').addBatch({
 "An instance of the UDP Transport": {
   "should have the proper methods defined": function () {
     assertUDP(transport);
   },
   "the log() method": helpers.testNpmLevels(transport, "should log messages to UDP", function (ign, err, logged) {
     assert.isTrue(!err);
     assert.isTrue(logged);
   })
 }
}).addBatch({
    "Tear down": { 'UDP Client': function () {transport.closeClient()}}
}).export(module);
