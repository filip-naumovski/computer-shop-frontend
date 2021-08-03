import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    expiration: null,
    roles: [],
    isLoggedIn: false,
  },
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      state.expiration = action.payload.expiration;
      state.roles = action.payload.roles;
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
});

export const { setCredentials } = slice.actions;

export default slice.reducer;
