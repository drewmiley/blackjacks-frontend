import React from "react";
import { useDispatch } from 'react-redux';

export default function PlayAgainButton({ players, createGame }) {
  const dispatch = useDispatch();
  const gameIsFinished = players.some(player => player.handSize === 0);
  const playerNames = players.map(player => player.name);
  const rotatedNames = [playerNames[playerNames.length - 1]].concat([playerNames.slice(0, playerNames.length - 1)]).join(',');
  if (gameIsFinished) {
      return <button onClick={() => dispatch(createGame(rotatedNames, true))}>Play Again</button>
  } else {
    return null;
  }
}
