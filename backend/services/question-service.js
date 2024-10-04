const QuestionModel = require('../models/question-model');
const submissionModel = require('../models/submission-model');
const SubmissionModel = require('../models/submission-model');
class QuestionService {
    async findTopicsByChapter(chapter) {
        const questions = await QuestionModel.find({ chapter });
        const topics = [...new Set(questions.map(q => q.topic))];
        return topics;
    }

    async findFirstQuestionByTopic(topic) {
        const question = await QuestionModel.findOne({ topic })
            .sort({ points: 1 })
            .exec();
        return question;
    }

    async findQuestionById(questionId) {
        const question = await QuestionModel.findById(questionId);
        return question;
    }
    async getNextQuestion(currentQuestionId) {
        const currentQuestion = await QuestionModel.findById(currentQuestionId);
        if (!currentQuestion) throw new Error('Current question not found');

        const nextQuestion = await QuestionModel.findOne({
            topic: currentQuestion.topic,
            points: { $gt: currentQuestion.points },
        }).sort({ points: 1 }).exec();

        return nextQuestion || null;
    }
    async findTopics(chapterName){
        try {
            const topics = await QuestionModel.aggregate([
                { $match: { chapter: chapterName } },
                { $group: { _id: "$topic", count: { $sum: 1 } } },
                { $project: { topic: "$_id", count: 1, _id: 0 } }
            ]);

            // console.log(topics);
            return topics;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
    async getQuestionsByChapter(chapter) {
        return QuestionModel.find({ chapter }).exec();
    }
    async getQuestionsByTopic(topic){
        return QuestionModel.find({ topic }).exec();
    }
    async getQuestionBySubmissionId(submissionId){
        const submission = await submissionModel.findById(submissionId);
        if(!submission){
            return null;
        }
        const question = await QuestionModel.findById(submission.questionId);
        return question;
    }
    async getSubmissionsByUserAndQuestions(userId, questionIds) {
        return SubmissionModel.find({ userId, questionId: { $in: questionIds }, doneStatus: true }).exec();
    }
}

module.exports = new QuestionService();
