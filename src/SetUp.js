import React, { useState, useEffect } from 'react'
import io from "socket.io-client";


const SetUp = props => {
  const [opponent, setOpponent] = useState('')
  const [name, setName] = useState('')
  const [friend, setFriend] = useState(false)
  const [players, setPlayers] = useState([])

  const myHand = []

  let socket;
  const ENDPOINT = 'http://localhost:8080/';
  socket = io(ENDPOINT);

  const handleOpponent = e => {
    setOpponent(e.target.value)
  }


  function Play(opponent) {
    if (opponent === "") {
      socket.emit("join", {"name": localStorage.getItem("username"), "room": "random" })
    }
    else {
      socket.emit("join", {"room": opponent })
    }
  }

  socket.on("message", (message) => {
    console.log(message)
  })

  socket.on("err", (error) => {
    console.log(error)
  })
  socket.on("hands", (message) => {
    const position = localStorage.getItem('pokerPosition')
    console.log(position)
    if(position === "1"){
      console.log('hi')
      myHand.push(message.response.payer1.cardOne.card)
      myHand.push(message.response.payer1.cardTwo.card)
    }
    if(position === "2"){
      console.log('hi2')
      myHand.push(message.response2.hand2.cardOne.card)
      myHand.push(message.response2.hand2.cardTwo.card)
    }
    console.log(message)
    console.log(myHand)
  })


  console.log(myHand)
  socket.on('registered', (res) => {
    console.log(res)
    localStorage.setItem('pokerID', res.id)
    localStorage.setItem('pokerPosition', res.player)
    localStorage.setItem('pokerRoom', res.room)
  })


  function shuffle() {
    socket.emit('shuffle', (res) => {

    })
  }

  function deal() {
    socket.emit('deal', { "name": localStorage.getItem('pokerRoom') }, (res) => {
      console.log(res)
    })
  }




  return (
    <>

      <div>
        {friend ? <button onClick={() => { Play(opponent) }} > Confirm</button> : <button onClick={() => setFriend(true)} > PLAY A FRIEND!</button>}
        {friend ? <><label>Opponent: </label>  <input value={opponent} onChange={handleOpponent} /> </> : null}
        
        <button onClick={() =>{Play("")}} >Play Random Opponent</button>
        <button onClick={() => { deal() }}>DEALLLL!!!!!!!!</button>
      </div> }
    </>
  )
}


export default SetUp