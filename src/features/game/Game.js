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
import { createGame } from '../setup/setupSlice';

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

  const hitService = () => dispatch(fetchGameState(playerName));

  useEffect(() =>{
    if (!isInit) {
        hitService();
        setInit(true);
    }
    const interval = setInterval(hitService, 3000);
    return () => clearInterval(interval);
  }, [isInit, hitService]);

  const displayPlayersState = (playerName, { players, turnIndex }) => {
    return (
      <div>
        <table>
          <thead>
            <tr><th>Name</th>{players.map(player => <th>{player.name}</th>)}</tr>
          </thead>
          <tbody>
            <tr><td>Hand Size</td>{players.map(player => <td>{player.handSize}</td>)}</tr>
            <tr><td>On Last Card</td>{players.map(player => <td>{player.isLastCard ? 'Y': 'N'}</td>)}</tr>
            <tr><td>Turn</td>{players.map((d, i) => <td>{i === turnIndex && 'Y'}</td>)}</tr>
          </tbody>
        </table>
      </div>
    )
  };
  
  const displayActiveCards = ({ activeCards, lastCardsPlayed, players, turnIndex }) => {
    const lastPlayer = players[(turnIndex - 1 + players.length) % players.length].name;
    const isNominatedSuit = activeCards.value === null;
    const card = { rank: CARD_VALUES.findIndex(d => d === activeCards.value) + 1, suit: SUITS.findIndex(d => d === activeCards.suit)};
    //TODO: This is somewhat hacky
    const isInitialPileCard = players.every(player => player.handSize === 7) && turnIndex === 0;
    const lastPlayedText = `${lastPlayer} played ${lastCardsPlayed.map(card => `${card.value} of ${card.suit}`).join(', ')}${isNominatedSuit ? `, nominated ${activeCards.suit}` : ''}`;
    return (
      <div>
        {isNominatedSuit ? <div>Nominated suit is {activeCards.suit}</div> : <div><Hand cards={[card]} hidden={false} style={defHandStyle} /></div>}
        {!isInitialPileCard &&  <div>{lastPlayedText}</div>}
        {/* TODO: This is Blackjacks specific */}
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
      const displayCardsText = cards => cards.length ? cards.map(card => `${card.value} of ${card.suit}`).join(', ') : 'Miss Turn / Pick Up';
      const isNomination = parseInt(cardsIndex) >= 0 && possibleCardsToPlay[cardsIndex].length > 0
        && possibleCardsToPlay[cardsIndex][possibleCardsToPlay[cardsIndex].length - 1].value === NOMINATION_VALUE;
      return (
        <>
          <div onChange={e => setCardsIndex(e.target.value)}>
            {possibleCardsToPlay.map((cards, i) => <label className={styles.displayBlock} key={i}>{displayCardsText(cards)}<input type='radio' value={i} name='turnOptions' /></label>)}
          </div>
          {isNomination && <div>
              Nomination Choice
              <div onChange={e => setNominationIndex(e.target.value)}>
                {SUITS.map((suit, i) => <label className={styles.displayBlock} key={i}>{suit}<input type='radio' value={i} name='nominationOptions' /></label>)}
              </div>
          </div>}
          <button onClick={() => dispatch(playCards(playerName, possibleCardsToPlay[cardsIndex], isNomination && SUITS[nominationIndex]))}>Take Turn</button>
        </>
      )
    } else {
      const whoseTurn = players[(turnIndex + players.length) % players.length].name;
      return `${whoseTurn}'s turn`
    }
  };

  const playAgainButton = (playerName, { players }) => {
    const gameIsFinished = players.some(player => player.handSize === 0);
    const playerNames = players.map(player => player.name);
    const rotatedNames = [playerNames[playerNames.length - 1]].concat([playerNames.slice(0, playerNames.length - 1)]).join(',');
    if (gameIsFinished) {
        return <button onClick={() => dispatch(createGame(rotatedNames, true))}>Play Again</button>
    }
  }

  return (
    <div>
      {gameState && <div>
        <div className={styles.playersInfo}>
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
        {playAgainButton(playerName, gameState)}
      </div>}
    </div>
  );
}
