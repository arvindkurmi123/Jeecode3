const UserService = require('../services/user-service');
const QuestionService = require('../services/question-service');
const SubmissionModel = require('../models/submission-model');


class QuestionController {
    async getSolvedQuestionsByTopic(req,res) {
        const {chapter, userName} = req.body;
        // Find the user
        const user = await UserService.findUser({ "name":userName });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        // console.log(user);
        // Get all questions for the given chapter
        const questions = await QuestionService.getQuestionsByChapter(chapter);
        const questionIds = questions.map(q => q._id);
        // console.log(questions);
        // Get all submissions by the user for these questions
        const submissions = await QuestionService.getSubmissionsByUserAndQuestions(user._id, questionIds);
        // console.log(submissions);
        // Create a map to count questions per topic
        const topicMap = new Map();

        questions.forEach(question => {
          if (!topicMap.has(question.topic)) {
            topicMap.set(question.topic, { count: 0, solved: 0 });
          }
          const topicData = topicMap.get(question.topic);
          topicData.count++;
        });

        submissions.forEach(submission => {
          const question = questions.find(q => q._id.equals(submission.questionId));
          if (question) {
            const topicData = topicMap.get(question.topic);
            topicData.solved++;
          }
        });
        // console.log(topicMap);
        // Convert map to the desired format
        const result = [];
        topicMap.forEach((value, key) => {
          result.push({ topic: key, ...value });
        });
        // console.log(result);
        res.status(200).json({result});
      }
    async findTopics(req, res) {
        const { chapterName } = req.body;
        if (!chapterName) {
            return res.status(400).json({ message: 'Chapter is required' });
        }

        try {
            const topics = await QuestionService.findTopicsByChapter(chapterName);
            res.json({ topics });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error fetching topics' });
        }
    }

    async findFirstQuestionByTopic(req, res) {
        const { topic } = req.body;
        if (!topic) {
            return res.status(400).json({ message: 'Topic is required' });
        }

        try {
            const question = await QuestionService.findFirstQuestionByTopic(topic);
            res.json({ question });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error fetching question' });
        }
    }

    async findQuestionById(req, res) {
        const { questionId } = req.body;
        if (!questionId) {
            return res.status(400).json({ message: 'Question ID is required' });
        }

        try {
            const question = await QuestionService.findQuestionById(questionId);
            res.json({ question });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error fetching question' });
        }
    }

