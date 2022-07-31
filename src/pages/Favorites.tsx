import { useNavigateToResult } from "hooks/useNavigateToResult";
import { TrashIcon } from "icons/Trash";
import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useDispatch, useSelector } from "react-redux";
import { getFavorites } from "store/favorite/selectors";
import { removeFavorite } from "store/favorite/slice";
import { createBinder } from "utils";

export const Favorites: React.FC = () => {
  const favorites = useSelector(getFavorites);
  const navigateToResult = useNavigateToResult();
  const dispatch = useDispatch();

  if (favorites.length === 0) {
    return (
      <p>
        You don't have any favorite, open the profile of any person and click on
        the star to add it to this list
      </p>
    );
  }
  const openResult = createBinder(navigateToResult);

  const removeFromFavorite =
    (id: string): React.MouseEventHandler =>
    (ev) => {
      ev.stopPropagation();
      dispatch(removeFavorite(id));
    };

  return (
    <ListGroup variant="flush">
      {favorites.map((favorite) => (
        <ListGroup.Item
          action
          key={favorite.id}
          onClick={openResult(favorite)}
          className="d-flex justify-content-between"
        >
          <div>{favorite.name}</div>
          <a href="#" onClick={removeFromFavorite(favorite.id)}>
            <TrashIcon />
          </a>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};
