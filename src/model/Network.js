const mongoose = require('mongoose');
const Host = require('./Host')

const networkSchema = new mongoose.Schema({
    ipAddress: String,
    hosts: [Host]
});

const Network = mongoose.model('network', networkSchema);

module.exports = Network;