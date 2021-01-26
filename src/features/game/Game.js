import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Hand } from 'react-deck-o-cards';
import {
  fetchGameState,
  playCards,
  selectGameState
} from './gameSlice';
import styles from './Game.module.css';

export function Game() {
  const { playerName } = useParams();
  const gameState = useSelector(selectGameState);
  const dispatch = useDispatch();
  const [isInit, setInit] = useState(false);
  const [cardsIndex, setCardsIndex] = useState();
  const [nominationIndex, setNominationIndex] = useState();

  const defHandStyle = {
    maxHeight:'200px',
    minHeight:'200px'
  };
  const CARD_VALUES = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
  const SUITS = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
  const NOMINATION_VALUE = 'Ace';

  useEffect(() => {
    if (!isInit) {
      dispatch(fetchGameState(playerName));
      setInit(true);
    }
  }, [isInit, dispatch, playerName]);

  console.log(gameState);

  const displayPlayersState = (playerName, { players, turnIndex }) => {
    return (
      <div>
        PLAYERSSTATE
      </div>
    )
  };
  
  const displayActiveCards = ({ activeCards, lastCardsPlayed, players, turnIndex }) => {
    const lastPlayer = players[(turnIndex - 1 + players.length) % players.length].name;
    const card = { rank: CARD_VALUES.findIndex(d => d === activeCards.value) + 1, suit: SUITS.findIndex(d => d === activeCards.suit)};
    return (
      <div>
        <div>{`${lastPlayer} played ${lastCardsPlayed.map(card => `${card.value} of ${card.suit}`).join(', ')}`}</div>
        <div><Hand cards={[card]} hidden={false} style={defHandStyle} /></div>
        <div>
            <p>King: {activeCards.king.toString()}</p>
            <p>Twos: {activeCards.two}</p>
            <p>BlackJacks: {activeCards.blackjacks}</p>
        </div>
      </div>
    )
  };
  
  const displayHandCards = (playerName, { players }) => {
      const hand = players.find(player => player.name === playerName).hand;
      const displayedHand = hand
        .map(card => ({ rank: CARD_VALUES.findIndex(d => d === card.value) + 1, suit: SUITS.findIndex(d => d === card.suit)}))
        .sort((a, b) => 52 * a.suit - 52 * b.suit + a.rank - b.rank);
      return <Hand cards={displayedHand} hidden={false} style={defHandStyle} />
  };
  
  const displayTurnOptions = (playerName, { players, turnIndex }) => {
    const isPlayersTurn = players.findIndex(player => player.name === playerName) === turnIndex;
    if (isPlayersTurn) {
      const possibleCardsToPlay = players.find(player => player.name === playerName).possibleCardsToPlay;
      const displayCardsText = cards => cards.map(card => `${card.value} of ${card.suit}`).join(', ');
      return (
        <>
          <div onChange={e => setCardsIndex(e.target.value)}>
            {possibleCardsToPlay.map((cards, i) => <label className={styles.displayBlock} key={i}>{displayCardsText(cards)}<input type='radio' value={i} name='turnOptions' /></label>)}
          </div>
          {true && <div>
              Nomination Choice
          </div>}
          <button onClick={playCards(playerName, possibleCardsToPlay[cardsIndex], SUITS[nominationIndex])}>Take Turn</button>
        </>
      )
    } else {
      const whoseTurn = players[(turnIndex + players.length) % players.length].name;
      return `${whoseTurn}'s turn`
    }
  };

  return (
    <div>
      {gameState && <div>
        <div id='players-info'>
          {displayPlayersState(playerName, gameState)}
        </div>
        <div id='active-cards'>
          {displayActiveCards(gameState)}
        </div>
        <div id='hands-cards'>
          {displayHandCards(playerName, gameState)}
        </div>
        <div id='turn-options'>
          {displayTurnOptions(playerName, gameState)}
        </div>
      </div>}
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
