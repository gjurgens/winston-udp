'use strict';
/*
 * winston-udp.js: Transport for outputting logs to udp
 *
 * (C) 2015 Gabriel Jürgens
 * MIT LICENCE
 */

var util = require('util'),
    winston = require('winston');
var os = require("os");
var serverError = false;
var debug = require('debug')('winston-udp');

var options = {
    "level": "info",
    "server": "127.0.0.1",
    "port": "9999"
};

var inWindows = /^win.*/i.test(os.platform());

//UDP is not working on Windows Environments, so, it will be disabled
if (!inWindows) {
    var dgram = require('dgram');
    var client = dgram.createSocket('udp4');

    client.on("error", function (err) {
        var errString = util.format('UDP Logger Socket error: %s',err);
        winston.error(errString);
        client.close();
    });
}

/**
 * @constructs UDP
 * @param {object} options hash of options
 */
var UDP = exports.UDP = function (_options) {

    for (var option in _options) {
        options[option] = _options[option];
    }
    this.name = 'UDP';
    this.level = options.level;
    this.formatter = options.formatter;
};

/** @extends winston.Transport */
util.inherits(UDP, winston.Transport);

/**
 * Define a getter so that `winston.transports.UDP`
 * is available and thus backwards compatible.
 */
winston.transports.UDP = UDP;


/**
 * Core logging method exposed to Winston. Metadata is optional.
 * @function log
 * @member UDP
 * @param level {string} Level at which to log the message
 * @param msg {string} Message to log
 * @param meta {Object} **Optional** Additional metadata to attach
 * @param callback {function} Continuation to respond to when complete.
 */
UDP.prototype.log = function (level, msg, meta, callback) {
    var self = this;

    //UDP is not working on Windows Environments, so, it will be disabled
    if (!inWindows) {
        if (this.formatter){
            var formatterOptions = {};
            formatterOptions.level = level;
            formatterOptions.meta = meta;
            formatterOptions.timestamp = options.timestamp;
            formatterOptions.message = msg;
            msg = this.formatter (formatterOptions);
        }
        msg = msg.replace(/\n/g, "; ");
        //Max message size is 64KB (65535 bytes).
        //Data can be 65507 max, because of 8 bytes UDP Datagram header and 20 bytes IP Packet headers
        //data + udp_headers + ip_headers = 65507 bytes + 8 bytes + 20 bytes = 65535 bytes
        var message = new Buffer(msg).slice(0,65507);

        if (!serverError) {
            try {
                debug('Message length: %s', message.length);
                client.send(message, 0, message.length, options.port, options.server, function (err,length) {
                    if (err) {
                        debug('Error message length: %s',length);
                        serverError = err;
                        client.emit('error', err);
                        self.emit('error', err);
                        if(callback){
                            callback(err, false);
                        }
                    } else {
                        self.emit('logged');
                        if(callback){
                            callback(null, true);
                        }
                    }
                    return;
                });
            } catch(error){
                serverError = error;
                client.emit('error', error);
                self.emit('error', error);
                if(callback){
                    callback(error, false);
                }
                return;
            }
        }
    }

};

/**
 * Method to manually close UDP client connection.
 * @function closeClient
 * @member UDP
 */
UDP.prototype.closeClient = function() {
    if (!inWindows && client && (typeof client.close === "function")) {
        client.close();
    }
};
