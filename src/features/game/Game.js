import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchGameState,
  playCards,
  selectGameState
} from './gameSlice';
import { createGame } from '../setup/setupSlice';

import ActiveCards from '../../components/ActiveCards';
import HandCards from '../../components/HandCards';
import PlayAgainButton from '../../components/PlayAgainButton';
import PlayersState from '../../components/PlayersState';
import TurnOptions from '../../components/TurnOptions';

export function Game() {
  const { playerName } = useParams();
  const gameState = useSelector(selectGameState);
  const dispatch = useDispatch();
  const [isInit, setInit] = useState(false);

  const hitService = () => dispatch(fetchGameState(playerName));

  useEffect(() =>{
    if (!isInit) {
        hitService();
        setInit(true);
    }
    const interval = setInterval(hitService, 1000);
    return () => clearInterval(interval);
  }, [isInit, hitService]);

  return (
    <div>
      {gameState && <div>
        <div id='players-info'>
          <PlayersState players={gameState.players} turnIndex={gameState.turnIndex} />
        </div>
        <div id='active-cards'>
          <ActiveCards activeCards={gameState.activeCards} lastCardsPlayed={gameState.lastCardsPlayed} players={gameState.players} turnIndex={gameState.turnIndex} />
        </div>
        <div id='hands-cards'>
          <HandCards playerName={playerName} players={gameState.players} />
        </div>
        <div id='turn-options'>
          <TurnOptions playerName={playerName} activeCards={gameState.activeCards} players={gameState.players} turnIndex={gameState.turnIndex} playCards={playCards} />
        </div>
        <PlayAgainButton players={gameState.players} createGame={createGame} />
      </div>}
    </div>
  );
}
