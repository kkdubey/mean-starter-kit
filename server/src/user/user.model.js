'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    books: {
        type: Array
    }
});

module.exports = mongoose.model('User', UserSchema);
