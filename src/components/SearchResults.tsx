import { useNavigateToResult } from "hooks/useNavigateToResult";
import { useSearchQuery } from "hooks/useSearchQuery";
import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { EntityTypes } from "types";
import { createBinder } from "utils";

import { Error } from "./Error";
import { Loading } from "./Loading";

interface SearchResultsProps {
  query: string;
  type: EntityTypes;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  query,
  type,
}) => {
  const {
    data: results,
    isLoading,
    isFetching,
    error,
  } = useSearchQuery(query, type);
  const navigateToResult = useNavigateToResult();

  if (isLoading || isFetching) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  const openResult = createBinder(navigateToResult);

  if (results?.length === 0) {
    return (
      <p>
        No {type.toLowerCase()} that matches "{query}"
      </p>
    );
  }

  return (
    <ListGroup variant="flush">
      {results?.map((result) => (
        <ListGroup.Item action key={result.id} onClick={openResult(result)}>
          <div className="name">{result.name}</div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};
