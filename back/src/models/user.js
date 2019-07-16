const mongoose = require('mongoose');

var usersModel = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
}, { versionKey: false });

const User = mongoose.model('users', usersModel)

module.exports = User