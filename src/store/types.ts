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
  searched?: [];
  reviews?: [];
  error: string | undefined;
}
