import { compose } from "@reduxjs/toolkit";
import { RootState } from "store/types";

import { initialState } from "./const";
import { isPersonFavorite } from "./selectors";
import reducer, { addFavorite, removeFavorite } from "./slice";
import { FavoriteState } from "./types";

const wrapFavoriteState = (favorite: FavoriteState): RootState =>
  ({
    favorite,
  } as RootState);

describe("Test store/favorite", () => {
  describe("when addFavorite action is reduced", () => {
    it("should add the entity to the favorites", () => {
      const id = "1";
      const name = "Foo";
      const prevState = wrapFavoriteState(initialState);
      const nextState = wrapFavoriteState(
        reducer(initialState, addFavorite(id, name))
      );
      expect(isPersonFavorite(prevState, id)).toBe(false);
      expect(isPersonFavorite(nextState, id)).toBe(true);
    });
  });

  describe("when removeFavorite action is reduced", () => {
    it("should remove the entity to the favorites", () => {
      const id = "1";
      const name = "Foo";
      const startingState: FavoriteState = [
        {
          id,
          name,
          type: "Person",
        },
      ];
      const prevState = wrapFavoriteState(startingState);
      const nextState = wrapFavoriteState(
        reducer(startingState, removeFavorite(id))
      );
      expect(isPersonFavorite(prevState, id)).toBe(true);
      expect(isPersonFavorite(nextState, id)).toBe(false);
    });
  });

  describe("when multiple actions are reduced", () => {
    it("should remove a specific entity", () => {
      const id1 = "1";
      const name1 = "Foo";
      const id2 = "2";
      const name2 = "Bar";

      // compose has to be read bottom to top
      const nextState = compose(
        wrapFavoriteState,
        (state: FavoriteState) => reducer(state, removeFavorite(id1)),
        (state: FavoriteState) => reducer(state, addFavorite(id1, name1)),
        (state: FavoriteState) => reducer(state, addFavorite(id2, name2))
      )(initialState);

      expect(isPersonFavorite(nextState, id1)).toBe(false);
      expect(isPersonFavorite(nextState, id2)).toBe(true);
    });

    it("should not add the same entity twice", () => {
      const id = "1";
      const name1 = "Foo";
      const name2 = "Bar";

      // compose has to be read bottom to top
      const nextState = compose(
        wrapFavoriteState,
        (state: FavoriteState) => reducer(state, removeFavorite(id)),
        (state: FavoriteState) => reducer(state, addFavorite(id, name1)),
        (state: FavoriteState) => reducer(state, addFavorite(id, name2))
      )(initialState);

      expect(isPersonFavorite(nextState, id)).toBe(false);
    });
  });
});
