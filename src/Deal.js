import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

let socket;


const room = 222
const name = 'brendan'
const Deal = ({ location }) => {
  const ENDPOINT = 'http://localhost:8080/';
  
  socket = io(ENDPOINT);

    socket.on('deck', (deck) => {
      console.log(deck)
    })

  function shuffle(){
    socket.emit('join', {name, room}, (res) => {
      console.log(res)
    })
  }

  function deal() {
    socket.emit('deal', {name}, (res) => {
      console.log(res)
    })
  }
  return (
    <>
    <button onClick={() => {shuffle()}}>Click me Big button</button>
    <button onClick={() => {deal()}}>DEALLLL!!!!!!!!</button>
    </>
  );
}

export default Deal;