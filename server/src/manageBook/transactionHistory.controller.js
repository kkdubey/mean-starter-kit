'use strict';

var Transaction = require('./transaction.model');

/**
 * GET /Transactions
 *
 * @description
 * list of Transactions by Transaction Type
 *
 */

exports.getTransactionByTransactionType = function(req, res, next) {
  console.log(req);
  Transaction.find({ transactionType: req.params.transactionType }, function(err, transactions) {
    if (err) {
      return next(err);
    }
    if (!transactions|| transactions.length == 0) {
      return res.status(404).send('Not Found');
    }
    return res.status(200).json(transactions);
  });
};
