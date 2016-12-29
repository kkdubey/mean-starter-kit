'use strict';

var express = require('express');
var router = express.Router();

var thing = require('./thing/thing.controller');
var user = require('./user/user.controller');

// things ressources
router.get('/api/things', thing.find);
router.get('/api/things/:id', thing.get);
router.post('/api/things', thing.post);
router.put('/api/things/:id', thing.put);
// user ressources
router.get('/api/users', user.find);
router.get('/api/users/:id', user.get);
router.post('/api/users', user.post);
router.put('/api/users/:id', user.put);

module.exports = router;