    async getNextQuestion(req, res) {
        const { questionId } = req.body;
        if (!questionId) {
            return res.status(400).json({ message: 'Current Question ID is required' });
        }

        try {
            const question = await QuestionService.getNextQuestion(questionId);
            if (question) {
                res.json({ question });
            } else {
                res.status(404).json({ message: 'No more questions or move to the next topic.' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error fetching next question' });
        }
    }

    async findSubmissionInfo(req,res){
        try {
            const { submissionIds } = req.body;
    
            const submissions = await SubmissionModel.find({ _id: { $in: submissionIds } })
                .select('_id timeSpent createdAt totalAttempts questionId')
                .exec();
    
            // Transform the data to match the required format
            const transformedSubmissions = submissions.map(submission => ({
                submissionId: submission._id,
                timeSpent: submission.timeSpent,
                submissionTimestamp: submission.createdAt,
                trials: submission.totalAttempts,
                questionId: submission.questionId
            }));
    
            res.json(transformedSubmissions);
        } catch (error) {
            console.error('Error fetching submission info:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async checkAnswer(req, res) {
        const { username, questionId, optionSelected, timeSpent } = req.body;
    
        if (!username || !questionId || !optionSelected || timeSpent === undefined) {
            return res.status(400).json({ message: 'Required fields are missing' });
        }
    
        try {
            // Find user by username
            const user = await UserService.findUser({ name: username });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            const userId = user._id;
    
            // Find the question
            const question = await QuestionService.findQuestionById(questionId);
            if (!question) {
                return res.status(404).json({ message: 'Question not found' });
            }
    
            const optionMap = {
                "A": "optiona",
                "B": "optionb",
                "C": "optionc",
                "D": "optiond"
            };
    
            const selectedOptionField = optionMap[optionSelected];
            if (!selectedOptionField) {
                return res.status(400).json({ message: 'Invalid option selected' });
            }
    
            // Check if submission exists
            let submission = await SubmissionModel.findOne({ userId, questionId });
    
            if (submission) {
                // Update existing submission
                submission.totalAttempts += 1;
                submission.timeSpent += timeSpent;
                submission.optionSelected = optionSelected;
                await submission.save();
            } else {
                // Create new submission
                submission = new SubmissionModel({
                    userId,
                    questionId,
                    totalAttempts: 1,
                    timeSpent,
                    optionSelected
                });
                await submission.save();
            }
    
            // Determine if the answer is correct
            const correctOption = question.correctAnswer;
            const isCorrect = selectedOptionField === correctOption;
    
            // Update submission with correct status
            if (submission.doneStatus === false) {
                submission.doneStatus = isCorrect;
                await submission.save();
            }
    
            // Update user data
            const points = question.points;
            const oldRating = user.rating;
            const newRating = oldRating + (points * 1.5) / timeSpent;
    
            let newLevel = user.level;
            if (newRating >= 10000) {
                newLevel = 10;
            } else {
                newLevel = Math.floor(newRating / 1000);
            }
    
            const levelUpdated = newLevel !== user.level;
            if (levelUpdated) {
                user.level = newLevel;
                user.levelUpdates.push(new Date());
            }
    
            // Update arrays for universal questions
            const submissionId = submission._id.toString();
    
            if (isCorrect) {
                // Update solved and incorrect questions
                user.solvedQuestionsUniversal = user.solvedQuestionsUniversal.filter(id => id !== submissionId);
                user.incorrectQuestionsUniversal = user.incorrectQuestionsUniversal.filter(id => id !== submissionId);
                if (!user.solvedQuestionsUniversal.includes(submissionId)) {
                    user.solvedQuestionsUniversal.push(submissionId);
                }
            } else {
                // Update incorrect and solved questions
                user.incorrectQuestionsUniversal = user.incorrectQuestionsUniversal.filter(id => id !== submissionId);
                if (!user.incorrectQuestionsUniversal.includes(submissionId)) {
                    user.incorrectQuestionsUniversal.push(submissionId);
                }
            }
    
            // Update attempted questions
            
            user.attempedQuestionsUniversal.push(submissionId);
            
    
            // Update subject-specific data
            const subject = question.subject.toLowerCase(); // Assuming the question has a subject property
            if (subject) {
                const subjectData = user[subject];
                
                if (subjectData) {
                    if (isCorrect) {
                        // Update solved questions if not already present
                        if (!user[subject].solvedQuestions.includes(submissionId)) {
                            user[subject].solvedQuestions.push(submissionId);
                            switch (question.difficulty) {
                                case 'Easy':
                                    user[subject].easy += 1;
                                    break;
                                case 'Medium':
                                    user[subject].medium += 1;
                                    break;
                                case 'Hard':
                                    user[subject].hard += 1;
                                    break;
                                default:
                                    console.warn('Unknown difficulty level:', question.difficulty);
                            }
                        }
                        
                    } else {
                        // Update incorrect questions if not already present
                        if (!user[subject].incorrectQuestions.includes(submissionId)) {
                            user[subject].incorrectQuestions.push(submissionId);
                        }
                    }
                    // Update attempted questions if not already present
                    
                    user[subject].attempedQuestions.push(submissionId);
                    
                    
                }
            }
            
            user.rating = newRating;
            console.log(user[subject]);
            await user.save();
    
            // Respond with result
            res.json({ correct: isCorrect });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error processing answer' });
        }
    }
    
    
}

module.exports = new QuestionController();
