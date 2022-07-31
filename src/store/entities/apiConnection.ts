import { ThunkDispatch } from "@reduxjs/toolkit";
import { PromiseWithKnownReason } from "@reduxjs/toolkit/dist/query/core/buildMiddleware/types";
import { AugmentedPerson } from "services/swapi/people";
import { AugmentedPlanet } from "services/swapi/planet";
import { AugmentedStarship } from "services/swapi/starship";
import { MaybeArray } from "types";

import { updateEntity } from "./slice";

export const updateEntitiesOnFulfilled = async (
  _: unknown,
  {
    dispatch,
    queryFulfilled,
  }: {
    queryFulfilled: PromiseWithKnownReason<
      {
        data:
          | MaybeArray<AugmentedPerson>
          | MaybeArray<AugmentedPlanet>
          | MaybeArray<AugmentedStarship>;
      },
      { error: unknown }
    >;
    dispatch: ThunkDispatch<any, any, any>;
  }
) => {
  const { data } = await queryFulfilled;
  if (Array.isArray(data)) {
    data.forEach((entity) => {
      dispatch(updateEntity(entity));
    });
  } else {
    dispatch(updateEntity(data));
  }
};
