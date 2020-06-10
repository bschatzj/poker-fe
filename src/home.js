import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
import Eval from './Evaluater'


export default function Home(){

    console.log(Eval)

    return(
        <div className="Background" >
            <div className="centerer">
            <h1 className="welcome"> Welcome to the heads up poker capital! </h1>
            </div>
            <img className="hands" src={require('./images/hands.jpeg')} />
        </div>
    )
}