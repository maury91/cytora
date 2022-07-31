import { Error } from "components/Error";
import { Loading } from "components/Loading";
import { useNavigateToResult } from "hooks/useNavigateToResult";
import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useGetPeopleQuery } from "services/swapi";
import { createBinder } from "utils";

export const PeopleList: React.FC = () => {
  const {
    data: characters,
    isFetching,
    isLoading,
    error,
  } = useGetPeopleQuery();
  const navigateToResult = useNavigateToResult();

  if (isLoading || isFetching) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  const openResult = createBinder(navigateToResult);

  return (
    <ListGroup variant="flush">
      {characters?.map((person) => (
        <ListGroup.Item
          className="character"
          action
          key={person.id}
          onClick={openResult(person)}
        >
          <div className="name">{person.name}</div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};
