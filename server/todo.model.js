const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let quizData = new Schema({
    question: {
        type: String,
        required: true
    },
    choices: {
        type: [String],
        required: true
    },
    answer: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('quizData',quizData)