const mongoose = require('mongoose');
const Port = require('./Port');

const hostSchema = mongoose.Schema({
    ipAddress: String,
    description: String,
    ports: [Port]
});

const Host = mongoose.model('host', hostSchema);

module.exports = Host;