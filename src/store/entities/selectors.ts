import { AugmentedPerson } from "services/swapi/people";
import { AugmentedPlanet } from "services/swapi/planet";
import { AugmentedStarship } from "services/swapi/starship";
import { RootState } from "store/types";
import { EntityTypes } from "types";

export function getEntity(
  entityType: "Person",
  entityId: string
): (state: RootState) => AugmentedPerson | undefined;
export function getEntity(
  entityType: "Starship",
  entityId: string
): (state: RootState) => AugmentedStarship | undefined;
export function getEntity(
  entityType: "Planet",
  entityId: string
): (state: RootState) => AugmentedPlanet | undefined;
export function getEntity(entityType: EntityTypes, entityId: string) {
  return (
    state: RootState
  ): AugmentedPlanet | AugmentedStarship | AugmentedPerson | undefined =>
    state.entities[entityType][entityId];
}
