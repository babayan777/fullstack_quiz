import React, {useEffect,useState,useRef} from 'react'
import "./Start.css"

const Start = ({onQuizStart}) => {
    return (
        <div className="start">
            <div className="start-container container">
                <h1>React Quize</h1>
                <p>let's start it !</p>
                <button onClick={onQuizStart}>Start</button>
            </div>
        </div>
    )
}

export default Start
