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
  error: string | undefined;
}
