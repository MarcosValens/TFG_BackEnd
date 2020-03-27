const mongoose = require('mongoose');

const portSchema = new mongoose.Schema({
    port: {
        type: Number,
        required: true,
    },
    open: {
        type: Boolean,
        required: true
    },
    service: {
        type: String
    }
});

const Port = mongoose.model('port', portSchema);

module.exports = Port;