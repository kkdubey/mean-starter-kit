'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    noOfTotalBooks: {
        type: Number,
        required: true,
    },
    noOfAvailableBooks: {
        type: Number,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        required: true,
    }
});

module.exports = mongoose.model('Book', BookSchema);
