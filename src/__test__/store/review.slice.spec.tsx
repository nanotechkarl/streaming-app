import { getPendingReviews } from "../../store/movie.slice";
import reducer, {
  approvePendingReview,
  getMovieReviews,
  getmyReviewMovie,
} from "../../store/review.slice";
import { ReviewState } from "../../store/types";
import {
  actorsMock,
  currentUserMock,
  pendingReviewsMock,
} from "../components/mockValues";

describe("Review Slice ExtraReducers", () => {
  const initialState: ReviewState = {
    loading: false,
    reviews: [],
    yourReview: {},
    pendingReviews: [],
    error: "",
  };

  describe("getMovieReviews", () => {
    it("pending", () => {
      const action = { type: getMovieReviews.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: true,
        reviews: [],
        yourReview: {},
        pendingReviews: [],
        error: "",
      });
    });

    it("fulfilled", () => {
      const action = {
        type: getMovieReviews.fulfilled.type,
        payload: pendingReviewsMock,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        reviews: pendingReviewsMock,
        yourReview: {},
        pendingReviews: [],
        error: "",
      });
    });

    it("rejected", () => {
      const action = {
        type: getMovieReviews.rejected.type,
        error: { message: "error" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        reviews: [],
        yourReview: {},
        pendingReviews: [],
        error: "error",
      });
    });
  });

  describe("getPendingReviews", () => {
    it("getPendingReviews", () => {
      const action = { type: getPendingReviews.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: true,
        reviews: [],
        yourReview: {},
        pendingReviews: [],
        error: "",
      });
    });

    it("fulfilled", () => {
      const action = {
        type: getPendingReviews.fulfilled.type,
        payload: pendingReviewsMock,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        reviews: [],
        yourReview: {},
        pendingReviews: pendingReviewsMock,
        error: "",
      });
    });

    it("rejected", () => {
      const action = {
        type: getPendingReviews.rejected.type,
        error: { message: "error" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        reviews: [],
        yourReview: {},
        pendingReviews: [],
        error: "error",
      });
    });
  });

  describe("getmyReviewMovie", () => {
    it("pending", () => {
      const action = { type: getmyReviewMovie.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: true,
        reviews: [],
        yourReview: {},
        pendingReviews: [],
        error: "",
      });
    });

    it("fulfilled", () => {
      const action = {
        type: getmyReviewMovie.fulfilled.type,
        payload: currentUserMock,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        reviews: [],
        yourReview: currentUserMock,
        pendingReviews: [],
        error: "",
      });
    });

    it("rejected", () => {
      const action = {
        type: getmyReviewMovie.rejected.type,
        error: { message: "error" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        reviews: [],
        yourReview: {},
        pendingReviews: [],
        error: "error",
      });
    });
  });

  describe("approvePendingReview", () => {
    it("pending", () => {
      const action = { type: approvePendingReview.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: true,
        reviews: [],
        yourReview: {},
        pendingReviews: [],
        error: "",
      });
    });

    it("fulfilled", () => {
      const action = {
        type: approvePendingReview.fulfilled.type,
        payload: actorsMock,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        reviews: [],
        yourReview: {},
        pendingReviews: [],
        error: "",
      });
    });

    it("rejected", () => {
      const action = {
        type: approvePendingReview.rejected.type,
        error: { message: "error" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        reviews: [],
        yourReview: {},
        pendingReviews: [],
        error: "error",
      });
    });
  });
});
