import React, { useRef } from "react";
import "./Quiz.css";
import data from "./data.jsx";
import { useState } from "react";

const Quiz = () => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);

  let option_array = [option1, option2, option3, option4];

  function checkAns(e, ans) {
    if (lock === false) {
      if (question.ans == ans) {
        setScore(score+1);
        e.target.classList.add("correct");
        setLock(true);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        option_array[question.ans - 1].current.classList.add("correct");
      }
    }
  }

  function nextHandler() {
    if (index == data.length - 1) {
      setResult(true);
      return 0;
    }

    if (lock === true) {
      setIndex(++index);
      setQuestion(data[index]);
      setLock(false);
      option_array.map((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
        return null;
      });
    }
  }
  function refresh() {
    window.location.reload();
  }
  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />

      {result ? (
        <div className="output">
          <div>You scored {score} out of {data.length}</div>
          <button onClick={() =>refresh()}>Reload</button>
        </div>
      ) : (
        <>
          <h2>
            {index + 1}. {question.question}
          </h2>

          <ul>
            <li ref={option1} onClick={(e) => checkAns(e, 1)}>
              {question.option1}
            </li>
            <li ref={option2} onClick={(e) => checkAns(e, 2)}>
              {question.option2}
            </li>
            <li ref={option3} onClick={(e) => checkAns(e, 3)}>
              {question.option3}
            </li>
            <li ref={option4} onClick={(e) => checkAns(e, 4)}>
              {question.option4}
            </li>
          </ul>

          <button onClick={() => nextHandler()}>Next</button>

          <div className="quest-no">
            {index + 1} of {data.length} Question
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
