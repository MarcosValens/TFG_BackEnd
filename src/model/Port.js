const mongoose = require('mongoose');

const portSchema = mongoose.Schema({
    id: String,
    portNumber: Number,
    service: String,
    open: Boolean
});

const Port = mongoose.model('port', portSchema);

module.exports = Port;