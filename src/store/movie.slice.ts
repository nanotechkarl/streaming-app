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
  error: "",
};
/* #endregion */

/* #region - GET */
export const getMovies = createAsyncThunk(
  "user/getMovies",
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

const userSlice = createSlice({
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
  },
});

export const { searchActor, searchMovie } = userSlice.actions;

export default userSlice.reducer;
