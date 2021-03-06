const mongoose = require('mongoose');

const networkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gateway: {
        type: String
    },
    hosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "host"
    }]
});

const Network = mongoose.model('network', networkSchema);

module.exports = Network;