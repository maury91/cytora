import { configureStore } from "@reduxjs/toolkit";
import { swapi } from "services/swapi";

import entities from "./entities/slice";
import favorite from "./favorite/slice";

export const store = configureStore({
  reducer: {
    entities,
    favorite,
    [swapi.reducerPath]: swapi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(swapi.middleware),
});
