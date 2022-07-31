import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AugmentedPerson } from "services/swapi/people";
import { AugmentedPlanet } from "services/swapi/planet";
import { AugmentedStarship } from "services/swapi/starship";

import { initialState } from "./const";

const entitiesSlice = createSlice({
  name: "entities",
  initialState,
  reducers: {
    updateEntity: {
      reducer(
        state,
        action: PayloadAction<
          AugmentedPerson | AugmentedPlanet | AugmentedStarship
        >
      ) {
        state[action.payload.type][action.payload.id] = action.payload;
      },
      prepare: (
        entity: AugmentedPerson | AugmentedPlanet | AugmentedStarship
      ) => ({ payload: entity }),
    },
  },
});

export const { updateEntity } = entitiesSlice.actions;
export default entitiesSlice.reducer;
