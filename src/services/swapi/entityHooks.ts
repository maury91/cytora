import { useDispatch, useSelector } from "react-redux";
import { swapi } from "services/swapi";
import { getEntity } from "store/entities/selectors";
import { EntityTypes } from "types";

import { AugmentedPerson } from "./people";
import { AugmentedPlanet } from "./planet";
import { AugmentedStarship } from "./starship";

type DataResponse<T> = T extends "Person"
  ? AugmentedPerson
  : T extends "Planet"
  ? AugmentedPlanet
  : AugmentedStarship;

export const createQueryHook =
  <T extends EntityTypes>(entityType: T, endpoint: string) =>
  (id: string) => {
    const dispatch = useDispatch();
    const entityValue = useSelector(
      // @ts-ignore
      getEntity(entityType, id)
    ) as unknown as DataResponse<T>;
    // @ts-ignore
    const { error } = useSelector(swapi.endpoints[endpoint].select(id));
    if (entityValue) {
      return {
        data: entityValue,
        isLoading: false,
        isFetching: false,
        error: undefined,
      };
    }
    // @ts-ignore
    dispatch(swapi.endpoints[endpoint].initiate(id));
    return {
      data: undefined,
      isLoading: false,
      isFetching: true,
      error,
    };
  };

export const useGetPersonQuery = createQueryHook("Person", "getPerson");
export const useGetPlanetQuery = createQueryHook("Planet", "getPlanet");
export const useGetStarshipQuery = createQueryHook("Starship", "getStarship");
