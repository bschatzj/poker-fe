import React from 'react'

export default function Cards(props) {
    console.log(props)
    return (
        <div>
            {props.card.length > 0 ?
                <>
                    <h1>{props.card[0].card}</h1>
                    <h1>{props.card[1].card}</h1>
                    <h1>{props.card[2].card}</h1>
                </>
                : null
            }
            {props.turn.length > 0 ? 
            <h1>{props.turn[0]}</h1>
            : null}
            {props.river.length > 0 ?
            <h1>{props.river[0]}</h1>
            :null
            }
        </div>
    )
}