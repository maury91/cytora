import { Error } from "components/Error";
import { Loading } from "components/Loading";
import { ResponsiveDataDisplay } from "components/ResponsiveDataDisplay";
import { PersonData } from "dataComponents/PersonData";
import { useGetPlanetQuery } from "hooks/dataHooks";
import { useNavigateToResult } from "hooks/useNavigateToResult";
import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useParams } from "react-router-dom";
import { getSimpleId } from "services/swapi/utils";
import { createBinder } from "utils";

export const PlanetProfile: React.FC = () => {
  const { id = "" } = useParams<{ id: string }>();
  const navigateToResult = useNavigateToResult();
  const { data: planet, error, isFetching, isLoading } = useGetPlanetQuery(id);

  if (isLoading || isFetching) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  const openResult = createBinder(navigateToResult);

  if (planet) {
    return (
      <>
        <h2 className="mb-4">{planet.name}</h2>
        <ResponsiveDataDisplay
          data={[
            {
              title: "Diameter",
              value: planet.diameter,
            },
            {
              title: "Rotation Period",
              value: planet.rotation_period,
            },
            {
              title: "Orbital Period",
              value: planet.orbital_period,
            },
            {
              title: "Gravity",
              value: planet.gravity,
            },
            {
              title: "Population",
              value: planet.population,
            },
            {
              title: "Climate",
              value: planet.climate,
            },
            {
              title: "Terrain",
              value: planet.terrain,
            },
            {
              title: "Surface Water",
              value: planet.surface_water,
            },
          ]}
          columns={3}
        />
        <h3>Residents</h3>
        {planet.residents.length ? (
          <ListGroup variant="flush">
            {planet.residents.map((id) => (
              <PersonData
                id={getSimpleId(id)}
                render={(person) => (
                  <ListGroup.Item action onClick={openResult(person)}>
                    {person.name}
                  </ListGroup.Item>
                )}
                renderLoading={() => (
                  <ListGroup.Item action disabled>
                    <Loading />
                  </ListGroup.Item>
                )}
                key={id}
              />
            ))}
          </ListGroup>
        ) : (
          <p>This planet has no residents</p>
        )}
      </>
    );
  }

  return null;
};
