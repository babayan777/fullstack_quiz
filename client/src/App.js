import React, {useState,useEffect} from "react";
import Question from "./components/Question";
import Start from './components/Start'
import End from './components/End'

const App = () => {
  const [step,setStep] = useState(1);
  const [activeQuestion,setActiveQuestion] = useState(0);
  const [answers,setAnswers] = useState([]);
  const [data,setData]  = useState([]);
  const [loading,setLoading] = useState(true);
  const quizStartHandler = () => {
    setStep(2);
  }

  const resetClickHandler = () => {
    setActiveQuestion(0);
    setAnswers([]);
    setStep(2);
  }

  useEffect(() => {
    const handleRequest = async ()=>{
      try{
        const res = await fetch('/todos');
        console.info('RESPONSE', await res.clone().json())
        const data = await res.json();
        setData([...data]);
        setLoading(false);      
        }catch(e){
          console.error('failed to fetch', e)
        }
    }
    handleRequest();
  },[])

  return (

    <div className="App wrapper">
      {step === 1 && <Start onQuizStart={quizStartHandler}/>} 
      {step === 2 && !loading && <Question
        data={data[activeQuestion]}
        onAnswerUpdate = {setAnswers}
        numberOfQuestion = {data.length}
        activeQuestion = {activeQuestion}
        onSetActiveQuestion = {setActiveQuestion}
        onSetStep = {setStep}
      /> } 
      {step === 3 && <End
        results={answers}
        data={data}
        onReset={resetClickHandler}
        onAnswerCheck={() => {}}
      />}
    </div>
  );
}

export default App;
