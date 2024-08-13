import React, { useState } from 'react';
import SubjectWiseAnalysis from './SubjectWiseAnalysis';
import styles from './SubjectStatistics.module.css'

function SubjectStatistics({userInfo, extraInfo, hasSection}) {
    const [selectedComponent, setSelectedComponent] = useState('Physics');

    const renderComponent = ({userInfo}) => {
        switch (selectedComponent) {
            case 'Mathematics':
                return <SubjectWiseAnalysis subject={'Mathematics'} userInfo={userInfo} extraInfo={extraInfo} hasSection />;
            case 'Chemistry':
                return <SubjectWiseAnalysis subject={'Chemistry'} userInfo={userInfo} extraInfo={extraInfo} hasSection/>;
            default:
                return <SubjectWiseAnalysis subject={'Physics'} userInfo={userInfo} extraInfo={extraInfo} hasSection/>;
        }
    };
  return (
    <div>
        {extraInfo?"":<h2 style={{margin:"0 0 15px 0"}}>Subject Wise Analysis</h2>}
        <div className={styles.toggleContainer}>
            <button 
                onClick={() => setSelectedComponent('Physics')} 
                style={{backgroundColor:selectedComponent=='Physics'?"#36A2EB":"aliceblue"}}
            >
                Physics
            </button>
            <button 
                onClick={() => setSelectedComponent('Mathematics')}
                style={{backgroundColor:selectedComponent=='Mathematics'?"#36A2EB":"aliceblue"}}
            >
                Mathematics
            </button>
            <button 
                onClick={() => setSelectedComponent('Chemistry')}
                style={{backgroundColor:selectedComponent=='Chemistry'?"#36A2EB":"aliceblue"}}
            >
                Chemistry
            </button>
        </div>
        <div>
            {renderComponent({userInfo})}
        </div>
    </div>

  )
}

export default SubjectStatistics
