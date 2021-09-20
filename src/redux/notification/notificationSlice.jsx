import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "notification",
  initialState: {
    alertMessage: "",
    alertType: "",
    open: false,
  },
  reducers: {
    setNotification: (state, action) => {
      state.open = action.payload.open;
      state.alertMessage =
        action.payload.alertMessage !== undefined
          ? action.payload.alertMessage
          : state.alertMessage;
      state.alertType = action.payload.alertType;
    },
  },
});

export const { setNotification } = slice.actions;

export default slice.reducer;
