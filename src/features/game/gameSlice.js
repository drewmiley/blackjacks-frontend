import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    game: null,
  },
  reducers: {
    setGame: (state, action) => {
      state.value = action.payload;
    }
  },
});

export const { setGame } = gameSlice.actions;

export const fetchGameState = playerName => async dispatch => {
  const response = await fetch(`http://localhost:8000/api/state/${playerName}`);
  const gameState = await response.json();
  dispatch(setGame(gameState));
}

export const playCards = (playerName, cards, nomination = null) => async dispatch => {
  console.log(playerName);
  console.log(cards);
  console.log(nomination);
//   const response = await fetch(`http://localhost:8000/api/play/${playerName}`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ cards, nomination })
//   });
//   const newGameState = await response.json();
//   dispatch(setGame(newGameState));
}

export const selectGameState = state => state.game.value;

export default gameSlice.reducer;
