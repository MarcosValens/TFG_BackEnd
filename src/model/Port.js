const mongoose = require('mongoose');

const portSchema = mongoose.Schema({
    portNumber: {
        type: Number,
        required: true,
        max: 5,
        min: 1
    },
    service: {
        type: String
    },
    open: {
        type: Boolean,
        required: true
    }
});

const Port = mongoose.model('port', portSchema);

module.exports = Port;