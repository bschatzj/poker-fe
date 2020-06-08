import React from 'react'
import './Nav.css'

export default function Nav() {


    return (
        <div className="Nav">
            <a href="/">
            <div className="logoHolder">
                <img className="Logo" src={require('./images/chip.jpg')} />
                <h1 className="Link" >PokerBattles</h1>
            </div>
            </a>
            <div className='LogReg'>
                <a className="Link" href="/login">Login</a>
                <a className="Link" href="/register">Register</a>
            </div>
        </div>
    )
}