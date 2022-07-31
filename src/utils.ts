import { SEARCH_TYPES } from "./const";
import { AugmentedPerson } from "./services/swapi/people";
import { AugmentedPlanet } from "./services/swapi/planet";
import { AugmentedStarship } from "./services/swapi/starship";
import { EntityTypes } from "./types";

export const asValidType = (rawType?: string): EntityTypes =>
  SEARCH_TYPES.includes((rawType ?? "") as EntityTypes)
    ? (rawType as EntityTypes)
    : SEARCH_TYPES[0];

export const constructUrl = (
  input: Pick<
    AugmentedStarship | AugmentedPlanet | AugmentedPerson,
    "type" | "id"
  >
) => {
  switch (input.type) {
    case "Starship":
      return `/starships/${input.id}`;
    case "Planet":
      return `/planets/${input.id}`;
    case "Person":
    default:
      return `/people/${input.id}`;
  }
};

export const createBinder =
  <T, R>(fn: (value: T) => R) =>
  (value: T) =>
  () =>
    fn(value);
