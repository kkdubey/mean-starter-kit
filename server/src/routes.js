'use strict';

var express = require('express');
var router = express.Router();

var thing = require('./thing/thing.controller');
var user = require('./user/user.controller');
var book = require('./book/book.controller');
var transaction = require('./manageBook/transaction.controller');

// things ressources
router.get('/api/things', thing.find);
router.get('/api/things/:id', thing.get);
router.post('/api/things', thing.post);
router.put('/api/things/:id', thing.put);
// user ressources
router.get('/api/users', user.find);
router.get('/api/users/:id', user.get);
router.post('/api/auth/register', user.post);
router.put('/api/users/:id', user.put);
router.post('/api/auth/login', user.getByEmailAndPassword);
router.post('/api/auth/isuserexit', user.getByEmail);
router.get('/api/getNormalUsers', user.getNormalUsers);

// things books
router.get('/api/books', book.find);
router.get('/api/books/:id', book.get);
router.post('/api/books', book.post);
router.put('/api/books/:id', book.put);

// things transaction
router.get('/api/transactions', transaction.find);
router.get('/api/transactions/:id', transaction.get);
router.post('/api/transactions', transaction.post);
router.post('/api/returnBook', transaction.returnBook);

module.exports = router;
