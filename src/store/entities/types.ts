import { AugmentedPerson } from "services/swapi/people";
import { AugmentedPlanet } from "services/swapi/planet";
import { AugmentedStarship } from "services/swapi/starship";

export type EntitiesState = {
  Planet: Record<string, AugmentedPlanet>;
  Person: Record<string, AugmentedPerson>;
  Starship: Record<string, AugmentedStarship>;
};
