const mongoose = require('mongoose');
const network = require('./Network');
const photo = require('./Photo');

const userSchema = new mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    photo: photo,
    network: [network]
});

const User = mongoose.model('user', userSchema);

module.exports = User;