const mongoose = require('mongoose');
const port = require('./Port');

const hostSchema = mongoose.Schema({
    id: String,
    ipAddress: String,
    description: String,
    port: [port]
});

const Host = mongoose.model('host', hostSchema);

module.exports = Host;