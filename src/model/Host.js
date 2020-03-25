const mongoose = require('mongoose');

const hostSchema = mongoose.Schema({
    id: String,
    ipAddress: String,
    description: String,
    port: []
});

const Host = mongoose.model('host', hostSchema);

module.exports = Host;