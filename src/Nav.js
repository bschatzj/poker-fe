import React from 'react'
import './Nav.css'

export default function Nav() {


    return (
        <>
            {localStorage.getItem('PokerToken') ?
                <div className="Nav">
                    <a href={`/profile/${localStorage.getItem('userId')}`}>
                        <div className="logoHolder">
                            <img className="Logo" src={require('./images/chip.jpg')} />
                            <h1 className="Link" >PokerBattles</h1>
                        </div>
                    </a>
                    <div className='LogReg'>
                        <a className="Link" href={`/profile/${localStorage.getItem('userId')}`}>Profile</a>
                        <a className="Link" href="/play">Play </a>
                        <a className="Link" onClick={() =>{localStorage.clear()}} href="/">Log Out </a>
                    </div>
                </div>
                :
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
            }
        </>
    )
}