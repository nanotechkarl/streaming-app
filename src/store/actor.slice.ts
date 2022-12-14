import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  server,
  getCookie,
  alertError,
  alertSuccess,
  alertWarning,
} from "../utils/global";
import { ActorConnection, Actors, ActorState } from "./types";

//#region - Token
let token = getCookie("token");
//#endregion

/* #region  - Initial state */
const initialState: ActorState = {
  loading: false,
  actors: [],
  moviesOfActor: [],
  actorSelected: {},
  searched: [],
  error: "",
  selectedActors: [],
};
/* #endregion */

/* #region  - Add Actor */
export const addActor = createAsyncThunk(
  "actor/addActor",
  async (
    { firstName, lastName, gender, age, imgUrl }: Partial<Actors>,
    thunkApi
  ) => {
    try {
      token = getCookie("token");
      const ageInt = parseInt(`${age}`);
      const response = await axios.post(
        `${server.api}/actor-details`,
        {
          firstName,
          lastName,
          gender,
          age: ageInt,
          imgUrl,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.message.includes("exist")) {
        alertError("Actor already exists");
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
  "actor/addActorToMovie",
  async ({ movieId, actorDetailsId }: Partial<ActorConnection>, thunkApi) => {
    try {
      token = getCookie("token");
      const response = await axios.post(
        `${server.api}/actors`,
        {
          movieId,
          actorDetailsId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.message.includes("exist")) {
        alertWarning("Actor already exist in the movie");
        return;
      }

      alertSuccess("Added actor to movie");
      return response.data.data;
    } catch (error: any) {
      alertError("Failed to Add actor to movie");
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
/* #endregion */

/* #region  - get All actors */
export const getAllActors = createAsyncThunk(
  "actor/getAllActors",
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

/* #region  - Delete actor */
export const deleteCelebrity = createAsyncThunk(
  "actor/deleteActor",
  async (actorId: string, thunkApi) => {
    try {
      token = getCookie("token");
      const response = await axios.delete(
        `${server.api}/actor-details/${actorId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alertSuccess("Actor deleted");
      return response.data.data;
    } catch (error: any) {
      alertError("Failed to delete actor");
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
/* #endregion */

/* #region  - Edit actor */
export const editActor = createAsyncThunk(
  "actor/editActor",
  async (
    { id, firstName, lastName, gender, age }: Partial<Actors>,
    thunkApi
  ) => {
    try {
      token = getCookie("token");
      const ageInt = parseInt(`${age}`);
      const response = await axios.patch(
        `${server.api}/actor-details/${id}`,
        {
          firstName,
          lastName,
          gender,
          age: ageInt,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alertSuccess("Actor details updated");
      return response.data.data;
    } catch (error: any) {
      alertError("Failed to update");
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
/* #endregion */

/* #region  - Get all actors of movie */
export const getAllActorsByMovie = createAsyncThunk(
  "actor/getAllActorsByMovie",
  async (movieId: string, thunkApi) => {
    try {
      const response = await axios.get(`${server.api}/actors/${movieId}`);
      return response.data.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
/* #endregion */

/* #region  - Get all movies of actor */
export const getMoviesOfActor = createAsyncThunk(
  "actor/getMoviesOfActor",
  async (actorId: string, thunkApi) => {
    try {
      const response = await axios.get(`${server.api}/actor/movies/${actorId}`);
      return response.data.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
/* #endregion */

/* #region  - Get Actor details */
export const getActor = createAsyncThunk(
  "actor/getActor",
  async (actorId: string, thunkApi) => {
    try {
      const response = await axios.get(
        `${server.api}/actor-details/${actorId}`
      );
      return response.data.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
/* #endregion */

/* #region  - Search actors */
export const searchActors = createAsyncThunk(
  "actor/searchActor",
  async (name: string, thunkApi) => {
    try {
      if (!name) {
        return;
      }
      const response = await axios.get(
        `${server.api}/movies/search/actor/${name}`
      );
      return response.data.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
/* #endregion */

const movie = createSlice({
  name: "actor",
  initialState,
  reducers: {
    clearActorState(state) {
      state.selectedActors = [];
      state.actorSelected = {};
      state.moviesOfActor = [];
      state.searched = [];
    },
    clearSearchState(state) {
      state.searched = [];
    },
  },
  extraReducers: (builder) => {
    /* #region - Add Actor*/
    builder.addCase(addActor.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addActor.fulfilled, (state) => {
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
    builder.addCase(addActorToMovie.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(addActorToMovie.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    /* #endregion */

    /* #region - Get all actors*/
    builder.addCase(getAllActors.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllActors.fulfilled, (state, action) => {
      state.loading = false;
      state.actors = action.payload;
      state.error = "";
    });
    builder.addCase(getAllActors.rejected, (state, action) => {
      state.loading = false;
      state.actors = [];
      state.error = action.error.message;
    });
    /* #endregion */

    /* #region - Get all actors by movie*/
    builder.addCase(getAllActorsByMovie.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllActorsByMovie.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedActors = action.payload;
      state.error = "";
    });
    builder.addCase(getAllActorsByMovie.rejected, (state, action) => {
      state.loading = false;
      state.actors = [];
      state.error = action.error.message;
    });
    /* #endregion */

    /* #region - Delete actor*/
    builder.addCase(deleteCelebrity.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCelebrity.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(deleteCelebrity.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    /* #endregion */

    /* #region - Edit actor*/
    builder.addCase(editActor.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editActor.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(editActor.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    /* #endregion */

    /* #region - Search actor*/
    builder.addCase(searchActors.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(searchActors.fulfilled, (state, action) => {
      state.loading = false;
      state.searched = action.payload;
      state.error = "";
    });
    builder.addCase(searchActors.rejected, (state, action) => {
      state.loading = false;
      state.searched = [];
      state.error = action.error.message;
    });
    /* #endregion */

    /* #region - get all movies of actor*/
    builder.addCase(getMoviesOfActor.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMoviesOfActor.fulfilled, (state, action) => {
      state.loading = false;
      state.moviesOfActor = action.payload;
      state.error = "";
    });
    builder.addCase(getMoviesOfActor.rejected, (state, action) => {
      state.loading = false;
      state.moviesOfActor = [];
      state.error = action.error.message;
    });
    /* #endregion */

    /* #region - get actor details*/
    builder.addCase(getActor.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getActor.fulfilled, (state, action) => {
      state.loading = false;
      state.actorSelected = action.payload;
      state.error = "";
    });
    builder.addCase(getActor.rejected, (state, action) => {
      state.loading = false;
      state.actorSelected = {};
      state.error = action.error.message;
    });
    /* #endregion */
  },
});

export const { clearActorState } = movie.actions;

export default movie.reducer;
