'use strict';

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    basic: {
        email: String,
        password: String
    },
    username: String,
    createdAt: Date,
    location: String,
    favorites: Number
});

module.exports = mongoose.model('User', userSchema);
