import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { server, getCookie, alertError, alertSuccess } from "../utils/global";
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
  yourReview: {},
  pendingReviews: [],
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

/* #region  - Add a movie */
export const addMovie = createAsyncThunk(
  "movie/addMovie",
  async (
    {
      title,
      description,
      imgUrl,
      cost,
      yearRelease,
    }: {
      title: string;
      description: string;
      imgUrl: string;
      cost: number;
      yearRelease: string;
    },
    thunkApi
  ) => {
    try {
      token = getCookie("token");

      const response = await axios.post(
        `${server.api}/movies`,
        {
          title,
          description,
          imgUrl,
          cost,
          yearRelease,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.message.includes("exist")) {
        alertError("Movie title already exists");
        return;
      }

      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
/* #endregion */

/* #region  - Delete movie */
export const deleteMovie = createAsyncThunk(
  "movie/deleteMovie",
  async (movieId: string, thunkApi) => {
    try {
      token = getCookie("token");
      const response = await axios.delete(`${server.api}/movies/${movieId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      alertSuccess("Deleted movie");
      return response.data.data;
    } catch (error: any) {
      alertError("Failed to delete movie");
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
/* #endregion */

/* #region  - Edit movie */
export const editMovie = createAsyncThunk(
  "movie/editMovie",
  async (
    {
      movieId,
      imgUrl,
      cost,
    }: { movieId: string; imgUrl: string; cost: string },
    thunkApi
  ) => {
    try {
      token = getCookie("token");
      const response = await axios.patch(
        `${server.api}/movies/${movieId}`,
        {
          imgUrl,
          cost: parseInt(cost),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alertSuccess("Movie updated");
      return response.data.data;
    } catch (error: any) {
      alertError("Failed to update movie");
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
/* #endregion */

/* #region  - Get pending reviews */
export const getPendingReviews = createAsyncThunk(
  "movies/getPendingReviews",
  async (args, thunkApi) => {
    try {
      token = getCookie("token");
      const response = await axios.get(`${server.api}/reviews/pending`, {
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

const movie = createSlice({
  name: "movie",
  initialState,
  reducers: {
    searchActor(state) {
      state.searchBy = "actor";
      state.searched = [];
    },
    searchMovie(state) {
      state.searchBy = "movie";
      state.searched = [];
    },
    clearMovieState(state) {
      state.selected = {};
      state.selectedActors = [];
      state.reviews = [];
      state.yourReview = {};
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

    /* #region - Add a movie*/
    builder.addCase(addMovie.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addMovie.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(addMovie.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    /* #endregion */

    /* #region - Delete movie*/
    builder.addCase(deleteMovie.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      deleteMovie.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = "";
      }
    );
    builder.addCase(deleteMovie.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    /* #endregion */

    /* #region - Edit movie*/
    builder.addCase(editMovie.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      editMovie.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = "";
      }
    );
    builder.addCase(editMovie.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    /* #endregion */
  },
});

export const { searchActor, searchMovie, clearMovieState } = movie.actions;

export default movie.reducer;
