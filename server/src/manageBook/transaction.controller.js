'use strict';

var Transaction = require('./transaction.model');

/**
 * GET /Transactions
 *
 * @description
 * list of Transactions
 *
 */
exports.find = function(req, res, next) {
  Transaction.find(function(err, transactions) {
    if (err) {
      return next(err);
    }
    return res.status(200).json(transactions);
  });
};

/**
 * GET /Transactions/:id
 *
 * @description
 * Find transaction by id
 *
 */
exports.get = function(req, res, next) {
  Transaction.findById(req.params.id, function(err, transaction) {
    if (err) {
      return next(err);
    }
    if (!transaction) {
      return res.status(404).send('Not Found');
    }
    return res.status(200).json(transaction);
  });
};

/**
 * POST /Transactions
 *
 * @description
 * Create a new transaction
 *
 */
exports.post = function(req, res, next) {
  console.log(req.body);
  Transaction.create(req.body, function(err, transaction) {
    if (err) {
      return next(err);
    }
    return res.status(201).json(transaction);
  });
};



