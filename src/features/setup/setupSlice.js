import { createSlice } from '@reduxjs/toolkit';

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
  console.log(playerNames);
  const response = await fetch('http://localhost:8000/api/init/');
  const jsonResponse = await response.json();
  dispatch(setIsSuccessful(jsonResponse));
}

export const setupIsSuccessful = state => state.setup.value;

export default setupSlice.reducer;
