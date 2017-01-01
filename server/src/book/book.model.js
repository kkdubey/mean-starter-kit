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
    noOfBooks: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Book', BookSchema);
