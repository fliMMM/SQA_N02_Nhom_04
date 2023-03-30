import { createSlice } from "@reduxjs/toolkit";

const countSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    incre(state) {
      return state + 1;
    },

    decre(state) {
      return state - 1;
    }
  }
});

const { reducer, actions } = countSlice;

export const { incre, decre } = actions;

export default reducer;