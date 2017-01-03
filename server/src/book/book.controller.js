'use strict';

var Book = require('./book.model');

/**
 * GET /books
 *
 * @description
 * list of books
 *
 */
exports.find = function(req, res, next) {
  Book.find(function(err, books) {
    if (err) {
      return next(err);
    }
    return res.status(200).json(books);
  });
};

/**
 * GET /books/:id
 *
 * @description
 * Find book by id
 *
 */
exports.get = function(req, res, next) {
  Book.findById(req.params.id, function(err, book) {
    if (err) {
      return next(err);
    }
    if (!book) {
      return res.status(404).send('Not Found');
    }
    return res.status(200).json(book);
  });
};

/**
 * POST /Books
 *
 * @description
 * Create a new book
 *
 */
exports.post = function(req, res, next) {
  Book.create(req.body, function(err, book) {
    if (err) {
      return next(err);
    }
    return res.status(201).json(book);
  });
};

/**
 * PUT /books/delete:id
 *
 * @description
 * Delete a book by id
 *
 */
exports.deleteBook = function(req, res, next) {
  Book.findById(req.params.id, function(err, book) {
    if (err) {
      return next(err);
    }
    if (!book) {
      return res.status(404).send('Not Found');
    }

    book.isDeleted = true;

    book.save(function(err) {
      if (err) {
        return next(err);
      }
      return res.status(200).json(book);
    });
  });
};

