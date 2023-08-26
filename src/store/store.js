import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  squares: Array(9).fill(null),
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setSquares: (state, action) => {
      state.squares = action.payload;
    },
    restart: (state) => {
      state.squares = Array(9).fill(null);
    },
  },
});

export const { setSquares, restart } = gameSlice.actions;

const store = configureStore({
  reducer: gameSlice.reducer,
});

export default store;
