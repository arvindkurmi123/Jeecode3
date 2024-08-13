import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../../components/shared/Navigation/Navigation';
import Hero from '../../components/HomeBeforeComponents/hero/hero';
import News from '../../components/HomeBeforeComponents/News/News';
import CommunityHub from '../../components/HomeBeforeComponents/CommunityHub/CommunityHub';
import styles from './HomeBefore.module.css';
import Footer from '../../components/shared/Navigation/Footer/Footer';
import FocusedSubjects from '../../components/HomeBeforeComponents/FocusedSubjects/FocusedSubjects';
import Benefits from '../../components/HomeBeforeComponents/Benefits/Benefits';
const HomeBefore = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/authenticate?mode=login');
  };

  const handleSignupClick = () => {
    navigate('/authenticate?mode=signup');
  };

  return (
    <div className={styles.layout}>
      <Navigation login={handleLoginClick} register={handleSignupClick}/>
      <Hero/>
      <News/>
      <CommunityHub/>
      <FocusedSubjects/>
      <Benefits/>
      <Footer/>
    </div>
  );
};

export default HomeBefore;
