import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from './setupSlice';

export function Setup() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  return (
    <div>
        <button
            onClick={() =>
                dispatch(incrementByAmount(Number(incrementAmount) || 0))
            }
        >
            Init Game Button
        </button>
        Text Input to Enter Player Names
        <br></br>
        <input
            aria-label="Set increment amount"
            value={incrementAmount}
            onChange={e => setIncrementAmount(e.target.value)}
        />
    </div>
  );
}
