import React, { useState, useRef } from 'react';
import styles from './Test.module.css';

const questionsData = [  {    question: "What is the capital of France?",    options: ["Madrid", "Paris", "Berlin", "Rome"],
    correctAnswer: "Paris"
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Mars", "Venus", "Jupiter", "Saturn"],
    correctAnswer: "Jupiter"
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Leonardo da Vinci", "Michelangelo", "Pablo Picasso", "Vincent van Gogh"],
    correctAnswer: "Leonardo da Vinci"
  },
  {
    question: "What is the smallest country in the world?",
    options: ["Monaco", "Liechtenstein", "San Marino", "Vatican City"],
    correctAnswer: "Vatican City"
  },
  {
    question: "What is the highest mountain in the world?",
    options: ["K2", "Mount Everest", "Makalu", "Lhotse"],
    correctAnswer: "Mount Everest"
  },
  {
    question: "What is the capital of Japan?",
    options: ["Tokyo", "Kyoto", "Osaka", "Hiroshima"],
    correctAnswer: "Tokyo"
  },
  {
    question: "Who wrote the novel '1984'?",
    options: ["George Orwell", "Aldous Huxley", "Ray Bradbury", "J.D. Salinger"],
    correctAnswer: "George Orwell"
  },
  {
    question: "What is the largest ocean in the world?",
    options: ["Indian Ocean", "Atlantic Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: "Pacific Ocean"
  },
  {
    question: "What is the currency of Mexico?",
    options: ["Euro", "Dollar", "Peso", "Yen"],
    correctAnswer: "Peso"
  },
  {
    question: "Who played the character of Iron Man in the Marvel Cinematic Universe?",
    options: ["Chris Hemsworth", "Robert Downey Jr.", "Chris Evans", "Mark Ruffalo"],
    correctAnswer: "Robert Downey Jr."
  }
];


const Test = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleOptionSelect = (optionIndex) => {
    setSelectedOptionIndex(optionIndex);
  };

  const handleNextButtonClick = () => {
    if (currentQuestionIndex === questionsData.length - 1) {
      setShowResult(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOptionIndex(null);
    }
  };

  const handleRestartButtonClick = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setShowResult(false);
  };

  const score = questionsData.reduce((totalScore, question, index) => {
    const correctOptionIndex = question.options.findIndex((option) => option === question.correctAnswer);
    return selectedOptionIndex === correctOptionIndex ? totalScore + 2 : totalScore;
  }, 0);

  const isPass = score >= 12;

  return (
    <div className={styles.test}>
      {showResult ? (
        <div className={styles.result}>
          {isPass ? (
            <div>
              <h1>Congratulations, you passed the test!</h1>
              <p>Your score: {score}/20</p>
            </div>
          ) : (
            <div>
              <h1>Sorry, you failed the test.</h1>
              <p>Your score: {score}/20</p>
              <button onClick={handleRestartButtonClick}>Restart Test</button>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.question}>
          <h1>{questionsData[currentQuestionIndex].question}</h1>
          <ul>
            {questionsData[currentQuestionIndex].options.map((option, index) => (
              <li
                key={index}
                className={selectedOptionIndex === index ? styles.selected : ''}
                onClick={() => handleOptionSelect(index)}
              >
                {option}
              </li>
            ))}
          </ul>
          <button onClick={handleNextButtonClick}>{currentQuestionIndex === questionsData.length - 1 ? 'Submit' : 'Next'}</button>
        </div>
      )}
    </div>
  );
};

export default Test;
