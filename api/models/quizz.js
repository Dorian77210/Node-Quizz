const mongoose = require('mongoose');

const quizzSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    resume: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        default: new Date()
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Quizz', quizzSchema);