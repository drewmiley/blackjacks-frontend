import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchGameState,
  selectGameState
} from './gameSlice';

export function Game() {
  const { playerName } = useParams();
  const gameState = useSelector(selectGameState);
  const dispatch = useDispatch();
  const [isInit, setInit] = useState(false);

  useEffect(() => {
    if (!isInit) {
      dispatch(fetchGameState(playerName));
      setInit(true);
    }
  }, [isInit, dispatch, playerName]);

  console.log(gameState)

  return (
    <div>
      {playerName}<br></br>
      {gameState && <div>
        {/* {gameState.lastCardsPlayed} */}
        {/* {gameState.turnIndex} */}
        {/* {gameState.activeCards} */}
        {/* {gameState.players} */}
      </div>}
      <br></br>
      <button
        onClick={() =>
            dispatch(fetchGameState(playerName))
        }
      >
        MANUAL REFRESH OF GAME (FOR NOW)
      </button>
      <br></br>
      OTHER PLAYERS STATE INC TURN<br></br>
      LAST CARDS PLAYED BY WHO<br></br>
      TOP CARDS / ACTIVE CARD<br></br>
      YOUR HAND<br></br>
      OPTIONS OF WHAT TO PLAY (select)<br></br>
      TAKE TURN (button)<br></br>
    </div>
  );
}
