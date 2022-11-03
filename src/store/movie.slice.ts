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
  actors: [],
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
      const response = await axios.post(
        `${server.api}/movies`,
        {
          title,
          description,
          imgUrl,
          cost,
          yearRelease,
        },
        { headers }
      );

      if (response.data.message.includes("exist")) {
        alert("Movie title already exists");
        return;
      }

      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
/* #endregion */

/* #region  - Add Actor */
export const addActor = createAsyncThunk(
  "movie/addActor",
  async (
    {
      firstName,
      lastName,
      gender,
      age,
    }: {
      firstName: string;
      lastName: string;
      gender: string;
      age: number;
    },
    thunkApi
  ) => {
    try {
      const response = await axios.post(
        `${server.api}/actor-details`,
        {
          firstName,
          lastName,
          gender,
          age,
        },
        { headers }
      );

      if (response.data.message.includes("exist")) {
        alert("Actor already exists");
        return;
      }

      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
/* #endregion */

/* #region  - Add Actor to movie */
export const addActorToMovie = createAsyncThunk(
  "movie/addActorToMovie",
  async (
    {
      movieId,
      actorDetailsId,
    }: {
      movieId: string;
      actorDetailsId: string;
    },
    thunkApi
  ) => {
    try {
      const response = await axios.post(
        `${server.api}/actors`,
        {
          movieId,
          actorDetailsId,
        },
        { headers }
      );

      if (response.data.message.includes("exist")) {
        return;
      }

      return response.data.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
/* #endregion */

/* #region  - get All actors */
export const getAllActors = createAsyncThunk(
  "movie/getAllActors",
  async (args, thunkApi) => {
    try {
      const response = await axios.get(`${server.api}/actor-details`);

      return response.data.data;
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
      const response = await axios.delete(`${server.api}/movies/${movieId}`, {
        headers,
      });

      return response.data.data;
    } catch (error: any) {
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
      const response = await axios.patch(
        `${server.api}/movies/${movieId}`,
        {
          imgUrl,
          cost: parseInt(cost),
        },
        {
          headers,
        }
      );

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

    /* #region - Add Actor*/
    builder.addCase(addActor.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addActor.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(addActor.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    /* #endregion */

    /* #region - Add Actor to movie*/
    builder.addCase(addActorToMovie.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      addActorToMovie.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = "";
      }
    );
    builder.addCase(addActorToMovie.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    /* #endregion */

    /* #region - Get all actors*/
    builder.addCase(getAllActors.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getAllActors.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.actors = action.payload;
        state.error = "";
      }
    );
    builder.addCase(getAllActors.rejected, (state, action) => {
      state.loading = false;
      state.actors = [];
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

export const { searchActor, searchMovie } = movie.actions;

export default movie.reducer;
