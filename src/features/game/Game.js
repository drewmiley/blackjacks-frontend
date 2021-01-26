import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Hand } from 'react-deck-o-cards';
import {
  fetchGameState,
  selectGameState
} from './gameSlice';

const defHandStyle = {
  maxHeight:'200px',
  minHeight:'200px'
};

export function Game() {
  const { playerName } = useParams();
  const gameState = useSelector(selectGameState);
  const dispatch = useDispatch();
  const [isInit, setInit] = useState(false);
  const [value, setValue] = useState();

  useEffect(() => {
    if (!isInit) {
      dispatch(fetchGameState(playerName));
      setInit(true);
    }
  }, [isInit, dispatch, playerName]);

  console.log(gameState);

  const displayPlayersState = ({ playerName, players, turnIndex }) => {
    return (
      <div>
        PLAYERSSTATE
      </div>
    )
  };
  
  const displayLastCardsPlayed = ({ lastCardsPlayed, players, turnIndex }) => {
    const lastPlayer = players[(turnIndex - 1 + players.length) % players.length].name;
    return `${lastPlayer} played ${lastCardsPlayed.map(card => `${card.value} of ${card.suit}`).join(', ')}`;
  };
  
  const displayActiveCards = ({ activeCardsPlayed }) => {
    return (
      <div>
        ACTIVECARDS
      </div>
    )
  };
  
  const displayHandCards = ({ playerName, players }) => {
      return (
      <div>
        HANDCARDS
      </div>
    )
  };
  
  const displayTurnOptions = ({ playerName, players, turnIndex }) => {
    return (
      <div>
        TURNOPTIONS
      </div>
    )
  };

  return (
    <div>
      {playerName}<br></br>
      <Hand cards={[
        { rank: 1, suit: 0 },
        { rank: 13, suit: 1 },
        { rank: 10, suit: 2 },
        { rank: 5, suit: 3 },
      ]} hidden={false} style={defHandStyle} />
      {gameState && <div>
        <div id='players-info'>
          <h4>Players State</h4>
          {displayPlayersState(gameState)}
        </div>
        <div id='card-pile'>
          <div id='last-cards-played'>
            <h4>Last Cards Played</h4>
            {displayLastCardsPlayed(gameState)}
          </div>
          <div id='active-cards'>
              <h4>Active Cards</h4>
              {displayActiveCards(gameState)}
          </div>
        </div>
        <div id='your-hand'>
          <div id='hands-cards'>
            <h4>Hand</h4>
            {displayHandCards(gameState)}
          </div>
          <div id='turn-options'>
            <h4>Turn Options</h4>
            <div onChange={e => setValue(e.target.value)}>
              <input type="radio" value="MALE" name="gender"/> Male
              <input type="radio" value="FEMALE" name="gender"/> Female
            </div>
            {displayTurnOptions(gameState)}
          </div>
          <div id='take-turn-button'>
            <button
              onClick={() =>
                console.log(value)
              }
            >
              Take Turn
            </button>
          </div>
        </div>
      </div>}
      <br></br>
      <button
        onClick={() =>
            dispatch(fetchGameState(playerName))
        }
      >
        MANUAL REFRESH OF GAME (FOR NOW)
      </button>
    </div>
  );
}

// {
//     "lastCardsPlayed": [
//       {
//         "_id": "600d92da389489d98849c54b",
//         "value": "Queen",
//         "suit": "Clubs"
//       }
//     ],
//     "turnIndex": 0,
//     "activeCards": {
//       "_id": "600d92da389489d98849c55c",
//       "value": "Queen",
//       "suit": "Clubs",
//       "king": false,
//       "two": 0,
//       "blackjacks": 0
//     },
//     "players": [
//       {
//         "name": "D",
//         "handSize": 7,
//         "isLastCard": false,
//         "hand": [
//           {
//             "_id": "600d92da389489d98849c54d",
//             "value": "7",
//             "suit": "Diamonds"
//           },
//           {
//             "_id": "600d92da389489d98849c54e",
//             "value": "7",
//             "suit": "Spades"
//           },
//           {
//             "_id": "600d92da389489d98849c54f",
//             "value": "5",
//             "suit": "Spades"
//           },
//           {
//             "_id": "600d92da389489d98849c550",
//             "value": "8",
//             "suit": "Diamonds"
//           },
//           {
//             "_id": "600d92da389489d98849c551",
//             "value": "3",
//             "suit": "Hearts"
//           },
//           {
//             "_id": "600d92da389489d98849c552",
//             "value": "9",
//             "suit": "Clubs"
//           },
//           {
//             "_id": "600d92da389489d98849c553",
//             "value": "9",
//             "suit": "Spades"
//           }
//         ],
//         "possibleCardsToPlay": [
//           [
//             {
//               "_id": "600d92da389489d98849c552",
//               "value": "9",
//               "suit": "Clubs"
//             }
//           ],
//           [
//             {
//               "_id": "600d92da389489d98849c552",
//               "value": "9",
//               "suit": "Clubs"
//             },
//             {
//               "_id": "600d92da389489d98849c553",
//               "value": "9",
//               "suit": "Spades"
//             }
//           ]
//         ]
//       },
//       {
//         "name": "S",
//         "handSize": 7,
//         "isLastCard": false
//       }
//     ]
//   }
