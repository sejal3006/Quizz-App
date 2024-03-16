
import QuestionCard from "../Components/Questions";
import "./Home.css";

import React, { useEffect, useState } from "react";

const LandingScreen = () => {
  const [questionData, setQuestionData] = useState(() => {
    const savedData = localStorage.getItem("quiz_questions");
    const parsedData = JSON.parse(savedData);
    return parsedData || [];
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score , setScore] = useState(0);

  useEffect(() => {
    const url = "https://opentdb.com/api.php?amount=10";
    if (questionData.length === 0) {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          const questionArray = data.results.map((elem) => {
            const obj = {
              question: elem.question,
              options: [...elem.incorrect_answers, elem.correct_answer],
              correct_answer: elem.correct_answer,
              score: 0,
            };
            return obj;
          });

          setQuestionData(questionArray);
          localStorage.setItem("quiz_questions", JSON.stringify(questionArray));
        });
    }
  }, []);

  

  function restartHandler(){
    setScore(0);
    setCurrentQuestionIndex(0);
  }

  return (
    <div id="container">
      <h1>Quiz App</h1>
      {questionData.length > 0 && currentQuestionIndex < questionData.length ? (
        <QuestionCard
          question={questionData[currentQuestionIndex].question}
          options={questionData[currentQuestionIndex].options}
          correct_answer={questionData[currentQuestionIndex].correct_answer}
          currentQuestionIndex={currentQuestionIndex}
          setCurrentQuestionIndex={setCurrentQuestionIndex} score = {score} setScore = {setScore}
        />
      ) : (
        currentQuestionIndex > 0 ? <div id="quiz_end_card">
            <p>Quiz Ended</p>
            <p>Your Score :{score}</p>
            <button onClick={restartHandler} className="btn">Restart</button>
        </div> : "Loading..."
      )}
    </div>
  );
};

export default LandingScreen;