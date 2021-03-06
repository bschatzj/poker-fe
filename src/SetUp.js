import React, { useState, useEffect } from 'react'
import io from "socket.io-client";
import axios from 'axios'
import MyCards from './myCards'
import Community from './community'
import { connect } from 'react-redux';
import OppHand from './OppCards'
import './index.css'
import { setStreet, win, bet, check, oppBet, makeMyTurn, lose, makeOppTurn } from './Redux/Actions';
const Hand = require('pokersolver').Hand;



const SetUp = props => {
  const checks = []
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
  const [checked, setChecked] = useState(false)
  const [winningDescr, setWinningDescr] = useState('')
  let mine = []
  let opponents = []
  const [showdown, setShowdown] = useState(false)
  const [winningHand, setWinningHand] = useState('')

  let table = localStorage.getItem('pokerRoom')
  let player = localStorage.getItem('pokerPosition')

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

    })
  }

  socket.on('ready', () => {
    if (player == 1) { props.makeMyTurn() }
    setReady(true)
    deal()
  })

  socket.on('bet', res => {
    if (res.player != localStorage.getItem('pokerPosition')) {
      setCallSize(res.ammount)
      props.oppBet(res.ammount)
    }
  })

  function Bet(ammount) {
    props.bet(ammount)
    socket.emit('bet', { player: localStorage.getItem('pokerPosition'), ammount, table })
    setBetSize(0)
  }


  function Call() {
    checks.push(player)
    console.log(checks)
    props.bet(callSize)
    socket.emit('call', table, player, callSize)
    if (community.length == 0) {
      socket.emit('flop', table)
      props.setStreet('flop')
    }
    if (community.length + turn.length == 3) {
      socket.emit('turn', table)
      props.setStreet('turn')
    }
    if (community.length + turn.length + river.length == 4) {
      console.log('river')
      socket.emit('river', table)
      props.setStreet('river')
    }
    if (community.length + river.length + turn.length == 5) {
      Judge()
      socket.emit('shuffle', table)
      props.setStreet('post')
    }
  }


  function Judge() {
    mine.push(myHand[0], myHand[1], community[0].card, community[1].card, community[2].card, turn[0], river[0])
    opponents.push(opponentHand[0], opponentHand[1], community[0].card, community[1].card, community[2].card, turn[0], river[0])
    console.log(mine)
    const value1 = Hand.solve(opponents)
    const value2 = Hand.solve(mine)
    console.log(value1)
    setMyHandValue(value2)
    setOppHandValue(value1)
    Post(true)
    //setTimeout(function(){ socket.emit('judge', table)}, 1000)
    //console.log(Hand.winners([myHandValue, oppHandValue]));
  }

  function evaluate() {
    setWinningHand(Hand.winners([myHandValue, oppHandValue]));
  }

  socket.on('flop', res => {
    console.log('flop', res)
    setCommunity(res)
    setChecked(false)
    setCallSize(0)
  })

  socket.on('turn', res => {
    console.log(res[0].card)
    setTurn([res[0].card])
    setChecked(false)
    setCallSize(0)
  })

  socket.on('river', res => {
    setRiver([res[0].card])
    setChecked(false)
    setCallSize(0)
  })

  socket.on('check', res => {
    setChecked(true)
    if (res == player) {
      props.makeOppTurn()
    }
    else {
      props.makeMyTurn()
    }
  })

  const add = () => {
    props.win(props.pot)
  }
  socket.on('fold', res => {
    const position = localStorage.getItem('pokerPosition')
    if (res != position) {
      console.log('i win')
      add()
      socket.emit('shuffle')
      setTimeout(function () {
        setCommunity([])
        setRiver([])
        setTurn([])
        mine = []
        setMyHand([])
        setOpponentHand([])
        setBetSize(0)
        opponents = []
        deal()
      }, 3000);
    }
    else {
      props.lose()
      socket.emit('shuffle')
      setTimeout(function () {
        setCommunity([])
        setRiver([])
        setTurn([])
        mine = []
        setMyHand([])
        setOpponentHand([])
        setBetSize(0)
        opponents = []
        deal()
      }, 3000);
    }
  })

  function Fold() {
    socket.emit('fold', table, player)
  }

  socket.on('winner', res => {
    console.log("winning hand", winningHand)
    setShowdown(true)
    //setWinningDescr(`I lost against ${winningHand[0].descr}`)
    const position = localStorage.getItem('pokerPosition')
    if (res == position) {
      console.log('i win')
      add()
      setTimeout(function () {
        setCommunity([])
        setRiver([])
        setTurn([])
        mine = []
        setMyHand([])
        setOpponentHand([])
        setBetSize(0)
        opponents = []
        setShowdown(false)
        deal()
        setWinningDescr('')
      }, 3000);
    }
    else {
      props.lose()
      setTimeout(function () {
        setCommunity([])
        setRiver([])
        setTurn([])
        setShowdown(false)
        mine = []
        setMyHand([])
        setOpponentHand([])
        setBetSize(0)
        opponents = []
        setWinningDescr('')
        deal()
      }, 3000);
    }
  })

  socket.on('called', res => {
    console.log(res)
    if (res.player == player) {
      console.log('wtf')
    }
    if (res.player != player) {
      props.oppBet(parseInt(res.size))
    }
  })

  function Post(winer) {
    console.log(community[0])
    axios.post('http://localhost:8080/hands/session', { id: parseInt(localStorage.getItem('userId')), opponent_hand: `${opponentHand[0]} ${opponentHand[1]}`, my_hand: `${myHand[0]} ${myHand[1]}`, win: winer, flop: `${community[0].card} ${community[1].card} ${community[2].card}`, turn: `${turn[0]}`, river: `${river[0]}`, profit: props.pot })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  function Check() {
    socket.emit('check', table, player)
    //setChecked(true)
    console.log(checked)
    if (checked) {
      if (community.length == 0) {
        socket.emit('flop', table)
        props.setStreet('flop')
        setChecked(false)
      }
      if (community.length + turn.length == 3) {
        socket.emit('turn', table)
        props.setStreet('turn')
        setChecked(false)
      }
      if (community.length + turn.length + river.length == 4) {
        console.log('river')
        socket.emit('river', table)
        props.setStreet('river')
        setChecked(false)
      }
      if (community.length + river.length + turn.length == 5) {
        Judge()
        socket.emit('shuffle', table)
        props.setStreet('post')
        setChecked(false)
      }

    }
    // props.check(player)
    // console.log(props.checkers)
  }


  useEffect(() => {
    console.log(myHandValue)
    if (myHandValue) {
      evaluate()
    }
  }, [myHandValue])


  useEffect(() => {
    const position = localStorage.getItem('pokerPosition')
    if (winningHand) {
      console.log(myHandValue)
      if (myHandValue.cardPool == winningHand[0].cardPool) {
        console.log("I WIN!!!")
        socket.emit('winner', { table, winner: position })
        setWinningDescr(`I win with ${winningHand[0].descr}`)
      }
      if (myHandValue.cardPool !== winningHand[0].cardPool) {
        console.log("I LOST!?!?")
        setWinningDescr(`I lost against ${winningHand[0].descr}`)
        if (position == 1) {
          socket.emit('winner', { table, winner: 2 })
        }
        else {
          socket.emit('winner', { table, winner: 1 })
        }
      }
    }
  }, [winningHand])

  return (
    <div className="play">
      {ready ? null :
        <div className="buttons">
          {friend ? <button className="button" onClick={() => { Play(opponent) }} > Confirm</button> : <button className="button" onClick={() => setFriend(true)} > PLAY A FRIEND!</button>}
          {friend ? <><label>Opponent: </label>  <input value={opponent} onChange={handleOpponent} /> </> : null}

          <button className="button" onClick={() => { Play("") }} >Random Opponent</button>
        </div>}

      {ready ?
        <>
          <Community cardOne={community[0]} cardTwo={community[1]} cardThree={community[2]} turn={turn[0]} river={river[0]} />
          <MyCards cards={myHand} />
          <div className='ring'>
            <h1 className="middleText"> POKER BATTLES </h1>
          </div>
          {/* <h1>{winningDescr}</h1> */}
          <div className="options">
            {props.myTurn ?
              <div className="myOptions">
                <h1 className="myChips">MY CHIPS: {props.myChips}</h1>
                <div className="betSizeHolder">
                  <input className="slider" type="range" step="5" min="0" max={props.myChips} value={betSize} onChange={handleBet} />
                  <input type="number" step="5" min="0" max={props.myChips} value={betSize} onChange={handleBet} />
                </div>
                <div className='buttonHolder'>
                  <button className='optionButton' onClick={() => { Bet(betSize) }}>Bet</button>
                  {callSize > 0 ? <button className='optionButton' onClick={() => { Call() }}>Call {callSize}</button> : <button className='optionButton' onClick={() => { Check() }}>Check</button>}
                  {/* <button onClick={() => { Call() }}>Call {callSize}</button>
              {callSize > 0 ? null : <button onClick={() => { Check() }}>Check</button>} */}
                  <button className='optionButton' onClick={() => { Fold() }}>Fold</button>
                </div>
              </div>
              : <div className="waiting">
                <h1>Opponent's Turn...</h1>
              </div>
            }
            <div className="opp" >
              <h1>Opponent Chips: {props.oppChips}</h1>
            </div>
            <div className='feed'>
              <h1>Coming Soon!</h1>
            </div>
          </div>
          {showdown ?
            <OppHand cards={opponentHand} /> :

            <div className="oppCardContain">
              <div className="cardBack" />
              <div className="cardBack" />
            </div>}
          <h1 className="pot">Pot: {props.pot}</h1>
        </>
        : null}
      {/* <button onClick={() => { Post() }}>post</button> */}
    </div>
  )
}

function mapStateToProps(state) {
  return {
    myChips: state.myChips,
    myTurn: state.myTurn,
    oppChips: state.oppChips,
    pot: state.pot,
    checked: state.checked,
    street: state.street
  }
}

const mapDispatchToProps = {
  win,
  bet,
  check,
  oppBet,
  makeMyTurn,
  lose,
  makeOppTurn,
  setStreet,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (SetUp);