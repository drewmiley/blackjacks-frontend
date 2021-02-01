import React from "react";
import { Hand } from 'react-deck-o-cards';
import styles from './SharedStyles.module.css';

const defHandStyle = {
    maxHeight:'200px',
    minHeight:'200px'
};
const CARD_VALUES = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
const SUITS = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];

export default function HandCards({ playerName, players }) {
    const hand = players.find(player => player.name === playerName).hand;
    if (hand) {
      const displayedHand = hand
        .map(card => ({ rank: CARD_VALUES.findIndex(d => d === card.value) + 1, suit: SUITS.findIndex(d => d === card.suit)}))
        .sort((a, b) => 52 * a.suit - 52 * b.suit + a.rank - b.rank);
      return <Hand cards={displayedHand} hidden={false} style={defHandStyle} />
    } else {
        return <div className={styles.infoText}>PLEASE REFRESH YOUR PAGE</div>
    }
};
