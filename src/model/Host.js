const mongoose = require('mongoose');
const Port = require('./Port');

const hostSchema = mongoose.Schema({
    ipAddress: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    ports: {
        type: [Port],
        required: true
    }
});

const Host = mongoose.model('host', hostSchema);

module.exports = Host;