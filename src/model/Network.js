const mongoose = require('mongoose');
const host = require('./Host')

const networkSchema = new mongoose.Schema({
    id: String,
    ipAddress: String,
    host: [host]
});

const Network = mongoose.model('network', networkSchema);

module.exports = Network;