'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TransactionSchema = new Schema({
    transactionDate: {
        type: Date,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    transactionType: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.Mixed,
        required: true,
    },
    books: {
        type: Schema.Types.Mixed,
        required: true,
    }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
