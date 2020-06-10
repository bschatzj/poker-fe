import React,{useEffect, useState} from 'react'

export default function Cards(props){
    console.log(props)

    const [cardOne, setCardOne] = useState("")
    useEffect(() => {
        console.log(props)
        setCardOne(props.cards[0])
    },[props] ) 

    console.log(cardOne)
    return(
        <div>
            {props.cards[0]}
            {props.cards[1]}
        </div>
    )
}