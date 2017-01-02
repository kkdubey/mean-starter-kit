'use strict';

var Transaction = require('./transaction.model');
var User = require('../user/user.model');
var Book = require('../book/book.model');

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
 * POST /Transactions: borrow book
 *
 * @description
 * Create a new transaction borrow book
 *
 */
exports.post = function(req, res, next) {
  console.log(req.body);
  Transaction.create(req.body, function(err, transaction) {
    if (err) {
      return next(err);
    }
    
    User.findById(req.body.user._id, function(err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(404).send('Not Found');
      }

      user.books.push(req.body.book);

      user.save(function(err) {
        if (err) {
          return next(err);
        }
      });
    });
    Book.findById(req.body.book._id, function(err, book) {
      if (err) {
        return next(err);
      }
      if (!book) {
        return res.status(404).send('Not Found');
      }

      book.noOfAvailableBooks = book.noOfAvailableBooks -1;

      book.save(function(err) {
        if (err) {
          return next(err);
        }
      });
    });
    return res.status(201).json(transaction);
  });
};


/**
 * POST /transactions: return book
 *
 * @description
 * Create a new transaction return book
 *
 */

exports.returnBook = function(req, res, next) {
  Transaction.create(req.body, function(err, transaction) {
    if (err) {
      return next(err);
    }
    
    User.findById(req.body.user._id, function(err, user) {
      if (err) {
        return next(err);
      }

      var _books = user.books.filter(function( obj ) {
          return obj._id != req.body.book._id;
      });

      user.books = _books;

      user.save(function(err) {
        if (err) {
          return next(err);
        }
      });
    });
    Book.findById(req.body.book._id, function(err, book) {
      if (err) {
        return next(err);
      }

      book.noOfAvailableBooks = book.noOfAvailableBooks + 1;

      book.save(function(err) {
        if (err) {
          return next(err);
        }
      });
    });
    return res.status(201).json(transaction);
  });
};

/**
 * GET /Transactions
 *
 * @description
 * list of Transactions by Transaction Type
 *
 */
exports.getTransactionByTransactionType = function(req, res, next) {
  console.log(req);
  Transaction.find({ transactionType: req.query.type }, function(err, transactions) {
    if (err) {
      return next(err);
    }
    if (!transactions|| transactions.length == 0) {
      return res.status(404).send('Not Found');
    }
    return res.status(200).json(transactions);
  });
};