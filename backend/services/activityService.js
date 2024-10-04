const UserService = require("../services/user-service");
const  QuestionService = require("../services/question-service");
class activityService {
    async statusForActivity(submissionId,user){
        const question = await QuestionService.getQuestionBySubmissionId(submissionId);
        if(question){
            const topic = question.topic;
            const allQuestions = await QuestionService.getQuestionsByTopic(topic);
            const qIds = allQuestions.map(q => q._id);
            const submissions = await QuestionService.getSubmissionsByUserAndQuestions(user._id, qIds);
            return {topic: topic,total:allQuestions.length, completed: submissions.length, status: true};
        }else{
            return {topic: null,total:null, completed: 0, status: false};
        }
        
    }
    async findActivity(email){
        const user = await UserService.findUser({ email});
        const mathsAttemptedQuestions = user.mathematics.attempedQuestions;
        const physicsAttemptedQuestions = user.physics.attempedQuestions;
        const chemistryAttemptedQuestions = user.chemistry.attempedQuestions;

        const mathsQid = mathsAttemptedQuestions.length >0 ? mathsAttemptedQuestions[mathsAttemptedQuestions.length-1] : null;
        const physicsQid = physicsAttemptedQuestions.length >0 ? physicsAttemptedQuestions[physicsAttemptedQuestions.length-1] : null;
        const chemistryQid = chemistryAttemptedQuestions.length >0 ? chemistryAttemptedQuestions[chemistryAttemptedQuestions.length-1] : null;
        let response = [];
        let mathData = await this.statusForActivity(mathsQid,user);
        mathData.subject="maths";
        mathData.lastQid=mathsQid;
        response.push(mathData);
        let physicsData = await this.statusForActivity(physicsQid,user);
        physicsData.subject="physics";
        physicsData.lastQid=physicsQid;
        response.push(physicsData);
        let chemistryData = await this.statusForActivity(chemistryQid,user);
        chemistryData.subject="chemistry";
        chemistryData.lastQid=chemistryQid;
        response.push(chemistryData);
        return response;
    }
}

module.exports = new activityService();