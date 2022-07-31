export interface Favorite {
  id: string;
  name: string;
  type: "Person"; // This can be changed in future to be able to add to favorites also other entities
}

export type FavoriteState = Favorite[];
