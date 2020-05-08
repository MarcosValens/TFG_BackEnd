const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 9
    },
    surname: {
        type: String,
        min: 3,
        max: 18
    },
    email: {
        type: String,
        required: true,
        unique: true,
        min: 4,
        max: 254
    },
    password:{
        type: String,
        max: 1024,
        min: 6
    },
    createdWith:{
        type: String,
        required: true
    },
    userAgreementAccepted: {
        type: Boolean,
        default: false
    },
    networks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "network"
    }]
});

const User = mongoose.model('user', userSchema);

module.exports = User;