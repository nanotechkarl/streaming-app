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
