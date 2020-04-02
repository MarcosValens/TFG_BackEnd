const mongoose = require('mongoose');
const portSchema = require("./Port").schema;

const hostSchema = mongoose.Schema({
    ipAddress: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    ports: [portSchema]
});

const Host = mongoose.model('host', hostSchema);

module.exports = Host;