import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'


export default function Home(){



    return(
        <div className="Background" >
            <div className="centerer">
            <h1 className="welcome"> Welcome to the heads up poker capital! </h1>
            </div>
            <img className="hands" src={require('./images/hands.jpeg')} />
        </div>
    )
}