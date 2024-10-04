const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    solvedQuestions: {
        type: [String],
        default: []
    },
    attempedQuestions: {
        type: [String],
        default: []
    },
    incorrectQuestions: {
        type: [String],
        default: []
    },
    easy: {
        type: Number,
        default: 0
    },
    medium: {
        type: Number,
        default: 0
    },
    hard: {
        type: Number,
        default: 0
    }
});

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 1000
    },
    ranks: {
        type: [Number],
        default: []
    },
    level: {
        type: Number,
        default: 1
    },
    solvedQuestionsUniversal: {
        type: [String],
        default: []
    },
    incorrectQuestionsUniversal: {
        type: [String],
        default: []
    },
    attempedQuestionsUniversal: {
        type: [String],
        default: []
    },
    levelUpdates: {
        type: [Date],
        default: []
    },
    physics: {
        type: subjectSchema,
        default: {}
    },
    chemistry: {
        type: subjectSchema,
        default: {}
    },
    mathematics: {
        type: subjectSchema,
        default: {}
    },
    bio: {
        type: String,
        required: true,
        default: "I Love JEECODE"
    },
    class: {
        type: String,
        required: true,
        default: "11th"
    },
    school: {
        type: String,
        required: true,
        default: "NA"
    },
    img: { type: String, 
        required: true,
        default: '/images/userIcon1.jpeg' 
    }, // Field to store the profile photo path
}, {
    timestamps: true,
    toJSON: { getters: true }
});

module.exports = mongoose.model('User', userSchema, 'users');
