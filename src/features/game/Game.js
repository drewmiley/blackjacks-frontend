import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from './gameSlice';
import styles from './Game.module.css';

export function Game() {
  const { playerName } = useParams();
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  return (
    <div>
      {playerName}<br></br>
      MANUAL REFRESH OF GAME (FOR NOW)<br></br>
      OTHER PLAYERS STATE INC TURN<br></br>
      LAST CARDS PLAYED BY WHO<br></br>
      TOP CARDS / ACTIVE CARD<br></br>
      YOUR HAND<br></br>
      OPTIONS OF WHAT TO PLAY (select)<br></br>
      TAKE TURN (button)<br></br>
    </div>
  );
}
