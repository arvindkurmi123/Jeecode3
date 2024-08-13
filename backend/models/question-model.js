const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    description: { type: String, required: true },
    options: {
        optiona: { type: String, required: true },
        optionb: { type: String, required: true },
        optionc: { type: String, required: true },
        optiond: { type: String, required: true }
    },
    correctAnswer: { type: String, required: true },
    difficulty: { type: String, required: true },
    points: { type: Number, required: true },
    topic: { type: String, required: true },
    section: { type: String, required: true },
    subject: { type: String, required: true },
    chapter: { type: String, required: true },
    acceptanceRate: { type: Number, required: true },
}, {
    timestamps: true,
    toJSON: { getters: true },
});

module.exports = mongoose.model('Question', questionSchema, 'questions');
