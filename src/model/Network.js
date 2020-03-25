const mongoose = require('mongoose');
const Host = require('./Host');

const networkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gateway: {
        type: String
    },
    Hosts: {
        type: [Host],
        required: true
    }
});

const Network = mongoose.model('network', networkSchema);

module.exports = Network;