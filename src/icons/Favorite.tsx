import { faStar as faStarOff } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarOn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const FavoriteIconOff: React.FC = () => (
  <FontAwesomeIcon icon={faStarOff} />
);
export const FavoriteIconOn: React.FC = () => (
  <FontAwesomeIcon icon={faStarOn} />
);
