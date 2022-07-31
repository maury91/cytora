import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "store/types";

export const isPersonFavorite = createSelector(
  [(state: RootState) => state.favorite, (_, id: string) => id],
  (favorites, personId) => favorites.some(({ id }) => id === personId)
);

export const getFavorites = (state: RootState) => state.favorite;
