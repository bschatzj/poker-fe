import React from 'react'
import { connect } from 'react-redux';
import {shuffles} from './Redux/Actions';

const Shuffler = (props) => {
  const Deck = []
  const suits = ['♦', '♣', '♥', '♠']
  const values = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King']

  for (let suit in suits) {
    for (let value in values) {
      Deck.push({ value: `${values[value]}`, suite: `${suits[suit]}` })
    }
  }

  const shuffle = () => {
    let m = Deck.length

    while (m) {
      const i = Math.floor(Math.random() * m--);

      [Deck[m], Deck[i]] = [Deck[i], Deck[m]]
    }
    props.shuffles( Deck )
  }
  return (
    <button onClick={() => {(shuffle())}}>Shuffle</button>
  )
}
function mapStateToProps(state) {
    return {
        deck: state.Deck
    }
  }
  
  const mapDispatchToProps = {
      shuffles
  }

export default connect(
    mapStateToProps,
    mapDispatchToProps,)
    (Shuffler);