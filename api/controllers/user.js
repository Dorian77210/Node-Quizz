const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = (req, res, next) => {
    //check if the email is available
    User.where('email')
        .equals(req.body.email)
        .exec()
        .then(user => {
            if(user.length >= 1) {
                //conflict status
                res.status(409).json({
                    message: 'The email ' + req.body.email + ' is already used by another user'
                });
            } else {
             // create an hash of the password given by the user
                bcrypt.hash(req.body.password, 10, (error, hash) => {
                    if(error) {
                        res.status(404).json({
                            error: error,
                            reason: "Error during the hashing of the password"
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
                                res.status(200).json({message: "The user is successfully created"});
                            })
                            .catch(error => {
                                console.log(error);
                                res.status(500).json({error: error});
                            });
                    }
                });
            }
        })
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
                    message: "Auth failed"
                });
            }

            bcrypt.compare(password, user[0].password, (err, result) => {
                if(err) {
                    return res.status(401).json({
                        message: "Invalid credentials"
                    });
                }

                if(result) {
                    const token = jwt.sign({
                        email: user.email,
                        userID: user._id
                    }, process.env.JWT_KEY, {
                        expiresIn: "2h"
                    });

                    return res.status(200).json({
                        message: "Auth successful",
                        token: token
                    });
                }

            });
        })
        .catch(error => {
            res.status(400).json({error : error});
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
    const userID = req.params.quizzID;
    const updatedOps = {};

    for(const op of req.body) {
        updatedOps[op] = op.value;
    }

    Quizz.update({ _id: userID }, {
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