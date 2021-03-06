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
    },
    transactionType: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.Mixed,
    },
    book: {
        type: Schema.Types.Mixed,
    },
    returnDate: {
        type: Date,
    },
});

module.exports = mongoose.model('Transaction', TransactionSchema);
