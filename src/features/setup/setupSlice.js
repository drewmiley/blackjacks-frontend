import { createSlice } from '@reduxjs/toolkit';

export const setupSlice = createSlice({
  name: 'setup',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = setupSlice.actions;

export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

export const selectCount = state => state.setup.value;

export default setupSlice.reducer;
