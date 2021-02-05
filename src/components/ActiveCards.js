import React from "react";
import { Hand } from 'react-deck-o-cards';
import styles from './Styles.module.css';
import { CARD_VALUES, HAND_STYLE, INITIAL_HAND_SIZE, BLACKJACKS_NOMINATION_VALUE, JACKS_TWOS_EIGHTS_NOMINATION_VALUE, SUITS, BLACKJACKS, JACK_TWO_EIGHT, GAME_TYPE } from '../app/constants';

export default function ActiveCards({ activeCards, lastCardsPlayed, players, turnIndex }) {
    //TODO: This is somewhat hacky
    const isInitialPileCard = players.every(player => player.handSize === INITIAL_HAND_SIZE) && turnIndex === 0;
    const isNominatedSuit = activeCards.value === null;
    const suit = isInitialPileCard && isNominatedSuit ?
        SUITS.findIndex(d => d === lastCardsPlayed[lastCardsPlayed.length -1].suit) :
        SUITS.findIndex(d => d === activeCards.suit);
    const card = { rank: CARD_VALUES.findIndex(d => d === activeCards.value) + 1, suit };
    const lastPlayer = players[(turnIndex - 1 + players.length) % players.length].name;
    const lastPlayedText = lastCardsPlayed && lastCardsPlayed.length ?
        `${lastPlayer} played ${lastCardsPlayed.map(card => `${card.value} of ${card.suit}`).join(', ')}${isNominatedSuit ? `, nominated ${activeCards.suit}` : ''}` :
        `${lastPlayer} picked up / missed turn`;
    const isBlackjacks = GAME_TYPE[parseInt(activeCards.gameTypeIndex)] === BLACKJACKS;
    const isJackTwosAndEights = GAME_TYPE[parseInt(activeCards.gameTypeIndex)] === JACK_TWO_EIGHT;
    if (isBlackjacks) {
        return (
          <div>
            {isNominatedSuit ?
                (
                    <div>
                        <div className={styles.infoText}>
                            {!isInitialPileCard ? `Nominated suit is ${activeCards.suit}` : `Initial card is ${BLACKJACKS_NOMINATION_VALUE} of ${lastCardsPlayed[lastCardsPlayed.length -1].suit}. Free choice`}
                        </div>
                        <Hand cards={[{ rank: 1, suit }]} hidden={false} style={HAND_STYLE} />
                    </div>
                ) :
                <div><Hand cards={[card]} hidden={false} style={HAND_STYLE} /></div>
            }
            {!isInitialPileCard &&  <div className={styles.infoText}>{lastPlayedText}</div>}
            <div>
                <p>King: {activeCards.king.toString()}</p>
                <p>Twos: {activeCards.two}</p>
                <p>BlackJacks: {activeCards.blackjacks}</p>
            </div>
          </div>
        )
    }
    if (isJackTwosAndEights) {

    }
}
