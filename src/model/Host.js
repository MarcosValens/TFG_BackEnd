const mongoose = require('mongoose');

const hostSchema = mongoose.Schema({
    ipAddress: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    ports: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "port"
        }
    ]
});

const Host = mongoose.model('host', hostSchema);

module.exports = Host;