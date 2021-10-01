import React, { useRef, useState ,useEffect } from 'react'
import './Question.css'
import Progress from './Progress';
import Loading from './Loading'
  
const Question = ({ data, onAnswerUpdate, numberOfQuestion, activeQuestion, onSetActiveQuestion, onSetStep}) => {
    const [selected,setSelected] = useState("");
    const [error,setError] = useState("");
    const [completed, setCompleted] = useState(0);
    const radiosWrapper = useRef();
    const [loading,setLoading] = useState(false);



    const changeHandler = (e) => {
        setSelected(e.target.value);
        if(error){
            setError("");
        }
    }

    const nextClickHandler = (e) => {
        if(selected === ""){
            return setError("Please select one option");
        }
        //loading
        if(!loading){
                setLoading(true);
                setTimeout(() => {
                    setLoading(false)
                },1000)
        }

        onAnswerUpdate(prevState => [...prevState,{q: data.question, a:selected}]);
        // clearInterval();
        setSelected("");
        if(activeQuestion < numberOfQuestion - 1){
            onSetActiveQuestion(activeQuestion + 1);
        }
        else{
            onSetStep(3);
        }
        setCompleted(Math.floor(completed + 20));
    }

            useEffect(() => {
                if(loading === true){
                    // empty
                }
                else{
                    const findCheckedInput = radiosWrapper.current.querySelector('input:checked');
                    if(findCheckedInput) {
                    findCheckedInput.checked = false;
                    }
                }

        }, [data]);
    return (
       <>
        { loading ? <Loading/> : 
                    <div className="question">
                    <Progress bgcolor={"#776DA2"} completed={completed} />
                <div className="question-container container">
                    <div className="question-title">{data.question}</div>
                    <div className="main" ref={radiosWrapper}>
                        {data.choices.map((item,i) => (
                            <div className="answer-container" key={i}>
                                <label className="radio has-background-light" >
                                    <input type="radio" name="answer" value={item} onChange={changeHandler} />
                                    <span>{item}</span>
                                </label>
                            </div>
                    ))}
                    </div>
                    {error && <div className="error-container">{error}</div>}
                    <button className="question-btn" onClick={nextClickHandler}>Next</button>
                </div>
            </div>
        }
        </>
    )
}

export default Question
