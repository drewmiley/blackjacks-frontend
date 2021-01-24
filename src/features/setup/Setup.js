import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  createGame,
  setupIsSuccessful,
} from './setupSlice';

export function Setup() {
  const isSuccessful = useSelector(setupIsSuccessful);
  const dispatch = useDispatch();
  const [playerNames, setPlayerNames] = useState('D,S');

  return (
    <div>
        <button
            onClick={() =>
                dispatch(createGame(playerNames))
            }
        >
            Init Game Button
        </button>
        <br></br>
        <input
            aria-label="Set players names separated by commas, no spaces"
            value={playerNames}
            onChange={e => setPlayerNames(e.target.value)}
        />
        <br></br>
        <div>{isSuccessful}</div>
    </div>
  );
}
