/* #region  - State types */
export interface UserState {
  loading: boolean;
  accounts: [];
  current: {
    [key: string]: any;
  };
  error: string | undefined;
}

export interface MovieState {
  loading: boolean;
  movies: [];
  searchBy?: string;
  selected?: {};
  selectedActors?: [];
  searched?: [];
  reviews?: [];
  actors?: [];
  yourReview?: {};
  pendingReviews?: [];
  error: string | undefined;
}

export interface ActorState {
  loading: boolean;
  selectedActors?: [];
  actors: [];
  moviesOfActor: [];
  actorSelected: {};
  searched: [];
  error: string | undefined;
}

export interface ReviewState {
  loading: boolean;
  reviews?: [];
  yourReview?: {};
  pendingReviews?: [];
  error: string | undefined;
}

/* #endregion */

export type Actors = {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  age: string;
  imgUrl: string;
};

export type Movies = {
  id: string;
  title: string;
  description: string;
  imgUrl: string;
  cost: string;
  yearRelease: string;
  actors?: Actors[];
};

export type Users = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  approved: boolean;
};
