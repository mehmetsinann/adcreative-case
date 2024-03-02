import { configureStore } from "@reduxjs/toolkit";

import characterSlice from "./slices/characterSlice";
import selectedSlice from "./slices/selectedSlice";

export const store = configureStore({
  reducer: {
    characters: characterSlice,
    selected: selectedSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
