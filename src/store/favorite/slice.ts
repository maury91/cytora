import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { initialState } from "./const";
import { Favorite } from "./types";

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addFavorite: {
      reducer(state, action: PayloadAction<Omit<Favorite, "type">>) {
        const favoriteIndex = state.findIndex(
          ({ id }) => id === action.payload.id
        );
        if (favoriteIndex === -1) {
          state.push({
            ...action.payload,
            type: "Person",
          });
        }
      },
      prepare: (id: string, name: string) => ({ payload: { id, name } }),
    },
    removeFavorite: {
      reducer(state, action: PayloadAction<string>) {
        const favoriteIndex = state.findIndex(
          ({ id }) => id === action.payload
        );
        if (favoriteIndex !== -1) {
          state.splice(favoriteIndex, 1);
        }
      },
      prepare: (id: string) => ({ payload: id }),
    },
  },
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
