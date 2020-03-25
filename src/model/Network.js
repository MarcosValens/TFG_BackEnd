const mongoose = require('mongoose');

const networkSchema = new mongoose.Schema({
    id: String,
    ipAddress: String,
    host: []
});

const Network = mongoose.model('network', networkSchema);

module.exports = Network;