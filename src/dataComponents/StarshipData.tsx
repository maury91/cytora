import { Error } from "components/Error";
import { Loading } from "components/Loading";
import { useGetStarshipQuery } from "hooks/dataHooks";
import React from "react";
import { AugmentedStarship } from "services/swapi/starship";

import { DataComponentCommonProps } from "./common.types";

interface StarshipDataProps
  extends DataComponentCommonProps<AugmentedStarship> {
  id: string;
}

export const StarshipData: React.FC<StarshipDataProps> = ({
  id,
  render,
  renderLoading,
}) => {
  const {
    data: starship,
    error,
    isFetching,
    isLoading,
  } = useGetStarshipQuery(id);

  if (isLoading || isFetching) {
    if (renderLoading) {
      return renderLoading();
    }
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  if (starship) {
    return render(starship);
  }

  return null;
};
