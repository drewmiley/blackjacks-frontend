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

// export const patientsSlice = createSlice({
//     name: 'patients',
//     initialState,
//     reducers: {
//       setPatients: (state, action) => {
//         state.value = action.payload;
//       },
//     },
// });

// export const { setPatients } = patientsSlice.actions;

// export const fetchUserIDs = () => async dispatch => {
//   // NOTE: In future, this endpoint will contain much more information about the users (devices, status, location etc.)
//   const response: Response = await fetch('http://localhost:8000/inventory/users');
//   const results = await response.json();
//   const userIDs = results.data;
//   dispatch(setPatients(userIDs));
// }

// export const selectPatients = (state) => state.patients.value;

// export default patientsSlice.reducer;
