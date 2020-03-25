const mongoose = require('mongoose');
const network = require('./Network');
const Photo = require('./Photo');

const userSchema = new mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    photo: Photo,
    networks: [network]
});

const User = mongoose.model('user', userSchema);

module.exports = User;