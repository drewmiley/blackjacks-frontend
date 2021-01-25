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

export const selectGameState = state => state.game.value;

export default gameSlice.reducer;
