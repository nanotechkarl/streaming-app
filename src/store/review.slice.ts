import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { server, getCookie } from "../utils/global";
import { ReviewState } from "./types";

//#region - Token
let token: string = getCookie("token");
let headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};
//#endregion

/* #region  - Initial state */
const initialState: ReviewState = {
  loading: false,
  reviews: [],
  yourReview: {},
  pendingReviews: [],
  error: "",
};
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

/* #region  - Add a movie review or rating*/
export const addMovieReview = createAsyncThunk(
  "movie/addMovieReview",
  async (
    {
      movieId,
      message,
      rating,
      datePosted,
      name,
    }: {
      movieId: string;
      message?: string;
      rating?: number;
      datePosted?: Date;
      name?: string;
    },
    thunkApi
  ) => {
    try {
      token = getCookie("token");
      const response = await axios.put(
        `${server.api}/reviews`,
        {
          movieId,
          message,
          datePosted,
          rating,
          name,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
/* #endregion */

/* #region  - Get own review of movie */
export const getmyReviewMovie = createAsyncThunk(
  "movie/getmyReviewMovie",
  async (movieId: string, thunkApi) => {
    try {
      token = getCookie("token");
      const response = await axios.get(
        `${server.api}/reviews/${movieId}/myReview`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (error: any) {
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

/* #region  - Approve pending reviews */
export const approvePendingReview = createAsyncThunk(
  "movies/approvePendingReview",
  async (reviewId: string, thunkApi) => {
    try {
      token = getCookie("token");
      const response = await axios.patch(
        `${server.api}/reviews/${reviewId}`,
        {
          approved: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
/* #endregion */

const review = createSlice({
  name: "review",
  initialState,
  reducers: {
    clearReviewState(state) {
      state.reviews = [];
      state.yourReview = {};
    },
  },
  extraReducers: (builder) => {
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

    /* #region - Get pending reviews*/
    builder.addCase(getPendingReviews.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getPendingReviews.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.pendingReviews = action.payload;
        state.error = "";
      }
    );
    builder.addCase(getPendingReviews.rejected, (state, action) => {
      state.loading = false;
      state.pendingReviews = [];
      state.error = action.error.message;
    });
    /* #endregion */

    /* #region - Get own review of movie */
    builder.addCase(getmyReviewMovie.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getmyReviewMovie.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.yourReview = action.payload;
        state.error = "";
      }
    );
    builder.addCase(getmyReviewMovie.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    /* #endregion */

    /* #region - Approve pending reviews */
    builder.addCase(approvePendingReview.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      approvePendingReview.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = "";
      }
    );
    builder.addCase(approvePendingReview.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    /* #endregion */
  },
});

export const { clearReviewState } = review.actions;

export default review.reducer;
