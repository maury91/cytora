import { Error } from "components/Error";
import { Loading } from "components/Loading";
import { useGetPersonQuery } from "hooks/dataHooks";
import React from "react";
import { AugmentedPerson } from "services/swapi/people";

import { DataComponentCommonProps } from "./common.types";

interface PersonDataProps extends DataComponentCommonProps<AugmentedPerson> {
  id: string;
}

export const PersonData: React.FC<PersonDataProps> = ({
  id,
  render,
  renderLoading,
}) => {
  const { data: planet, error, isFetching, isLoading } = useGetPersonQuery(id);

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
