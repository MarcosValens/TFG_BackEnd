const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    photo: String,
    network: []
});

const User = mongoose.model('user', userSchema);

module.exports = User;