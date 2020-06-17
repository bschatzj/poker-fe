import React, { useEffect } from 'react'
import './index.css'

export default function Cards(props) {
    console.log(props)

    let cardOne = props.cardOne
    let cardTwo = props.cardTwo
    let cardThree = props.cardThree
    let cardFour = props.turn
    let cardFive = props.river

    console.log(cardOne)


    useEffect(() => {

    }, [])

    if (cardFive != undefined) {

        return (
            <div className='cardsContain'>
                <div id="card" className={cardOne.card.includes("c") || cardOne.card.includes("s") ? "black" : "red"}>
                    {cardOne.card[0]}{cardOne.card[1] === "0" ? cardOne[1] : null}
                    <div className="picholder">
                        <div className={cardOne.card[(cardOne.card.length - 1)]} />
                    </div>
                </div>
                <div id="card" className={cardTwo.card.includes("c") || cardTwo.card.includes("s") ? "black" : "red"}>
                    {cardTwo.card[0]}{cardTwo.card[1] === "0" ? cardTwo.card[1] : null}
                    <div className="picholder">
                        <div className={cardTwo.card[(cardTwo.card.length - 1)]} />
                    </div>
                </div>

                <div id="card" className={cardThree.card.includes("c") || cardThree.card.includes("s") ? "black" : "red"}>
                    {cardThree.card[0]}{cardThree.card[1] === "0" ? cardThree.card[1] : null}
                    <div className="picholder">
                        <div className={cardThree.card[(cardThree.card.length - 1)]} />
                    </div>
                </div>

                <div id="card" className={cardFour.includes("c") || cardFour.includes("s") ? "black" : "red"}>
                    {cardFour[0]}{cardFour[1] === "0" ? cardFour[1] : null}
                    <div className="picholder">
                        <div className={cardFour[(cardFour.length - 1)]} />
                    </div>
                </div>



                <div id="card" className={cardFive.includes("c") || cardFive.includes("s") ? "black" : "red"}>
                    {cardFive[0]}{cardFive[1] === "0" ? cardFive[1] : null}
                    <div className="picholder">
                        <div className={cardFive[(cardFive.length - 1)]} />
                    </div>
                </div>

            </div>
        )
    }
    else if (cardFour != undefined) {
        return (
            <div className='cardsContain'>
                <div id="card" className={cardOne.card.includes("c") || cardOne.card.includes("s") ? "black" : "red"}>
                    {cardOne.card[0]}{cardOne.card[1] === "0" ? cardOne[1] : null}
                    <div className="picholder">
                        <div className={cardOne.card[(cardOne.card.length - 1)]} />
                    </div>
                </div>
                <div id="card" className={cardTwo.card.includes("c") || cardTwo.card.includes("s") ? "black" : "red"}>
                    {cardTwo.card[0]}{cardTwo.card[1] === "0" ? cardTwo.card[1] : null}
                    <div className="picholder">
                        <div className={cardTwo.card[(cardTwo.card.length - 1)]} />
                    </div>
                </div>

                <div id="card" className={cardThree.card.includes("c") || cardThree.card.includes("s") ? "black" : "red"}>
                    {cardThree.card[0]}{cardThree.card[1] === "0" ? cardThree.card[1] : null}
                    <div className="picholder">
                        <div className={cardThree.card[(cardThree.card.length - 1)]} />
                    </div>
                </div>

                <div id="card" className={cardFour.includes("c") || cardFour.includes("s") ? "black" : "red"}>
                    {cardFour[0]}{cardFour[1] === "0" ? cardFour[1] : null}
                    <div className="picholder">
                        <div className={cardFour[(cardFour.length - 1)]} />
                    </div>
                </div>
            </div>
        )
    }
    else if (cardOne != undefined) {
        return (
            <div className='cardsContain'>
                <div id="card" className={cardOne.card.includes("c") || cardOne.card.includes("s") ? "black" : "red"}>
                    {cardOne.card[0]}{cardOne.card[1] === "0" ? cardOne[1] : null}
                    <div className="picholder">
                        <div className={cardOne.card[(cardOne.card.length - 1)]} />
                    </div>
                </div>
                <div id="card" className={cardTwo.card.includes("c") || cardTwo.card.includes("s") ? "black" : "red"}>
                    {cardTwo.card[0]}{cardTwo.card[1] === "0" ? cardTwo.card[1] : null}
                    <div className="picholder">
                        <div className={cardTwo.card[(cardTwo.card.length - 1)]} />
                    </div>
                </div>

                <div id="card" className={cardThree.card.includes("c") || cardThree.card.includes("s") ? "black" : "red"}>
                    {cardThree.card[0]}{cardThree.card[1] === "0" ? cardThree.card[1] : null}
                    <div className="picholder">
                        <div className={cardThree.card[(cardThree.card.length - 1)]} />
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (<div className="cardsContain" />)
    }
}