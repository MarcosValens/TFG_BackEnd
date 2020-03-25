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
    Hosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "host"
    }]
});

const Network = mongoose.model('network', networkSchema);

module.exports = Network;