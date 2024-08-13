import styles from "./Progress.module.css";
import RankChart from "../../components/ProgressComponents/RankChart/RankChart";
import DoughnutChart from "../../components/ProgressComponents/DoughnutChart/DoughnutChart";
import QuestionStatistics from "../../components/ProgressComponents/QuestionStatistics/QuestionStatistics";
import SubjectStatistics from "../../components/ProgressComponents/SubjectStatistics/SubjectStatistics";
import { useSelector } from "react-redux";
import { React, useEffect, useState } from "react";
import { findUserInfo,findSubmissionInfo } from "../../http";
import Loader from "../../components/Loader/Loader";
function Progress() {
  const { user } = useSelector((state) => state.auth);
  const userInfoFirst = {
    registerDate: "2023-10-12T21:42:22Z",
    rating: 320,
    ranks: [900, 743, 800, 610, 620, 500, 340, 350, 320],
    level: 4,
    solvedQuestionsUniversal: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
      40, 41, 42, 43, 44, 45, 46, 47, 48,
    ], // submissionId's : Question correct
    incorrectQuestionsUniversal: [1, 2, 11, 12], // incorrect
    attempedQuestionsUniversal: [13], // attemped ( attemped means clicked but not submitted anytime)
    levelUpdates: [
      "2023-10-12T21:42:22Z",
      "2023-11-12T21:42:22Z",
      "2024-01-20T21:42:22Z",
      "2024-05-12T21:42:22Z",
    ],
    physics: {
      solvedQuestions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], // submissions Id's : correct Question
      attempedQuestions: [13], // submission Id's : Attemped but not submitted Questions ( questions is clicked )
      incorrectQuestions: [1, 2, 11, 12], // submitted but incorrect
      easy: 8,
      medium: 4,
      hard: 3,
    },
    chemistry: {
      solvedQuestions: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27],
      attempedQuestions: [16, 17, 17, 17, 17, 18, 18, 19, 21],
      incorrectQuestions: [16, 20, 22, 23, 24],
      easy: 4,
      medium: 3,
      hard: 4,
    },
    mathematics: {
      solvedQuestions: [
        28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45,
        46, 47, 48,
      ],
      attempedQuestions: [28, 29, 30, 31, 32, 33],
      incorrectQuestions: [28, 29, 35],
      easy: 10,
      medium: 8,
      hard: 3,
    },
  };
  const submissionData = [
    { submissionId: 1, timeSpent: 156, submissionTimestamp: "2024-07-01T00:00:00Z", trials: 1, questionId: "a1b2c3d4e5f6g7h8i9j0k1l2" },
    { submissionId: 2, timeSpent: 291, submissionTimestamp: "2024-07-01T01:00:00Z", trials: 2, questionId: "b1c2d3e4f5g6h7i8j9k0l1m2" },
    { submissionId: 3, timeSpent: 43, submissionTimestamp: "2024-07-01T02:00:00Z", trials: 1, questionId: "c1d2e3f4g5h6i7j8k9l0m1n2" },
    { submissionId: 4, timeSpent: 134, submissionTimestamp: "2024-07-01T03:00:00Z", trials: 2, questionId: "d1e2f3g4h5i6j7k8l9m0n1o2" },
    { submissionId: 5, timeSpent: 276, submissionTimestamp: "2024-07-01T04:00:00Z", trials: 1, questionId: "e1f2g3h4i5j6k7l8m9n0o1p2" },
    { submissionId: 6, timeSpent: 89, submissionTimestamp: "2024-07-02T00:00:00Z", trials: 1, questionId: "f1g2h3i4j5k6l7m8n9o0p1q2" },
    { submissionId: 7, timeSpent: 264, submissionTimestamp: "2024-07-02T01:00:00Z", trials: 2, questionId: "g1h2i3j4k5l6m7n8o9p0q1r2" },
    { submissionId: 8, timeSpent: 197, submissionTimestamp: "2024-07-02T02:00:00Z", trials: 1, questionId: "h1i2j3k4l5m6n7o8p9q0r1s2" },
    { submissionId: 9, timeSpent: 112, submissionTimestamp: "2024-07-02T03:00:00Z", trials: 2, questionId: "i1j2k3l4m5n6o7p8q9r0s1t2" },
    { submissionId: 10, timeSpent: 305, submissionTimestamp: "2024-07-02T04:00:00Z", trials: 1, questionId: "j1k2l3m4n5o6p7q8r9s0t1u2" },
    { submissionId: 11, timeSpent: 178, submissionTimestamp: "2024-07-03T00:00:00Z", trials: 1, questionId: "k1l2m3n4o5p6q7r8s9t0u1v2" },
    { submissionId: 12, timeSpent: 53, submissionTimestamp: "2024-07-03T01:00:00Z", trials: 2, questionId: "l1m2n3o4p5q6r7s8t9u0v1w2" },
    { submissionId: 13, timeSpent: 246, submissionTimestamp: "2024-07-03T02:00:00Z", trials: 1, questionId: "m1n2o3p4q5r6s7t8u9v0w1x2" },
    { submissionId: 14, timeSpent: 113, submissionTimestamp: "2024-07-03T03:00:00Z", trials: 2, questionId: "n1o2p3q4r5s6t7u8v9w0x1y2" },
    { submissionId: 15, timeSpent: 189, submissionTimestamp: "2024-07-03T04:00:00Z", trials: 1, questionId: "o1p2q3r4s5t6u7v8w9x0y1z2" },
    { submissionId: 16, timeSpent: 99, submissionTimestamp: "2024-07-04T00:00:00Z", trials: 1, questionId: "p1q2r3s4t5u6v7w8x9y0z1a2" },
    { submissionId: 17, timeSpent: 287, submissionTimestamp: "2024-07-04T01:00:00Z", trials: 2, questionId: "q1r2s3t4u5v6w7x8y9z0a1b2" },
    { submissionId: 18, timeSpent: 231, submissionTimestamp: "2024-07-04T02:00:00Z", trials: 1, questionId: "r1s2t3u4v5w6x7y8z9a0b1c2" },
    { submissionId: 19, timeSpent: 45, submissionTimestamp: "2024-07-04T03:00:00Z", trials: 2, questionId: "s1t2u3v4w5x6y7z8a9b0c1d2" },
    { submissionId: 20, timeSpent: 265, submissionTimestamp: "2024-07-04T04:00:00Z", trials: 1, questionId: "t1u2v3w4x5y6z7a8b9c0d1e2" },
    { submissionId: 21, timeSpent: 110, submissionTimestamp: "2024-07-05T00:00:00Z", trials: 1, questionId: "u1v2w3x4y5z6a7b8c9d0e1f2" },
    { submissionId: 22, timeSpent: 198, submissionTimestamp: "2024-07-05T01:00:00Z", trials: 2, questionId: "v1w2x3y4z5a6b7c8d9e0f1g2" },
    { submissionId: 23, timeSpent: 123, submissionTimestamp: "2024-07-05T02:00:00Z", trials: 1, questionId: "w1x2y3z4a5b6c7d8e9f0g1h2" },
    { submissionId: 24, timeSpent: 299, submissionTimestamp: "2024-07-05T03:00:00Z", trials: 2, questionId: "x1y2z3a4b5c6d7e8f9g0h1i2" },
    { submissionId: 25, timeSpent: 83, submissionTimestamp: "2024-07-05T04:00:00Z", trials: 1, questionId: "y1z2a3b4c5d6e7f8g9h0i1j2" },
    { submissionId: 26, timeSpent: 276, submissionTimestamp: "2024-07-06T00:00:00Z", trials: 1, questionId: "z1a2b3c4d5e6f7g8h9i0j1k2" },
    { submissionId: 27, timeSpent: 134, submissionTimestamp: "2024-07-06T01:00:00Z", trials: 2, questionId: "a2b3c4d5e6f7g8h9i0j1k2l3" },
    { submissionId: 28, timeSpent: 287, submissionTimestamp: "2024-07-06T02:00:00Z", trials: 1, questionId: "b2c3d4e5f6g7h8i9j0k1l2m3" },
    { submissionId: 29, timeSpent: 98, submissionTimestamp: "2024-07-06T03:00:00Z", trials: 2, questionId: "c2d3e4f5g6h7i8j9k0l1m2n3" },
    { submissionId: 30, timeSpent: 264, submissionTimestamp: "2024-07-06T04:00:00Z", trials: 1, questionId: "d2e3f4g5h6i7j8k9l0m1n2o3" },
    { submissionId: 31, timeSpent: 134, submissionTimestamp: "2024-07-07T00:00:00Z", trials: 1, questionId: "e2f3g4h5i6j7k8l9m0n1o2p3" },
    { submissionId: 32, timeSpent: 198, submissionTimestamp: "2024-07-07T01:00:00Z", trials: 2, questionId: "f2g3h4i5j6k7l8m9n0o1p2q3" },
    { submissionId: 33, timeSpent: 43, submissionTimestamp: "2024-07-07T02:00:00Z", trials: 1, questionId: "g2h3i4j5k6l7m8n9o0p1q2r3" },
    { submissionId: 34, timeSpent: 276, submissionTimestamp: "2024-07-07T03:00:00Z", trials: 2, questionId: "h2i3j4k5l6m7n8o9p0q1r2s3" },
    { submissionId: 35, timeSpent: 112, submissionTimestamp: "2024-07-07T04:00:00Z", trials: 1, questionId: "i2j3k4l5m6n7o8p9q0r1s2t3" },
    { submissionId: 36, timeSpent: 231, submissionTimestamp: "2024-07-08T00:00:00Z", trials: 1, questionId: "j2k3l4m5n6o7p8q9r0s1t2u3" },
    { submissionId: 37, timeSpent: 156, submissionTimestamp: "2024-07-08T01:00:00Z", trials: 2, questionId: "k2l3m4n5o6p7q8r9s0t1u2v3" },
    { submissionId: 38, timeSpent: 45, submissionTimestamp: "2024-07-08T02:00:00Z", trials: 1, questionId: "l2m3n4o5p6q7r8s9t0u1v2w3" },
    { submissionId: 39, timeSpent: 287, submissionTimestamp: "2024-07-08T03:00:00Z", trials: 2, questionId: "m2n3o4p5q6r7s8t9u0v1w2x3" },
    { submissionId: 40, timeSpent: 99, submissionTimestamp: "2024-07-08T04:00:00Z", trials: 1, questionId: "n2o3p4q5r6s7t8u9v0w1x2y3" },
    { submissionId: 41, timeSpent: 291, submissionTimestamp: "2024-07-09T00:00:00Z", trials: 1, questionId: "o2p3q4r5s6t7u8v9w0x1y2z3" },
    { submissionId: 42, timeSpent: 89, submissionTimestamp: "2024-07-09T01:00:00Z", trials: 2, questionId: "p2q3r4s5t6u7v8w9x0y1z2a3" },
    { submissionId: 43, timeSpent: 43, submissionTimestamp: "2024-07-09T02:00:00Z", trials: 1, questionId: "q2r3s4t5u6v7w8x9y0z1a2b3" },
    { submissionId: 44, timeSpent: 178, submissionTimestamp: "2024-07-09T03:00:00Z", trials: 2, questionId: "r2s3t4u5v6w7x8y9z0a1b2c3" },
    { submissionId: 45, timeSpent: 305, submissionTimestamp: "2024-07-09T04:00:00Z", trials: 1, questionId: "s2t3u4v5w6x7y8z9a0b1c2d3" },
    { submissionId: 46, timeSpent: 112, submissionTimestamp: "2024-07-10T00:00:00Z", trials: 1, questionId: "t2u3v4w5x6y7z8a9b0c1d2e3" },
    { submissionId: 47, timeSpent: 43, submissionTimestamp: "2024-07-10T01:00:00Z", trials: 2, questionId: "u2v3w4x5y6z7a8b9c0d1e2f3" },
    { submissionId: 48, timeSpent: 198, submissionTimestamp: "2024-07-10T02:00:00Z", trials: 1, questionId: "v2w3x4y5z6a7b8c9d0e1f2g3" }
];
  const [userInfo, setUserInfo] = useState(userInfoFirst);
  const [submissionInfo,setSubmissionInfo] = useState(submissionData);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function getInfo() {
      try {
        const response = await findUserInfo({ username: user.name });
        console.log(response.data.user);
        setUserInfo(response.data.user);
        const res = await findSubmissionInfo({submissionIds: response.data.user.attempedQuestionsUniversal});
        console.log(res.data);
        setSubmissionInfo(res.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user info:', error);
        setIsLoading(false); // Even if there's an error, stop loading
      }
    }
  
    getInfo();
  }, [user]);
  const physicsSolvedQuestionsLength = userInfo.physics.solvedQuestions.length;
  const physicsAttempedQuestionsLength =
    userInfo.physics.attempedQuestions.length;
  const physicsIncorrectQuestionsLength =
    userInfo.physics.incorrectQuestions.length;
  const chemistrySolvedQuestionsLength =
    userInfo.chemistry.solvedQuestions.length;
  const chemistryAttempedQuestionsLength =
    userInfo.chemistry.attempedQuestions.length;
  const chemistryIncorrectQuestionsLength =
    userInfo.chemistry.incorrectQuestions.length;
  const mathematicsSolvedQuestionsLength =
    userInfo.mathematics.solvedQuestions.length;
  const mathematicsAttempedQuestionsLength =
    userInfo.mathematics.attempedQuestions.length;
  const mathematicsIncorrectQuestionsLength =
    userInfo.mathematics.incorrectQuestions.length;

  const TotalQuestionSolvedData = [
    physicsSolvedQuestionsLength,
    chemistrySolvedQuestionsLength,
    mathematicsSolvedQuestionsLength,
  ];
  const physicsTotalSubmissions =
    physicsSolvedQuestionsLength + physicsIncorrectQuestionsLength;
  const chemistryTotalSubmissions =
    chemistrySolvedQuestionsLength + chemistryIncorrectQuestionsLength;
  const mathematicsTotalSubmissions =
    mathematicsSolvedQuestionsLength + mathematicsIncorrectQuestionsLength;

  const totalSubmissions =
    physicsTotalSubmissions +
    chemistryTotalSubmissions +
    mathematicsTotalSubmissions;
  const totalCorrectSubmissions =
    physicsSolvedQuestionsLength +
    mathematicsSolvedQuestionsLength +
    chemistrySolvedQuestionsLength;
  const accuracy = (totalCorrectSubmissions / totalSubmissions) * 100;
  const level = userInfo.level;
  const levelData = [level, 10 - level];

  const formattedDatesLevelUpdates = userInfo.levelUpdates.map((dateString) => {
    let date = new Date(dateString);
    let day = String(date.getDate()).padStart(2, "0");
    let month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() returns month from 0-11, so add 1
    let year = date.getFullYear();
    return `${day}-${month}-${year}`;
  });
  const extraDetails = {};
  let ind = 1;
  formattedDatesLevelUpdates.map((date) => {
    extraDetails[`Level ${ind}`] = date;
    ind++;
  });

  return isLoading ? (
    <div style={{height:"100vh"}}><Loader/></div>
  ) : (
  
    <div className={styles.progressPage}>
      <div className={styles.userWelcome}>
        <div className={styles.welcomeMessage}>
          Welcome back, <span style={{ color: "#0C7FDA" }}>{user.name}!</span>
        </div>
        <p className={styles.slogan}>Unleash Your Potential with JEECode</p>
      </div>
      {/* <div className={styles.rankContainer}>
        <RankChart userInfo={userInfo} />
      </div> */}
      <div className={styles.subjectAndLevelAnalyticsContainer}>
        <div className={styles.doughnutContainer}>
          <DoughnutChart
            title={"Total Question Attemped"}
            data={{
              labels: ["Physics", "Mathematics", "Chemistry"],
              datasets: [
                {
                  data: TotalQuestionSolvedData,
                  backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                  hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                },
              ],
            }}
            extraDetails={{
              Physics: `${physicsSolvedQuestionsLength}`,
              Mathematics: `${mathematicsSolvedQuestionsLength}`,
              Chemistry: `${chemistrySolvedQuestionsLength}`,
              "Total Submissions": `${totalSubmissions}`,
              Accuracy: `${accuracy.toFixed(2)}%`,
            }}
          />
        </div>
        <div className={styles.doughnutContainer}>
          <DoughnutChart
            title={"Level"}
            data={{
              labels: ["You", "Yet to Complete"],
              datasets: [
                {
                  data: levelData,
                  backgroundColor: ["#36A2EB", "#FFCE56"],
                  hoverBackgroundColor: ["#36A2EB", "#FFCE56"],
                },
              ],
            }}
            extraDetails={extraDetails}
          />
        </div>
      </div>
      <div className={styles.questionStatistics}>
        <QuestionStatistics userInfo={userInfo} submissionData = {submissionInfo} />
      </div>
      <div className={styles.subjectStatistics}>
        <SubjectStatistics userInfo={userInfo} />
      </div>
    </div>
  );
}

export default Progress;
