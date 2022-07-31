import { SEARCH_TYPES } from "const";
import { SearchIcon } from "icons/Search";
import React from "react";
import { Dropdown, DropdownButton, InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { EntityTypes } from "types";
import { asValidType } from "utils";

export const Search: React.FC = () => {
  const navigateTo = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchType, setSearchType] = React.useState(
    asValidType(searchParams.get("type") ?? "")
  );
  const [query, setQuery] = React.useState(searchParams.get("query") ?? "");

  const doSearch: React.FormEventHandler = (ev) => {
    ev.preventDefault();
    if (query.trim().length) {
      navigateTo(
        `/search?type=${searchType}&query=${encodeURIComponent(query)}`
      );
    }
  };

  const updateQuery: React.ChangeEventHandler<HTMLInputElement> = (ev) =>
    setQuery(ev.target.value);

  const setSearch = (type: EntityTypes) => () => setSearchType(type);
  return (
    <Form className="d-flex" onSubmit={doSearch}>
      <InputGroup>
        <Form.Control
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={query}
          onChange={updateQuery}
        />
        <DropdownButton
          title={searchType}
          variant="outline-secondary"
          align="end"
        >
          {SEARCH_TYPES.map((type, index) => (
            <Dropdown.Item
              key={index}
              disabled={searchType === type}
              onClick={setSearch(type)}
            >
              {type}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <Button variant="outline-secondary" type="submit" aria-label="submit">
          <SearchIcon />
        </Button>
      </InputGroup>
    </Form>
  );
};
