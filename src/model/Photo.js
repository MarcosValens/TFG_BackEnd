const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    file: {data: Buffer, contentType: String},
    name: String,
    path: String
});

const Photo = mongoose.model('photo', photoSchema);

module.exports = Photo;