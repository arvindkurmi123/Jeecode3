import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomeBefore from './pages/HomeBefore/HomeBefore';
import HomeAfter from './pages/HomeAfter/HomeAfter';
import Authenticate from './pages/Authenticate/Authenticate';
import { useLoadingWithRefresh } from './hooks/useLoadingWithRefresh';
import Progress from './pages/Progress/Progress';
import Loader from './components/Loader/Loader';
// import Loader from './components/shared/Loader/Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainLayout from './layouts/MainLayout/MainLayout';
import Profile from './pages/Profile/Profile';
import QuestionPage from './pages/QuestionPage/QuestionPage';
import SubjectPage from './pages/SubjectPage/SubjectPage';
import SectionPage from './pages/SectionPage/SectionPage';
import TopicPage from './pages/TopicPage/TopicPage';
function App() {
  const { loading } = useLoadingWithRefresh();
  const { auth } = useSelector((state) => state.auth);
  console.log(auth);
  return loading ? (
   <div style={{height:"100vh"}}><Loader/></div>
  ) : (
    <BrowserRouter>
      <Routes>
      <Route
          path="/"
          element={auth ? <MainLayout /> : <HomeBefore />}
        >
          <Route index element={<HomeAfter />} />
          <Route path="profile/:username" element={<Profile />} />
          <Route path="progress" element={<Progress />} />
          <Route path="subject" element={<SubjectPage />} />
          <Route path="/chapters/:chapterName" element={<TopicPage />} />
          
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/section/:subjectName" element={<SectionPage />} />
        </Route>
        <Route path="/Kinematics/:questionId" element={<QuestionPage />} />
        <Route
          path="/authenticate"
          element={<Authenticate />}
        />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
