import { Error } from "components/Error";
import { Loading } from "components/Loading";
import { ResponsiveDataDisplay } from "components/ResponsiveDataDisplay";
import { PlanetData } from "dataComponents/PlanetData";
import { StarshipData } from "dataComponents/StarshipData";
import { useGetPersonQuery } from "hooks/dataHooks";
import { useNavigateToResult } from "hooks/useNavigateToResult";
import { FavoriteIconOff, FavoriteIconOn } from "icons/Favorite";
import React from "react";
import { Button } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSimpleId } from "services/swapi/utils";
import { isPersonFavorite } from "store/favorite/selectors";
import { addFavorite, removeFavorite } from "store/favorite/slice";
import { RootState } from "store/types";
import { createBinder } from "utils";

export const PersonProfile: React.FC = () => {
  const { id = "" } = useParams<{ id: string }>();
  const navigateToResult = useNavigateToResult();
  const dispatch = useDispatch();
  const isFavorite = useSelector((state: RootState) =>
    isPersonFavorite(state, id)
  );
  const { data: person, error, isFetching, isLoading } = useGetPersonQuery(id);

  if (isLoading || isFetching) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  const openResult = createBinder(navigateToResult);

  if (person) {
    const toggleFavorite = () => {
      if (isFavorite) {
        dispatch(removeFavorite(id));
      } else {
        dispatch(addFavorite(id, person.name));
      }
    };
    return (
      <>
        <h2 className="mb-4">
          {person.name}{" "}
          <Button variant="link" onClick={toggleFavorite}>
            {isFavorite ? <FavoriteIconOn /> : <FavoriteIconOff />}
          </Button>
        </h2>
        <ResponsiveDataDisplay
          data={[
            {
              title: "Birth Year",
              value: person.birth_year,
            },
            {
              title: "Eye Color",
              value: person.eye_color,
            },
            {
              title: "Gender",
              value: person.gender,
            },
            {
              title: "Height",
              value: person.height,
            },
            {
              title: "Mass",
              value: person.mass,
            },
            {
              title: "Skin Color",
              value: person.skin_color,
            },
            {
              title: "Homeworld",
              value: (
                <PlanetData
                  id={getSimpleId(person.homeworld)}
                  render={(planet) => (
                    <a href="#" onClick={openResult(planet)}>
                      {planet.name}
                    </a>
                  )}
                />
              ),
            },
          ]}
          columns={3}
        />
        <h3>Starships</h3>
        {person.starships.length ? (
          <ListGroup variant="flush">
            {person.starships.map((id) => (
              <StarshipData
                id={getSimpleId(id)}
                render={(starship) => (
                  <ListGroup.Item action onClick={openResult(starship)}>
                    {starship.name}
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
          <p>This character has no starships</p>
        )}
      </>
    );
  }

  return null;
};
