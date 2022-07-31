import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SWAPI_ENDPOINT } from "const";
import { updateEntitiesOnFulfilled } from "store/entities/apiConnection";

import { AugmentedPerson, Person, transformPerson } from "./swapi/people";
import { AugmentedPlanet, Planet, transformPlanet } from "./swapi/planet";
import {
  AugmentedStarship,
  Starship,
  transformStarship,
} from "./swapi/starship";

export interface WrappedSWAPI<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T;
}

export const swapi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: SWAPI_ENDPOINT }),
  tagTypes: ["Person", "Starship", "Planet"],
  endpoints: (builder) => ({
    getPeople: builder.query<AugmentedPerson[], void>({
      query: () => "/people",
      providesTags: ["Person"],
      transformResponse: (baseValue: WrappedSWAPI<Person[]>) =>
        baseValue.results.map(transformPerson),
      onQueryStarted: updateEntitiesOnFulfilled,
    }),
    getPerson: builder.query<AugmentedPerson, string>({
      query: (id: string) => `/people/${id}`,
      providesTags: ["Person"],
      transformResponse: transformPerson,
      onQueryStarted: updateEntitiesOnFulfilled,
    }),
    searchPeople: builder.query<AugmentedPerson[], string>({
      query: (q: string) => `/people/?search=${encodeURIComponent(q)}`,
      providesTags: ["Person"],
      transformResponse: (baseValue: WrappedSWAPI<Person[]>) =>
        baseValue.results.map(transformPerson),
      onQueryStarted: updateEntitiesOnFulfilled,
    }),
    getPlanet: builder.query<AugmentedPlanet, string>({
      query: (id: string) => `/planets/${id}`,
      providesTags: ["Planet"],
      transformResponse: transformPlanet,
      onQueryStarted: updateEntitiesOnFulfilled,
    }),
    searchPlanets: builder.query<AugmentedPlanet[], string>({
      query: (q: string) => `/planets/?search=${q}`,
      providesTags: ["Planet"],
      transformResponse: (baseValue: WrappedSWAPI<Planet[]>) =>
        baseValue.results.map(transformPlanet),
      onQueryStarted: updateEntitiesOnFulfilled,
    }),
    getStarship: builder.query<AugmentedStarship, string>({
      query: (id: string) => `/starships/${id}`,
      providesTags: ["Starship"],
      transformResponse: transformStarship,
      onQueryStarted: updateEntitiesOnFulfilled,
    }),
    searchStarships: builder.query<AugmentedStarship[], string>({
      query: (q: string) => `/starships/?search=${q}`,
      providesTags: ["Starship"],
      transformResponse: (baseValue: WrappedSWAPI<Starship[]>) =>
        baseValue.results.map(transformStarship),
      onQueryStarted: updateEntitiesOnFulfilled,
    }),
  }),
});

export const {
  useGetPeopleQuery,
  useSearchPeopleQuery,
  useSearchPlanetsQuery,
  useSearchStarshipsQuery,
} = swapi;
