import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  createGame,
  deleteGame,
  getSetupResponse,
  getDeleteResponse,
} from './setupSlice';

export function Setup() {
  const setupResponse = useSelector(getSetupResponse);
  const deleteResponse = useSelector(getDeleteResponse);
  const dispatch = useDispatch();
  const [playerNames, setPlayerNames] = useState('D,S');

  return (
    <div>
        <button onClick={() => dispatch(createGame(playerNames))}>
            Init Game With Players
        </button>
        <br></br>
        <input
            aria-label="Set players names separated by commas, no spaces"
            value={playerNames}
            onChange={e => setPlayerNames(e.target.value)}
        />
        <br></br>
        <div>{setupResponse}</div>
        <br></br>
        <button onClick={() => dispatch(deleteGame())}>
            Delete Game
        </button>
        <br></br>
        <div>{deleteResponse}</div>
    </div>
  );
}
