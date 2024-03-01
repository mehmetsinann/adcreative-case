import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { Character } from "../../types/Character";
import { getAllCharacters } from "../../api/characters";

export interface CharacterState {
  characters: Character[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export const fetchCharacters = createAsyncThunk<
  Character[],
  string | undefined
>("characters/fetchCharacters", async (searchTerm: string | undefined) => {
  const response = await getAllCharacters(searchTerm);
  return response.results;
});

const characterSlice = createSlice({
  name: "characters",
  initialState: {
    characters: [],
    status: "idle",
    error: null,
  } as CharacterState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchCharacters.fulfilled,
        (state, action: PayloadAction<Character[]>) => {
          state.status = "succeeded";
          state.characters = action.payload;
        }
      )
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      });
  },
});

export default characterSlice.reducer;
