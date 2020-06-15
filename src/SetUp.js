import React, { useState, useEffect } from 'react'
import io from "socket.io-client";
import MyCards from './myCards'
import Community from './community'
import { connect } from 'react-redux';
import {win, bet} from './Redux/Actions';
const Hand = require('pokersolver').Hand;



const SetUp = props => {
  console.log(props)
  const [opponent, setOpponent] = useState('')
  const [friend, setFriend] = useState(false)
  const [myHand, setMyHand] = useState([])
  const [ready, setReady] = useState(false)
  const [betSize, setBetSize] = useState(0)
  const [callSize, setCallSize] = useState(0)
  const [chips, setChips] = useState(1000)
  const [community, setCommunity] = useState([])
  const [turn, setTurn] = useState([])
  const [river, setRiver] = useState([])
  const [opponentHand, setOpponentHand] = useState([])
  const [myHandValue, setMyHandValue] = useState("")
  const [oppHandValue, setOppHandValue] = useState("")
  const [stack, setStack] = useState(1000)
  const mine = []
  const opponents = []
  const [winner, setWinner] = useState('')
  const [winningHand, setWinningHand] = useState('')
  const [pot, setPot] = useState(20)
  
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
    console.log(message)
    if (position === "1") {
      console.log('hi')
      setMyHand([message.response.payer1.cardOne.card, message.response.payer1.cardTwo.card])
      setOpponentHand([message.response2.hand2.cardOne.card, message.response2.hand2.cardTwo.card])
    }
    if (position === "2") {
      console.log('hi2')
      setOpponentHand([message.response.payer1.cardOne.card, message.response.payer1.cardTwo.card])
      setMyHand([message.response2.hand2.cardOne.card, message.response2.hand2.cardTwo.card])
    }
  })

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

  socket.on('ready', () => {
    console.log('ready')
    setReady(true)
    deal()
  })

  socket.on('bet', res => {
    console.log('bet', res)
    if (res.player != localStorage.getItem('pokerPosition')) {
      setCallSize(res.ammount)
    }
  })

  socket.on('call', res => {
    console.log(res)
  })

  function Bet(ammount) {
    props.bet(ammount)
    socket.emit('bet', { player: localStorage.getItem('pokerPosition'), ammount, table })
    setBetSize(0)
  }

  function Check() {
    socket.emit('check', table)
  }

  function Fold() {
    socket.emit('fold', table)
  }

  function Call() {
    setChips(chips - callSize)
    socket.emit('call', callSize)
    if (community.length == 0) {
      socket.emit('flop', table)
    }
    if (community.length + turn.length == 3) {
      socket.emit('turn', table)
    }
    if (community.length + turn.length + river.length == 4) {
      console.log('river')
      socket.emit('river', table)
    }
    if (community.length + river.length + turn.length == 5) {
      Judge()
      socket.emit('shuffle', table)
    }
  }

  function Judge(){
    mine.push(myHand[0], myHand[1], community[0].card, community[1].card, community[2].card, turn[0], river[0])
    opponents.push(opponentHand[0], opponentHand[1], community[0].card, community[1].card, community[2].card, turn[0], river[0])
    console.log(mine)
    const value1 = Hand.solve(opponents)
    const value2 = Hand.solve(mine)
    console.log(value1)
    setMyHandValue(value2)
    setOppHandValue(value1)
    //setTimeout(function(){ socket.emit('judge', table)}, 1000)
    //console.log(Hand.winners([myHandValue, oppHandValue]));
  }

  function evaluate(){
    setWinningHand(Hand.winners([myHandValue, oppHandValue]));
  }

  socket.on('flop', res => {
    console.log(res)
    setCommunity(res)
  })

  socket.on('turn', res => {
    console.log(res[0].card)
    setTurn([res[0].card])
  })

  socket.on('river', res => {
    setRiver([res[0].card])
  })

  socket.on('check', res => {
    console.log(res)
  })

  socket.on('fold', res => {
    console.log(res)
  })

  const add = () =>{
    props.win(pot)
  }

  socket.on('winner', res =>{ 
  
    const position = localStorage.getItem('pokerPosition')
    if(res == position){
      console.log('i win')
      add()
    }
  })



  useEffect(() => {
    console.log(myHandValue)
    if(myHandValue){
    evaluate()
    }
  }, [myHandValue])

  useEffect(() => {
    const position = localStorage.getItem('pokerPosition')
    if(winningHand){
    console.log(myHandValue.cardPool)
    console.log(winningHand[0].cardPool)
    if(myHandValue.cardPool == winningHand[0].cardPool){
      console.log("I WIN!!!")
      socket.emit('winner', {table, winner: position})
    }
    if(myHandValue.cardPool !== winningHand[0].cardPool){
      console.log("I LOST!?!?")
      if (position == 1){
      socket.emit('winner', {table, winner: 2 })
      }
      else{
        socket.emit('winner', {table, winner: 1 })
      }
    }
    }
  }, [winningHand])

  return (
    <>

      {ready ? null : <div>
        {friend ? <button onClick={() => { Play(opponent) }} > Confirm</button> : <button onClick={() => setFriend(true)} > PLAY A FRIEND!</button>}
        {friend ? <><label>Opponent: </label>  <input value={opponent} onChange={handleOpponent} /> </> : null}

        <button onClick={() => { Play("") }} >Play Random Opponent</button>
        <button onClick={() => { deal() }}>DEALLLL!!!!!!!!</button>
      </div>}
      {/* {ready ?  */}
      <>
        <h1> Community Cards: </h1>
        <Community card={community} turn={turn} river={river} />
        <h1> MY HAND:</h1>
        <MyCards cards={myHand} />
        <h1>MY CHIPS: {chips}</h1>
        <input type="number" step="5" min="0" max={chips} value={betSize} onChange={handleBet} />
        <button onClick={() => { Bet(betSize) }}>bet!!!!!!!!</button>
        {callSize > 0 ? <button onClick={() => { Call() }}>Call {callSize}</button> : <button onClick={() => { Check() }}>Check</button>}
        <button onClick={() => { Fold() }}>Fold</button>
        {callSize > 0 ? <button onClick={() => { Fold() }}>Fold</button> : null}
      </>
      : null }
      <button onClick={() => {add(pot)}}>add</button>
    </>
  )
}

function mapStateToProps(state) {
  return {
      myChips: state.myChips
  }
}

const mapDispatchToProps = {
    win,
    bet
}

export default connect(
mapStateToProps,
mapDispatchToProps,)
(SetUp);