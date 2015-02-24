'use strict';

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    basic: {
        email: String,
        password: String
    },
    username: String,
    created_at: Date,
    location: String,
    favorites: Number
});


