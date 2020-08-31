import React, { useEffect, useState } from 'react';
import {getQuestions} from './services/quiz_service';
import {QuestionType} from './Types/quiz_types';
import QuestionCard from './Components/questionCard';
import './App.css';

function App() {
  let [quiz, setQuiz] = useState<QuestionType[]>([]);
  let [currentQues, setCurrentQues] = useState(0);
  let [score, setScore] = useState(0);
  useEffect(() => {
    async function fetchData() {
      const questions:QuestionType[] = await getQuestions(5, 'easy');
      // console.log(questions);
      setQuiz(questions)
    }
    fetchData();
  },[]);

  const handleSubmit = (e:React.FormEvent<EventTarget>, ans: string) => {
    e.preventDefault();
    if(ans === quiz[currentQues].answer){
      setScore(score = score + 1);
    }
    console.log("Correct Ans: "+quiz[currentQues].answer+" & User Ans: "+ans);
    if(currentQues !== quiz.length -1){
      setCurrentQues(++currentQues);
    }
      else {
        alert(`Your Score is ${score} out of ${quiz.length}`);
        setCurrentQues(0);
        setScore(0);
      }
  }
  if(!quiz.length)
    return <h1>Loading....</h1>
  return (
    <div className="App">
      <QuestionCard 
        options={quiz[currentQues].option}
        question={quiz[currentQues].question}
        callback={handleSubmit}
      />
    </div>
  );
}

export default App;
