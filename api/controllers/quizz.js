const Quizz = require('../models/quizz');
const mongoose = require('mongoose');
// /quizz/
exports.quizz_get_all = (req, res, next) => {
    const user = req.user;
    Quizz.find()
        .select("name _id resume")
        .where('user')
        .equals(user._id)
        .exec()
        .then(doc => {
            const response = {
                count: doc.length,
                quizz: doc.map(doc => {
                    return {
                        name: doc.name,
                        resume: doc.resume,
                        _id: doc._id,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/quizz/"
                        }
                    }
                })
            }   

            return res.status(200).json(response);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ error: error });
        });
}

// /quizz/id
exports.quizz_get_one = (req, res, next) => {
    //params for the get requests
    const quizzID = req.params.quizzID;

    Quizz.findById(quizzID)
        .exec()
        .then(doc => {
            console.log(doc)
            if (doc) {
                const response = {
                    count: 1,
                    quizz: {
                        name: doc.name,
                        resume: doc.resume,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: "http://localhost:3000/quizz/" + doc._id
                        }
                    }
                }
                return res.status(200).json(response);
            } else {
                return res.status(404).json({ message: 'No entry for the quizz wanted' });
            }
        })
        .catch(error => console.log(error));
}

// /quizz/
exports.quizz_creation = (req, res, next) => {
    //body for the post requests
    const quizz = new Quizz({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        resume: req.body.resume
    });

    quizz.save()
        .then(result => {
            res.status(201).json({
                message: 'Quizz created',
                createdQuizz: {
                    name: result.name,
                    resume: result.resume,
                    _id: resume._id,
                    request: {
                        type: 'POST',
                        url: 'http://localhost:3000/quizz'
                    }
                }
            });
        })
        .catch(error => {
            console.log(error)
            return res.status(404).json({ error: error });
        });

    return res.status(201).json({
        message: 'Create a quizz',
        createdQuizz: quizz
    });
}

// /quizz/id
exports.quizz_update = (req, res, next) => {
    const quizzID = req.params.quizzID;
    const updateOps = {};

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Quizz.update({ _id: quizzID }, {
        $set: updateOps
    }).exec()
        .then(doc => {
            const response = {
                quizz: {
                    _id: quizzID
                },
                request: {
                    type: 'PATCH',
                    url: 'http://localhost/quizz/' + doc._id
                }
            }
            return res.status(200).json(response);
        })
        .catch(error => {
            console.log(error);
            return req.status(500).json({
                error: error
            });
        });
}

exports.quizz_delete = (req, res, next) => {
    const quizzID = req.params.quizzID;
    Quizz.remove({
        _id: quizzID
    })
        .exec()
        .then(result => {
            console.log(result);

            const response = {
                quizz: {
                    _id: quizzID
                },
                request: {
                    type: 'DELETE',
                    url: 'http://localhost:3030/quizz/' + quizzID
                }
            }

            return res.status(201).json(response);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({
                message: 'Error during the deleting of the quizz',
                error: error
            });
        });
}