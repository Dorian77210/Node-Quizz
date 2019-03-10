const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


exports.signup_get = (req, res, next) => {
    res.render('index');
}

exports.get_user_by_token = (req, res, next) => {
    const userSession = req.user;
    if(!userSession) {
        return res.status(404).json({
            title: 'Error when retrieving your profil',
            content: 'Your session is invalid'
        });
    }

    const _id = userSession._id;

    // retrieve the user
    User.findOne({ _id: _id }, (err, user) => {
        if(err) {
            return res.status(404).json({
                title: 'Problem with your account',
                message: 'An error was occurred during the retrieving of your profil. Please retry later'
            });
        }

        return res.status(201).json({
            user: {
                pseudo: user.pseudo,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                createdAt: user.createdAt
            }
        });
    })
}
exports.signup = (req, res, next) => {
    //check if the email is available
    User.where('email')
        .equals(req.body.email)
        .exec()
        .then(user => {
            if(user.length >= 1) {
                //conflict status
                return res.status(409).json({
                    content: 'The email ' + req.body.email + ' is already used by another user',
                    errorStatus: 409,
                    title: 'Problem with mail'
                });
            } else {
             // create an hash of the password given by the user
                bcrypt.hash(req.body.password, 10, (error, hash) => {
                    if(error) {
                        return res.status(404).json({
                            content: "Error of the server. Please retry after few moments",
                            title: "Server error",
                            errorStatus: 404
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            password: hash,
                            pseudo: req.body.pseudo
                        });

                        user.save()
                            .then(doc => {
                                return res.status(200).json({
                                    title: "Success !",
                                    content: "Your account is successfully created !"
                                });
                            })
                            .catch(error => {
                                console.log(error);
                                return res.status(500).json({
                                    error: error,
                                    errorStatus: 500
                                });
                            });
                    }
                });
            }
        })
}

exports.signin_get = (req, res, next) => {
    res.render('index');
}
exports.signin = (req, res, next) => {
    const login = req.body.email;
    const password = req.body.password;

    User.where('email')
        .equals(login)
        .exec()
        .then(user => {
            if(!user) {
                //no users
                return res.status(401).json({
                    message: "Auth failed",
                    title: 'Auth failed'
                });
            }

            user = user[0];
            bcrypt.compare(password, user.password, (err, result) => {
                if(err) {
                    return res.status(401).json({
                        title: 'Invalid credentials',
                        message: "Invalid credentials"
                    });
                }


                if(result) {
                    const token = jwt.sign({
                        _id: user._id,
                        email: user.email
                    }, process.env.JWT_KEY, {
                        expiresIn: "2h"
                    });

                    req.session.token = token;
                    req.session.save();
                    return res.status(200).json({
                        title: 'Auth successful',
                        message: "Auth successful",
                        token: token
                    });
                }

                return res.status(400).json({
                    title: 'Auth failed',
                    message: 'Invalid credentials'
                });

            });
        })
        .catch(error => {
            return res.status(400).json({
                error : error,
                title: 'Server error',
                message: 'Something was wrong...'
            });
        });
}

exports.delete_user = (req, res, next) => {
    const email = req.params.email;
    User.remove({ email: email })
        .exec()
        .then(user => {
            res.status(200).json({
                message: "User deleted with success"
            })
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
}

exports.update_user = (req, res, next) => {
    const userID = req.params.userID;
    const updatedOps = {};

    for(const op of req.body) {
        updatedOps[op] = op.value;
    }

    User.update({ _id: userID }, {
        $set: updatedOps
    }).exec()
      .then(doc => {
          const response = {
              message: 'User updated with success',
              user: {
                  _id: userID
              }
          }
          res.status(200).json(response);
      })
      .catch(error => {
          res.status(500).json({ error: error });
      });
}