import axios from 'axios';

const api = axios.create(
    {
        withCredentials:true,
        baseURL:import.meta.env.VITE_BACKEND_URL,
        headers:{
            'Content-Type':'application/json',
            Accept: 'application/json',
        }
    }
);

//list of all endpoints

export const sendOtpEmail = (data)=>api.post('/api/send-otp-email',data);
export const findUser = (data)=>api.post('/api/find-user',data);
export const loginEmail = (data)=> api.post('/api/login-email',data);
export const verifyOtp = (data)=>api.post('/api/verify-otp',data);
export const logout = () => api.post('/api/logout');
export const googleLogin = (data) => api.post('/api/google-login', data);
export const findTopics = (data) => api.post('/api/questions/find-topics', data);
export const findTopicsForUser = (data) => api.post('/api/questions/get-topics-for-user', data);
export const findFirstQuestionByTopic = (data) => api.post('/api/find-first-question', data);
export const findQuestionById = (data) => api.post('/api/find-question-by-id', data);
export const nextQuestion = (data) => api.post('/api/next-question',data);
export const checkAnswer = (data) => api.post('/api/check-answer',data);
export const findUserInfo = (data) => api.post('/api/find-user-info', data);
export const findSubmissionInfo = (data) => api.post('/api/find-submission-info', data);
export const findRecentActivity = (data)=> api.post('/api/find-recent-activity',data);
// export const uploadUserProfilePhoto = (data) => api.post('/api/uploadUserPhoto',data);
export const uploadUserProfilePhoto = (data) => {
    return api.post('/api/uploadUserPhoto', data, {
        headers: {
            'Content-Type': 'multipart/form-data', // Specify multipart form data for file uploads
        },
    });
};

api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && originalRequest && !originalRequest._isRetry) {
            originalRequest.isRetry = true;
            try {
                await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/refresh`, {
                    withCredentials: true,
                });
                return api.request(originalRequest);
            } catch (err) {
                console.log(err.message);
            }
        }
        throw error;
    }
);

export default api;