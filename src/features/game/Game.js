import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchGameState,
  selectGameState
} from './gameSlice';

const displayPlayersState = ({ playerName, players, turnIndex }) => {
  return (
    <div>
      PLAYERSSTATE
    </div>
  )
};

const displayLastCardsPlayed = ({ lastCardsPlayed, players, turnIndex }) => {
  return (
    <div>
      LASTCARDSPLAYED
    </div>
  )
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
        <div id='players-info'>
          Players State: {displayPlayersState(gameState)}
        </div>
        <div id='card-pile'>
          <div id='last-cards-played'>
            Last Cards Played: {displayLastCardsPlayed(gameState)}
          </div>
          <div id='active-cards'>
            Active Cards: {displayActiveCards(gameState)}
          </div>
        </div>
        <div id='your-hand'>
          <div id='hands-cards'>
            Cards: {displayHandCards(gameState)}
          </div>
          <div id='turn-options'>
            {displayTurnOptions(gameState)}
          </div>
          <div id='take-turn-button'>
            <button
              onClick={() =>
                dispatch(fetchGameState(playerName))
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
//         "isLastCard": false
//       },
//       {
//         "name": "S",
//         "handSize": 7,
//         "isLastCard": false
//       }
//     ]
//   }
