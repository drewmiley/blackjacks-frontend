import React from "react";
import { Hand } from 'react-deck-o-cards';
import styles from './Styles.module.css';
import { CARD_VALUES, HAND_STYLE, SUITS } from '../app/constants';

export default function HandCards({ playerName, players }) {
    const DECK_SIZE = CARD_VALUES.length * SUITS.length;
    const hand = players.find(player => player.name === playerName).hand;
    if (hand) {
      const displayedHand = hand
        .map(card => ({ rank: CARD_VALUES.findIndex(d => d === card.value) + 1, suit: SUITS.findIndex(d => d === card.suit)}))
        .sort((a, b) => DECK_SIZE * a.suit - DECK_SIZE * b.suit + a.rank - b.rank);
      return <Hand cards={displayedHand} hidden={false} style={HAND_STYLE} />
    } else {
        return <div className={styles.infoText}>PLEASE REFRESH YOUR PAGE</div>
    }
};
