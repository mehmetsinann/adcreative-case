import { configureStore } from "@reduxjs/toolkit";

import characterSlice from "./slices/characterSlice";
import selectedSlice from "./slices/selectedSlice";

export const store = configureStore({
  reducer: {
    characters: characterSlice,
    selected: selectedSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
