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

// export function Patients() {
//   const users = useSelector(selectPatients);
//   const dispatch = useDispatch();

//   const [isInit, setInit] = useState(false);
//   const [locationFilter, setLocationFilter] = useState(locations[0]);
//   const [idFilter, setIDFilter] = useState('');

//   useEffect(() => {
//     if (!isInit) {
//       dispatch(fetchUserIDs());
//       setInit(true);
//     }
//   }, [isInit, dispatch])

//   return (
//     <div className={styles.patients}>
//         {getFilteredUsers().map((userID, i) =>
//           <PatientRecord key={`user-${i}`} user={createObjectFromUser(userID)} />
//         )}
//     </div>
//   );
// }
