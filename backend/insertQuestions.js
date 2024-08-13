const mongoose = require('mongoose');
const Question = require('./models/question-model');

mongoose.connect('mongodb+srv://jayeshunde3233:e58KQHDEkrjWP9Ma@jeecluster.1mvlqvv.mongodb.net/?retryWrites=true&w=majority&appName=jeeCluster', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected...');
}).catch(err => {
    console.log('Failed to connect to MongoDB', err);
});

const questions = [
    {
        description: "Two cars are moving in the same direction with speeds of 60 km/h and 40 km/h respectively. What is the relative speed of the first car with respect to the second?",
        options: {
            optiona: "20 km/h",
            optionb: "40 km/h",
            optionc: "60 km/h",
            optiond: "100 km/h"
        },
        correctAnswer: "optiona",
        difficulty: "Easy",
        points: 2000,
        topic: "Relative Motion",
        section: "Mechanics",
        subject: "Physics",
        chapter: "Kinematics",
        acceptanceRate: 90
    },
    {
        description: "A boat is moving upstream with a speed of 5 m/s in a river flowing at 3 m/s. What is the relative speed of the boat with respect to the riverbank?",
        options: {
            optiona: "2 m/s",
            optionb: "5 m/s",
            optionc: "8 m/s",
            optiond: "10 m/s"
        },
        correctAnswer: "optiona",
        difficulty: "Medium",
        points: 6000,
        topic: "Relative Motion",
        section: "Mechanics",
        subject: "Physics",
        chapter: "Kinematics",
        acceptanceRate: 85
    },
    {
        description: "Two trains are moving towards each other with speeds of 50 km/h and 70 km/h respectively. What is the relative speed of one train with respect to the other?",
        options: {
            optiona: "20 km/h",
            optionb: "50 km/h",
            optionc: "70 km/h",
            optiond: "120 km/h"
        },
        correctAnswer: "optiond",
        difficulty: "Easy",
        points: 2500,
        topic: "Relative Motion",
        section: "Mechanics",
        subject: "Physics",
        chapter: "Kinematics",
        acceptanceRate: 95
    },
    {
        description: "A car is moving east at 30 m/s, and a truck is moving west at 20 m/s. What is the relative velocity of the car with respect to the truck?",
        options: {
            optiona: "10 m/s east",
            optionb: "10 m/s west",
            optionc: "50 m/s east",
            optiond: "50 m/s west"
        },
        correctAnswer: "optionc",
        difficulty: "Medium",
        points: 5500,
        topic: "Relative Motion",
        section: "Mechanics",
        subject: "Physics",
        chapter: "Kinematics",
        acceptanceRate: 80
    },
    {
        description: "An observer is moving at 10 m/s along a straight path, while another object is moving at 15 m/s in the same direction. What is the relative velocity of the object with respect to the observer?",
        options: {
            optiona: "5 m/s",
            optionb: "10 m/s",
            optionc: "15 m/s",
            optiond: "25 m/s"
        },
        correctAnswer: "optiona",
        difficulty: "Medium",
        points: 6000,
        topic: "Relative Motion",
        section: "Mechanics",
        subject: "Physics",
        chapter: "Kinematics",
        acceptanceRate: 87
    },
    {
        description: "A plane is flying north at 200 m/s and a wind is blowing east at 50 m/s. What is the resultant velocity of the plane?",
        options: {
            optiona: "205 m/s",
            optionb: "250 m/s",
            optionc: "210 m/s",
            optiond: "150 m/s"
        },
        correctAnswer: "optionc",
        difficulty: "Hard",
        points: 9000,
        topic: "Relative Motion",
        section: "Mechanics",
        subject: "Physics",
        chapter: "Kinematics",
        acceptanceRate: 75
    },
    {
        description: "A boat is crossing a river that flows at 4 m/s, and the boat can row at 3 m/s. What is the time taken to cross the river if its width is 30 m?",
        options: {
            optiona: "7.5 s",
            optionb: "10 s",
            optionc: "15 s",
            optiond: "20 s"
        },
        correctAnswer: "optionc",
        difficulty: "Medium",
        points: 7000,
        topic: "Relative Motion",
        section: "Mechanics",
        subject: "Physics",
        chapter: "Kinematics",
        acceptanceRate: 85
    },
    {
        description: "Two cyclists are moving towards each other with speeds of 15 km/h and 20 km/h respectively. What is their relative speed?",
        options: {
            optiona: "5 km/h",
            optionb: "15 km/h",
            optionc: "20 km/h",
            optiond: "35 km/h"
        },
        correctAnswer: "optiond",
        difficulty: "Medium",
        points: 6500,
        topic: "Relative Motion",
        section: "Mechanics",
        subject: "Physics",
        chapter: "Kinematics",
        acceptanceRate: 80
    },
    {
        description: "A swimmer can swim in still water at 2 m/s. If the river flows at 1 m/s, what is the swimmer's speed relative to the bank if swimming directly across?",
        options: {
            optiona: "1 m/s",
            optionb: "2 m/s",
            optionc: "2.24 m/s",
            optiond: "3 m/s"
        },
        correctAnswer: "optionc",
        difficulty: "Hard",
        points: 9500,
        topic: "Relative Motion",
        section: "Mechanics",
        subject: "Physics",
        chapter: "Kinematics",
        acceptanceRate: 70
    },
    {
        description: "A person walks north at 4 m/s, and another person walks east at 3 m/s. What is the relative velocity of the second person with respect to the first?",
        options: {
            optiona: "3 m/s",
            optionb: "4 m/s",
            optionc: "5 m/s",
            optiond: "7 m/s"
        },
        correctAnswer: "optionc",
        difficulty: "Hard",
        points: 10000,
        topic: "Relative Motion",
        section: "Mechanics",
        subject: "Physics",
        chapter: "Kinematics",
        acceptanceRate: 75
    }
];

Question.insertMany(questions)
    .then(() => {
        console.log('Questions inserted');
        mongoose.connection.close();
    })
    .catch(err => {
        console.log('Error inserting questions', err);
        mongoose.connection.close();
    });