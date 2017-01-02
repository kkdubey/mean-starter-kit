'use strict';

var User = require('./user.model');

/**
 * GET /Users
 *
 * @description
 * list of Users
 *
 */
exports.find = function(req, res, next) {
  User.find(function(err, users) {
    if (err) {
      return next(err);
    }
    return res.status(200).json(users);
  });
};

/**
 * GET /Users/:id
 *
 * @description
 * Find User by id
 *
 */
exports.get = function(req, res, next) {
  User.findById(req.params.id, function(err, thing) {
    if (err) {
      return next(err);
    }
    if (!thing) {
      return res.status(404).send('Not Found');
    }
    return res.status(200).json(thing);
  });
};

/**
 * POST /Users
 *
 * @description
 * Create a new user
 *
 */
exports.post = function(req, res, next) {
  User.create(req.body, function(err, user) {
    if (err) {
      return next(err);
    }
    return res.status(201).json(user);
  });
};

/**
 * PUT /users/:id
 *
 * @description
 * Update a user
 *
 */
exports.put = function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(404).send('Not Found');
    }

    user.name = req.body.name;
    user.description = req.body.description;

    user.save(function(err) {
      if (err) {
        return next(err);
      }
      return res.status(200).json(user);
    });
  });
};

/**
 * GET /user/:email, passwword
 *
 * @description
 * Find thing by email and passwword
 *
 */
exports.getByEmailAndPassword = function(req, res, next) {
  User.find({email: req.body.email, password: req.body.password}, function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user || user.length == 0) {
      return res.status(404).send('Not Found');
    }
    return res.status(200).json(user[0]);
  });
};
/**
 * GET /user/:email
 *
 * @description
 * Find user by email
 *
 */
exports.getByEmail = function(req, res, next) {
  User.find({ email: req.body.email }, function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user|| user.length == 0) {
      return res.status(404).send('Not Found');
    }
    return res.status(200).json(user[0]);
  });
};

/**
 * GET /users/:STANDARD
 *
 * @description
 * Find users: STANDARD
 *
 */
exports.getNormalUsers = function(req, res, next) {
  User.find({ userType: "STANDARD" }, function(err, users) {
    if (err) {
      return next(err);
    }
    if (!users|| users.length == 0) {
      return res.status(404).send('Not Found');
    }
    return res.status(200).json(users);
  });
};