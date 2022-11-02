import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { server, getCookie } from "../utils/global";
import { MovieState } from "./types";

//#region - Token
let token: string = getCookie("token");
let headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};
//#endregion

/* #region  - Initial state */
const initialState: MovieState = {
  loading: false,
  movies: [],
  searchBy: "movie",
  searched: [],
  selected: {},
  reviews: [],
  error: "",
};
/* #endregion */

/* #region - Get all movies latest*/
export const getMovies = createAsyncThunk(
  "movie/getMovies",
  async (arg, thunkApi) => {
    try {
      token = getCookie("token");
      const response = await axios.get(`${server.api}/movies`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

/* #endregion */

/* #region - Search a movie */
export const searchByMovie = createAsyncThunk(
  "movie/searchMovies",
  async (title: string, thunkApi) => {
    try {
      const response = await axios.get(
        `${server.api}/movies/search/movie/${title}`
      );

      return response.data.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
/* #endregion */

/* #region  - Get movie Details */
export const getMovieById = createAsyncThunk(
  "movie/getMovieById",
  async (id: string, thunkApi) => {
    try {
      const response = await axios.get(`${server.api}/movies/${id}`);

      return response.data.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
/* #endregion */

/* #region  - Get reviews of a movie */
export const getMovieReviews = createAsyncThunk(
  "movie/getMovieReviews",
  async (id: string, thunkApi) => {
    try {
      const response = await axios.get(`${server.api}/reviews/movie/${id}`);

      return response.data.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
/* #endregion */

const movie = createSlice({
  name: "movie",
  initialState,
  reducers: {
    searchActor(state) {
      state.searchBy = "actor";
    },
    searchMovie(state) {
      state.searchBy = "movie";
    },
  },
  extraReducers: (builder) => {
    /* #region - Get movies */
    builder.addCase(getMovies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getMovies.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.movies = action.payload;
        state.error = "";
      }
    );
    builder.addCase(getMovies.rejected, (state, action) => {
      state.loading = false;
      state.movies = [];
      state.error = action.error.message;
    });
    /* #endregion */

    /* #region - search movies */
    builder.addCase(searchByMovie.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      searchByMovie.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.searched = action.payload;
        state.error = "";
      }
    );
    builder.addCase(searchByMovie.rejected, (state, action) => {
      state.loading = false;
      state.searched = [];
      state.error = action.error.message;
    });
    /* #endregion */

    /* #region - Get movies by id*/
    builder.addCase(getMovieById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getMovieById.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.selected = action.payload;
        state.error = "";
      }
    );
    builder.addCase(getMovieById.rejected, (state, action) => {
      state.loading = false;
      state.selected = {};
      state.error = action.error.message;
    });
    /* #endregion */

    /* #region - Get reviews of a movie*/
    builder.addCase(getMovieReviews.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getMovieReviews.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.reviews = action.payload;
        state.error = "";
      }
    );
    builder.addCase(getMovieReviews.rejected, (state, action) => {
      state.loading = false;
      state.reviews = [];
      state.error = action.error.message;
    });
    /* #endregion */
  },
});

export const { searchActor, searchMovie } = movie.actions;

export default movie.reducer;
