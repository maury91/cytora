import React from "react";
import { Route, Routes } from "react-router-dom";

import { Layout } from "./components/Layout";
import { Favorites } from "./pages/Favorites";
import { PeopleList } from "./pages/PeopleList";
import { PersonProfile } from "./pages/PersonProfile";
import { PlanetProfile } from "./pages/PlanetProfile";
import { Search } from "./pages/Search";
import { StarshipProfile } from "./pages/StarshipProfile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PeopleList />} />
        <Route path="search" element={<Search />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="people/:id" element={<PersonProfile />} />
        <Route path="planets/:id" element={<PlanetProfile />} />
        <Route path="starships/:id" element={<StarshipProfile />} />
      </Route>
    </Routes>
  );
}

export default App;
