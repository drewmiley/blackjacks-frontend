import { configureStore } from '@reduxjs/toolkit';
import gameReducer from '../features/game/gameSlice';
import setupReducer from '../features/setup/setupSlice';

export default configureStore({
  reducer: {
    game: gameReducer,
    setup: setupReducer
  },
});
