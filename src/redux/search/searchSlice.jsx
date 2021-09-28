import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "search",
  initialState: {
    input: "",
  },
  reducers: {
    setSearch: (state, action) => {
      state.input = action.payload.input;
    },
  },
});

export const { setSearch } = slice.actions;

export default slice.reducer;
