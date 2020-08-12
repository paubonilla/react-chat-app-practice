import React, { createContext, useReducer } from 'react';
import io from 'socket.io-client'

export const CTX = createContext();

const initState = {
  general: [
    { from: 'paulo', msg: 'bata ka?' },
    { from: 'carlo', msg: 'oo naman' },
  ],
  room: [
    { from: 'paulo', msg: 'boss balita?' },
    { from: 'paulo', msg: 'boss balita?' },
    { from: 'paulo', msg: 'boss balita?' },
  ]
}

function reducer(state, action) {
  const { from, msg, topic } = action.payload;
  switch (action.type) {
    case 'RECEIVE_MESSAGE': {
      return {
        ...state,
        [topic]: [
          ...state[topic],
          { from, msg }
        ]
      }
    }
    default: return state
  }
}

let socket;

function sendChatAction(value) {
  socket.emit('chat message', value);
}

export default function Store(props) {
  const [allChats, dispatch] = useReducer(reducer, initState);
  if (!socket) {
    socket = io(':3002');
    socket.on('chat message', (msg) => {
      // console.log({ msg });
      dispatch({ type: 'RECEIVE_MESSAGE', payload: msg })
    });
  }
  const user = 'paulo' + Math.random(100).toFixed(2);

  return (
    <CTX.Provider value={{ allChats, sendChatAction, user }}>
      {props.children}
    </CTX.Provider>
  )
}
