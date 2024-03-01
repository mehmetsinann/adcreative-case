import { createSlice } from "@reduxjs/toolkit";

import { Character } from "../../types/Character";

export interface SelectedState {
  selectedCharacters: Character[];
}

const selectedSlice = createSlice({
  name: "selected",
  initialState: {
    selectedCharacters: [],
  } as SelectedState,
  reducers: {
    select: (state, action) => {
      state.selectedCharacters = [...state.selectedCharacters, action.payload];
    },
    unselect: (state, action) => {
      state.selectedCharacters = state.selectedCharacters.filter(
        (character) => character.id !== action.payload.id
      );
    },
  },
});

export const { select, unselect } = selectedSlice.actions;

export default selectedSlice.reducer;
