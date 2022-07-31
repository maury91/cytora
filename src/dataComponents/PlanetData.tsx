import { Error } from "components/Error";
import { Loading } from "components/Loading";
import { useGetPlanetQuery } from "hooks/dataHooks";
import React from "react";
import { AugmentedPlanet } from "services/swapi/planet";

import { DataComponentCommonProps } from "./common.types";

interface PlanetDataProps extends DataComponentCommonProps<AugmentedPlanet> {
  id: string;
}

export const PlanetData: React.FC<PlanetDataProps> = ({
  id,
  render,
  renderLoading,
}) => {
  const { data: planet, error, isFetching, isLoading } = useGetPlanetQuery(id);

  if (isLoading || isFetching) {
    if (renderLoading) {
      return renderLoading();
    }
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  if (planet) {
    return render(planet);
  }

  return null;
};
