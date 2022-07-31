import { Error } from "components/Error";
import { Loading } from "components/Loading";
import { ResponsiveDataDisplay } from "components/ResponsiveDataDisplay";
import { PersonData } from "dataComponents/PersonData";
import { useGetStarshipQuery } from "hooks/dataHooks";
import { useNavigateToResult } from "hooks/useNavigateToResult";
import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useParams } from "react-router-dom";
import { getSimpleId } from "services/swapi/utils";
import { createBinder } from "utils";

export const StarshipProfile: React.FC = () => {
  const { id = "" } = useParams<{ id: string }>();
  const navigateToResult = useNavigateToResult();
  const {
    data: starship,
    error,
    isFetching,
    isLoading,
  } = useGetStarshipQuery(id);

  if (isLoading || isFetching) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  const openResult = createBinder(navigateToResult);

  if (starship) {
    return (
      <>
        <h2 className="mb-4">{starship.name}</h2>
        <ResponsiveDataDisplay
          data={[
            {
              title: "Module",
              value: starship.model,
            },
            {
              title: "Starship Class",
              value: starship.starship_class,
            },
            {
              title: "Manufacter",
              value: starship.manufacturer,
            },
            {
              title: "Cost in Credits",
              value: starship.cost_in_credits,
            },
            {
              title: "Length",
              value: starship.length,
            },
            {
              title: "Minimum Crew",
              value: starship.crew,
            },
            {
              title: "Maximum Passengers",
              value: starship.passengers,
            },
            {
              title: "Max Atmosphering Speed",
              value: starship.max_atmosphering_speed,
            },
            {
              title: "Hyperdrive Rating",
              value: starship.hyperdrive_rating,
            },
            {
              title: "Maximum Megalights per Hour",
              value: starship.MGLT,
            },
            {
              title: "Cargo Capacity",
              value: starship.cargo_capacity,
            },
            {
              title: "Consumables",
              value: starship.consumables,
            },
          ]}
          columns={3}
        />
        <h3>Pilots</h3>
        {starship.pilots.length ? (
          <ListGroup variant="flush">
            {starship.pilots.map((id) => (
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
          <p>This ship has no pilots</p>
        )}
      </>
    );
  }

  return null;
};
