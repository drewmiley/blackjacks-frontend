import { createSlice } from '@reduxjs/toolkit';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/';

export const setupSlice = createSlice({
  name: 'setup',
  initialState: {
    deleteResponse: null,
    setupResponse: null,
  },
  reducers: {
    setSetupResponse: (state, action) => {
      state.deleteResponse = null;
      state.setupResponse = action.payload;
    },
    setDeleteResponse: (state, action) => {
      state.setupResponse = null;
      state.deleteResponse = action.payload;
    }
  },
});

const { setSetupResponse, setDeleteResponse } = setupSlice.actions;

export const createGame = (playerNames, clear, gameTypeIndex = 0, aiPlayersTotal = 0) => async dispatch => {
  const response = await fetch(`${API_URL}init`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ players: playerNames.split(','), clear, gameTypeIndex, aiPlayersTotal })
    });
  const jsonResponse = await response.json();
  dispatch(setSetupResponse(jsonResponse.message));
}

export const deleteGame = () => async dispatch => {
    const response = await fetch(`${API_URL}clear`, {
        method: 'DELETE'
      });
    const jsonResponse = await response.json();
    dispatch(setDeleteResponse(jsonResponse.message));
  }

export const getSetupResponse = state => state.setup.setupResponse;
export const getDeleteResponse = state => state.setup.deleteResponse;

export default setupSlice.reducer;
