// const userService = require('../services/user-service');
// const questionService = require('../services/question-service')
// async function getSolvedQuestionsByTopic(chapter, userName) {
//         // Find the user
//         const user = await userService.findUser({ "name":userName });
//         if (!user) {
//             return res.status(400).json({ message: 'User not found' });
//         }

//         // Get all questions for the given chapter
//         const questions = await questionService.getQuestionsByChapter(chapter);
//         const questionIds = questions.map(q => q._id);

//         // Get all submissions by the user for these questions
//         const submissions = await questionService.getSubmissionsByUserAndQuestions(user._id, questionIds);

//         // Create a map to count questions per topic
//         const topicMap = new Map();

//         questions.forEach(question => {
//           if (!topicMap.has(question.topic)) {
//             topicMap.set(question.topic, { count: 0, solved: 0 });
//           }
//           const topicData = topicMap.get(question.topic);
//           topicData.count++;
//         });

//         submissions.forEach(submission => {
//           const question = questions.find(q => q._id.equals(submission.questionId));
//           if (question) {
//             const topicData = topicMap.get(question.topic);
//             topicData.solved++;
//           }
//         });

//         // Convert map to the desired format
//         const result = [];
//         topicMap.forEach((value, key) => {
//           result.push({ topic: key, ...value });
//         });

//         return result;
//       }
// class DataController{
//     async getChapterData(req,res){
//         const {chapterName, userName} = req.body;
//         if (!userName || !chapterName) {
//             return res.status(400).json({ message: 'Username and chapterName is required' });
//         }
//         // console.log(chapterName,userName);
//         try{
//             // const user = await userService.findUser({ "name":userName });
//             // // console.log(user);
//             // const topics = await questionService.findTopics(chapterName);
//             // // console.log(topics);
//             // res.send(topics);
//             const result = await getSolvedQuestionsByTopic(chapterName,userName);
//             console.log(result)
//             res.send(result);
//         }catch(error){
//             console.error(error);
//             res.status(500).json({ message: 'Db error' });
//         }
//     }

// }

// module.exports = new DataController();