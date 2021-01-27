import { createSlice } from '@reduxjs/toolkit';

const API_URL = process.env.API_URL || 'http://localhost:8000/api/';

export const setupSlice = createSlice({
  name: 'setup',
  initialState: {
    value: null,
  },
  reducers: {
    setIsSuccessful: (state, action) => {
      state.value = action.payload;
    }
  },
});

export const { setIsSuccessful } = setupSlice.actions;

export const createGame = playerNames => async dispatch => {
  const response = await fetch(`${API_URL}init/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ players: playerNames.split(',') })
    });
  const jsonResponse = await response.json();
  dispatch(setIsSuccessful(jsonResponse.message));
}

export const setupIsSuccessful = state => state.setup.value;

export default setupSlice.reducer;
