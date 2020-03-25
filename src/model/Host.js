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
            port: {
                type: Number,
                required: true,

            },
            service: {
                type: String
            },
            open: {
                type: Boolean,
                required: true
            }
        }
    ]
    
});

const Host = mongoose.model('host', hostSchema);

module.exports = Host;