const mongoose = require('mongoose');

const quizzSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    resume: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Quizz', quizzSchema);