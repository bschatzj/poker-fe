import React, { useEffect, useState } from 'react'
import './index.css'


export default function Cards(props) {
    console.log(props)

    // const [cardOne, setCardOne] = useState("")
    // useEffect(() => {
    //     console.log(props)
    //     setCardOne(props.cards[0])
    // },[props] ) 

    // console.log(cardOne)
    var cardOne = props.cards[0]
    var cardTwo = props.cards[1]
    console.log(cardOne)

    if (cardOne != undefined) {
        return (
            <div className = 'cardContain'>
                <div id="card" className={cardOne.includes("c") || cardOne.includes("s") ? "black" : "red"}>
                    {cardOne[0]}{cardOne[1] === "0" ? cardOne[1] : null}
                    <div className="picholder">
                        <div className={cardOne[(cardOne.length - 1)]} />
                    </div>
                </div>
                <div id="card" className={cardTwo.includes("c") || cardTwo.includes("s") ? "black" : "red"}>
                    {cardTwo[0]}{cardTwo[1] === "0" ? cardTwo[1] : null}
                    <div className="picholder">
                        <div className={cardTwo[(cardTwo.length - 1)]} />
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (<div className="cardContain" />)
    }
}