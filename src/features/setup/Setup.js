import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  createGame,
  deleteGame,
  getSetupResponse,
  getDeleteResponse,
} from './setupSlice';
import styles from './Setup.module.css';

export function Setup() {
  const setupResponse = useSelector(getSetupResponse);
  const deleteResponse = useSelector(getDeleteResponse);
  const dispatch = useDispatch();
  const [playerNames, setPlayerNames] = useState('D');
  const [gameTypeIndex, setGameTypeIndex] = useState(0);
  const [aiPlayersTotal, setAIPlayersTotal] = useState(0);

  return (
    <div>
        <button onClick={() => dispatch(createGame(playerNames, false, gameTypeIndex, aiPlayersTotal))}>
            Init Game With Players
        </button>
        <br></br>
        <input
            aria-label="Set players names separated by commas, no spaces"
            value={playerNames}
            onChange={e => setPlayerNames(e.target.value)}
        />
        <br></br>
        <div onChange={e => setGameTypeIndex(e.target.value)}>
            <label className={styles.displayBlock}>Jacks, Twos and Eights<input type='radio' value={0} name='gameTypeOptions' /></label>
            <label className={styles.displayBlock}>BlackJacks<input type='radio' value={1} name='gameTypeOptions' /></label>
        </div>
        <br></br>
            <div onChange={e => setAIPlayersTotal(e.target.value)}>
                <label className={styles.displayBlock}>0 AI Players<input type='radio' value={0} name='aiPlayersTotalOptions' /></label>
                <label className={styles.displayBlock}>1 AI Players<input type='radio' value={1} name='aiPlayersTotalOptions' /></label>
                <label className={styles.displayBlock}>2 AI Players<input type='radio' value={2} name='aiPlayersTotalOptions' /></label>
                <label className={styles.displayBlock}>3 AI Players<input type='radio' value={3} name='aiPlayersTotalOptions' /></label>
            </div>
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
