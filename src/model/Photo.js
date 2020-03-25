const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    file: {data: Buffer, contentType: String},
    name: {
        type: String,
        required: true,
        min: 3,
        max: 9
    },
    path: {
        type: String,
        required: true
    }
});

const Photo = mongoose.model('photo', photoSchema);

module.exports = Photo;