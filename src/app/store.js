import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import gameReducer from '../features/game/gameSlice';
import setupReducer from '../features/setup/setupSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    game: gameReducer,
    setup: setupReducer
  },
});
