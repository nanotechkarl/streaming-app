import reducer, {
  addMovie,
  deleteMovie,
  editMovie,
  getMovieById,
  getMovies,
  searchByMovie,
} from "../../store/movie.slice";
import { MovieState } from "../../store/types";
import {
  actorsMock,
  moviesMock,
  selectedMovieMock,
} from "../components/mockValues";

describe("Movie Slice ExtraReducers", () => {
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

  describe("getMovies", () => {
    it("pending", () => {
      const action = { type: getMovies.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: true,
        movies: [],
        searchBy: "movie",
        searched: [],
        selected: {},
        reviews: [],
        error: "",
        yourReview: {},
        pendingReviews: [],
      });
    });

    it("fulfilled", () => {
      const action = { type: getMovies.fulfilled.type, payload: moviesMock };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        movies: moviesMock,
        searchBy: "movie",
        searched: [],
        selected: {},
        reviews: [],
        error: "",
        yourReview: {},
        pendingReviews: [],
      });
    });

    it("rejected", () => {
      const action = {
        type: getMovies.rejected.type,
        error: { message: "error" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        movies: [],
        searchBy: "movie",
        searched: [],
        selected: {},
        reviews: [],
        error: "error",
        yourReview: {},
        pendingReviews: [],
      });
    });
  });

  describe("addActorToMovie", () => {
    it("searchByMovie", () => {
      const action = { type: searchByMovie.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: true,
        movies: [],
        searchBy: "movie",
        searched: [],
        selected: {},
        reviews: [],
        error: "",
        yourReview: {},
        pendingReviews: [],
      });
    });

    it("fulfilled", () => {
      const action = {
        type: searchByMovie.fulfilled.type,
        payload: moviesMock,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        movies: [],
        searchBy: "movie",
        searched: moviesMock,
        selected: {},
        reviews: [],
        error: "",
        yourReview: {},
        pendingReviews: [],
      });
    });

    it("rejected", () => {
      const action = {
        type: searchByMovie.rejected.type,
        error: { message: "error" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        movies: [],
        searchBy: "movie",
        searched: [],
        selected: {},
        reviews: [],
        error: "error",
        yourReview: {},
        pendingReviews: [],
      });
    });
  });

  describe("getMovieById", () => {
    it("pending", () => {
      const action = { type: getMovieById.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: true,
        movies: [],
        searchBy: "movie",
        searched: [],
        selected: {},
        reviews: [],
        error: "",
        yourReview: {},
        pendingReviews: [],
      });
    });

    it("fulfilled", () => {
      const action = {
        type: getMovieById.fulfilled.type,
        payload: selectedMovieMock,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        movies: [],
        searchBy: "movie",
        searched: [],
        selected: selectedMovieMock,
        reviews: [],
        error: "",
        yourReview: {},
        pendingReviews: [],
      });
    });

    it("rejected", () => {
      const action = {
        type: getMovieById.rejected.type,
        error: { message: "error" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        movies: [],
        searchBy: "movie",
        searched: [],
        selected: {},
        reviews: [],
        error: "error",
        yourReview: {},
        pendingReviews: [],
      });
    });
  });

  describe("addMovie", () => {
    it("pending", () => {
      const action = { type: addMovie.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: true,
        movies: [],
        searchBy: "movie",
        searched: [],
        selected: {},
        reviews: [],
        error: "",
        yourReview: {},
        pendingReviews: [],
      });
    });

    it("fulfilled", () => {
      const action = {
        type: addMovie.fulfilled.type,
        payload: actorsMock,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        movies: [],
        searchBy: "movie",
        searched: [],
        selected: {},
        reviews: [],
        error: "",
        yourReview: {},
        pendingReviews: [],
      });
    });

    it("rejected", () => {
      const action = {
        type: addMovie.rejected.type,
        error: { message: "error" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        movies: [],
        searchBy: "movie",
        searched: [],
        selected: {},
        reviews: [],
        error: "error",
        yourReview: {},
        pendingReviews: [],
      });
    });
  });

  describe("deleteMovie", () => {
    it("pending", () => {
      const action = { type: deleteMovie.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: true,
        movies: [],
        searchBy: "movie",
        searched: [],
        selected: {},
        reviews: [],
        error: "",
        yourReview: {},
        pendingReviews: [],
      });
    });

    it("fulfilled", () => {
      const action = {
        type: deleteMovie.fulfilled.type,
        payload: actorsMock,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        movies: [],
        searchBy: "movie",
        searched: [],
        selected: {},
        reviews: [],
        error: "",
        yourReview: {},
        pendingReviews: [],
      });
    });

    it("rejected", () => {
      const action = {
        type: deleteMovie.rejected.type,
        error: { message: "error" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        movies: [],
        searchBy: "movie",
        searched: [],
        selected: {},
        reviews: [],
        error: "error",
        yourReview: {},
        pendingReviews: [],
      });
    });
  });

  describe("editMovie", () => {
    it("pending", () => {
      const action = { type: editMovie.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: true,
        movies: [],
        searchBy: "movie",
        searched: [],
        selected: {},
        reviews: [],
        error: "",
        yourReview: {},
        pendingReviews: [],
      });
    });

    it("fulfilled", () => {
      const action = {
        type: editMovie.fulfilled.type,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        movies: [],
        searchBy: "movie",
        searched: [],
        selected: {},
        reviews: [],
        error: "",
        yourReview: {},
        pendingReviews: [],
      });
    });

    it("rejected", () => {
      const action = {
        type: editMovie.rejected.type,
        error: { message: "error" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        error: "error",
        movies: [],
        searchBy: "movie",
        searched: [],
        selected: {},
        reviews: [],
        yourReview: {},
        pendingReviews: [],
      });
    });
  });
});
