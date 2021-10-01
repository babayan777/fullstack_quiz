import React, { useEffect, useState } from 'react'
import './End.css'

const End = ({results,data,onReset}) => {
    const [correctAnswers,setCorrectAnswers] = useState(0);

    useEffect(() => {
        let correct = 0;
        results.forEach((result, index) => {
          if(result.a === data[index].answer) {
            correct++;
          }
        });
        setCorrectAnswers(correct);
      }, []);

    return (
        <div className="end">
            <div className="end-container container">
                <h1>Your results</h1>
                <p>{correctAnswers} of {data.length}</p>
                <p><strong>{Math.floor((correctAnswers / data.length) * 100)}%</strong></p>
                <button className="try-btn" onClick={onReset}>Try Again</button>
            </div>
        </div>
    )
}

export default End
