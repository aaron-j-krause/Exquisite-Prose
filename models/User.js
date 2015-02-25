'use strict';

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    basic: {
        email: {type: String, unique: true, required: true},
        password: {type: String, required: true}
    },
    screenname: {type: String, unique: true, required: true},
    createdAt: String,
    location: String,
    favorites: Number
});

module.exports = mongoose.model('User', userSchema);
