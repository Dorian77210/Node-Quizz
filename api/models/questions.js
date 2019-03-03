const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    index: { type: Number, required: true },
    quizz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quizz',
        required: true
    },
    title: { type: String, required: true },
    content: { type: String, required: true },
});

module.exports = mongoose.model('Question', questionSchema);