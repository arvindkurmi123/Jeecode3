const authController = require('./controllers/auth-controller');
const authMiddlewares = require('./middlewares/authMiddlewares')
const questionController = require('./controllers/question-controller');
const dataController = require('./controllers/data-controller');
const router = require('express').Router();

// authentication routes
router.post('/api/send-otp-email',authController.sendOtpEmail);
router.post('/api/find-user',authController.findUser);
router.post('/api/verify-otp',authController.verifyOtp);
router.get('/api/refresh',authController.refresh); // to refresh the access token and refresh token
router.post('/api/login-email',authController.loginEmail);
router.post('/api/logout',authMiddlewares,authController.logout);
router.post('/api/google-login', authController.googleLogin);
router.post('/api/questions/find-topics', questionController.findTopics);
router.post('/api/find-first-question',questionController.findFirstQuestionByTopic);
router.post('/api/find-question-by-id',questionController.findQuestionById);
router.post('/api/next-question',questionController.getNextQuestion);
router.post('/api/check-answer',questionController.checkAnswer);
router.post('/api/questions/get-topics-for-user',questionController.getSolvedQuestionsByTopic);
router.post('/api/find-user-info', authController.findUserInfo);
router.post('/api/find-submission-info', questionController.findSubmissionInfo);

module.exports = router;