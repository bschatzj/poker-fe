import React, { useState } from 'react'
import io from "socket.io-client";


const SetUp = props => {
  const [opponent, setOpponent] = useState('')
  const [name, setName] = useState('')
  let socket;
  const ENDPOINT = 'http://localhost:8080/';
  socket = io(ENDPOINT);

  const handleName = e => {
    setName(e.target.value)
    console.log(name)
  }


  function Play(name, opponent) {
    if (opponent === "") {
      socket.emit("join", { "name": name, "room": "random" })
    }
    else {
      socket.emit("join", { "name": name, "room": opponent })
    }
  }

  socket.on("message", (message) => {
    console.log(message)
  })

  socket.on("err", (error) =>{
    console.log(error)
  })
  socket.on("hands", (message) => {
    console.log(message)
  })

  socket.on('registered', (res) => {
    console.log(res)
    localStorage.setItem('pokerID', res.id)
    localStorage.setItem('pokerPosition', res.player)
    localStorage.setItem('pokerRoom', res.room)
  })


  function shuffle(){
    socket.emit('shuffle', (res) => {
      
    })
  }

  function deal() {
    console.log(localStorage.getItem('pokerID'))
    socket.emit('deal', {name}, (res) => {
      console.log(res)
    })
  }

  return (
    <>
      <label>Name:</label>
      <input onChange={handleName} name="name"></input>
      <label>Opponent (Leave blank for random)</label>
      <input name="opponent"></input>
      <button onClick={() => { Play(name, opponent) }} > PLAY!</button>
      <button onClick={() => { shuffle() }}>Click me Big button</button>
      <button onClick={() => { deal() }}>DEALLLL!!!!!!!!</button>
    </>
  )
}


export default SetUp