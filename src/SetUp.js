import React, { useState, useEffect } from 'react'
import io from "socket.io-client";
import MyCards from './myCards'

const SetUp = props => {
  const [opponent, setOpponent] = useState('')
  const [friend, setFriend] = useState(false)
  const [myHand, setMyHand] = useState([])
  const [ready, setReady] = useState(false)
  const [betSize, setBetSize] = useState(0)
  const [chips, setChips]= useState(1000)

  let table = localStorage.getItem('pokerRoom')

  let socket;
  const ENDPOINT = 'http://localhost:8080/';
  socket = io(ENDPOINT);

  const handleOpponent = e => {
    setOpponent(e.target.value)
  }

  const handleBet = e => {
    setBetSize(e.target.value)
  }

  function Play(opponent) {
    if (opponent === "") {
      socket.emit("join", { "name": localStorage.getItem("username"), "room": "random" })
    }
    else {
      socket.emit("join", { "room": opponent })
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
    if (position === "1") {
      console.log('hi')
      setMyHand([message.response.payer1.cardOne.card, message.response.payer1.cardTwo.card])
    }
    if (position === "2") {
      console.log('hi2')
      setMyHand([message.response2.hand2.cardOne.card, message.response2.hand2.cardTwo.card])
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

  socket.on('ready', () =>{
    console.log('ready')
    setReady(true)
    deal()
  })
 
  socket.on('bet', res => {
    console.log('bet', res)
  })

  function Bet(ammount){
    socket.emit('bet', {player: localStorage.getItem('pokerPosition'), ammount, table})
  }



  return (
    
    <>

      {ready? null : <div>
        {friend ? <button onClick={() => { Play(opponent) }} > Confirm</button> : <button onClick={() => setFriend(true)} > PLAY A FRIEND!</button>}
        {friend ? <><label>Opponent: </label>  <input value={opponent} onChange={handleOpponent} /> </> : null}

        <button onClick={() => { Play("") }} >Play Random Opponent</button>
        <button onClick={() => { deal() }}>DEALLLL!!!!!!!!</button>
      </div> }
      {/* {ready ?  */}
      <>
      <h1> MY HAND</h1>
      <MyCards cards={myHand} />
      <input type="number" step="5" min="0" max={chips} value={betSize} onChange={handleBet}/>
      <button onClick={() => {Bet(100) }}>bet!!!!!!!!</button>
      </>
      : null }
    </>
  )
}


export default SetUp