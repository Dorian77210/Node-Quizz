const mongoose = require('mongoose');

const Quizz = require('../models/quizz');
const Question = require('../models/questions');

exports.question_creation = (req, res, next) => {
    //body for the post requests
    const question = new Question({
        _id: mongoose.Types.ObjectId(),
        index: req.body.index,
        content: req.body.content,
        quizz: req.body.quizz,
        title: req.body.title
    });

    question.save()
        .then(result => {
            console.log(result);
            res.status(201).json(result)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: error });
        });
}

exports.question_get_all = (req, res, next) => {
    console.log('okok');
    Question.find()
            .exec()
            .then(docs => {
                const response = {
                    count: docs.length,
                    questions: docs.map(doc => {
                        return {
                            index: doc.index,
                            _id: doc._id,
                            content: doc.content,
                            quizz: doc.quizz,
                            title: doc.title || "",
                            request: {
                                type: 'GET'
                            }
                        }
                    }),
                }
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json({error: error});
            });
}

exports.question_get_by_quizz = (req, res, next) => {
    const quizzID = req.params.quizzID;
    // try to get the associated quizz
    Quizz.findById(quizzID)
         .exec()
         .then(doc => {

         })
         .catch(error => {
            const errorResponse = {
                error: error,
                message: "The quizz with the number " + quizzID + "doesn't exist !"
            }

            res.status(500).json(errorResponse);
         });

    Question.where('quizz')
            .equals(quizzID)
            .exec()
            .then(docs => {
                const response = {
                    count: docs.length,
                    quizz: quizzID,
                    questions: docs.map(doc => {
                        return  {
                           index: doc.index,
                            _id: doc._id,
                            content: doc.content,
                            request: {
                                type: "GET",
                                url: "http://localhost:3000/quizz/"
                            }
                        }
                    })
                }
                res.status(200).json(docs);
            })
            .catch(error => {
                res.status(500).json({error: error});
            });
}

exports.question_delete_by_quizz = (req, res, next) => {
    const quizzID = req.params.quizzID;
    Questions.remove({
        quizz: quizzID
    })
    .then(docs => {
        const response = {
            count: docs.length,
            quizz: quizzID,
            deletedQuestions: docs.map(doc => {
                return  {
                   index: doc.index,
                    _id: doc._id,
                    content: doc.content,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/quizz/"
                    }
                }
            })
        }
    })
    .catch(error => {
        res.status(500).json({error: error});
    });
}