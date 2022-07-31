import {
  useSearchPeopleQuery,
  useSearchPlanetsQuery,
  useSearchStarshipsQuery,
} from "services/swapi";
import { EntityTypes } from "types";

export const useSearchQuery = (query: string, type: EntityTypes) => {
  const peopleResult = useSearchPeopleQuery(query, {
    skip: type !== "Person",
  });
  const planetsResult = useSearchPlanetsQuery(query, {
    skip: type !== "Planet",
  });
  const starshipsResult = useSearchStarshipsQuery(query, {
    skip: type !== "Starship",
  });
  switch (type) {
    case "Person":
      return peopleResult;
    case "Planet":
      return planetsResult;
    case "Starship":
    default:
      return starshipsResult;
  }
};
