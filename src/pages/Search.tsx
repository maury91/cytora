import { SearchResults } from "components/SearchResults";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { asValidType } from "utils";

export const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const type = asValidType(searchParams.get("type") ?? "");

  return <SearchResults type={type} query={query} />;
};
