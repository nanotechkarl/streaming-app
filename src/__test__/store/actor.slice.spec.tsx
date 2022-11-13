import reducer, {
  addActor,
  addActorToMovie,
  deleteCelebrity,
  editActor,
  getActor,
  getAllActors,
  getAllActorsByMovie,
  getMoviesOfActor,
  searchActors,
} from "../../store/actor.slice";
import { ActorState } from "../../store/types";
import {
  actorSelectedMock,
  actorsMock,
  moviesMock,
} from "../components/mockValues";

describe("Actor Slice ExtraReducers", () => {
  const initialState: ActorState = {
    loading: false,
    error: "",
    actors: [],
    moviesOfActor: [],
    actorSelected: {},
    searched: [],
    selectedActors: [],
  };

  describe("addActor", () => {
    it("pending", () => {
      const action = { type: addActor.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: true,
        error: "",
        actors: [],
        moviesOfActor: [],
        actorSelected: {},
        searched: [],
        selectedActors: [],
      });
    });

    it("fulfilled", () => {
      const action = { type: addActor.fulfilled.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        error: "",
        actors: [],
        moviesOfActor: [],
        actorSelected: {},
        searched: [],
        selectedActors: [],
      });
    });

    it("rejected", () => {
      const action = {
        type: addActor.rejected.type,
        error: { message: "error" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        error: "error",
        actors: [],
        moviesOfActor: [],
        actorSelected: {},
        searched: [],
        selectedActors: [],
      });
    });
  });

  describe("addActorToMovie", () => {
    it("pending", () => {
      const action = { type: addActorToMovie.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: true,
        error: "",
        actors: [],
        moviesOfActor: [],
        actorSelected: {},
        searched: [],
        selectedActors: [],
      });
    });

    it("fulfilled", () => {
      const action = { type: addActorToMovie.fulfilled.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        error: "",
        actors: [],
        moviesOfActor: [],
        actorSelected: {},
        searched: [],
        selectedActors: [],
      });
    });

    it("rejected", () => {
      const action = {
        type: addActorToMovie.rejected.type,
        error: { message: "error" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        error: "error",
        actors: [],
        moviesOfActor: [],
        actorSelected: {},
        searched: [],
        selectedActors: [],
      });
    });
  });

  describe("getAllActors", () => {
    it("pending", () => {
      const action = { type: getAllActors.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: true,
        actors: [],
        moviesOfActor: [],
        actorSelected: {},
        searched: [],
        selectedActors: [],
        error: "",
      });
    });

    it("fulfilled", () => {
      const action = { type: getAllActors.fulfilled.type, payload: actorsMock };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        actors: actorsMock,
        moviesOfActor: [],
        actorSelected: {},
        searched: [],
        selectedActors: [],
        error: "",
      });
    });

    it("rejected", () => {
      const action = {
        type: getAllActors.rejected.type,
        error: { message: "error" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        error: "error",
        actors: [],
        moviesOfActor: [],
        actorSelected: {},
        searched: [],
        selectedActors: [],
      });
    });
  });

  describe("getAllActorsOfMovie", () => {
    it("pending", () => {
      const action = { type: getAllActorsByMovie.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: true,
        error: "",
        actors: [],
        moviesOfActor: [],
        actorSelected: {},
        searched: [],
        selectedActors: [],
      });
    });

    it("fulfilled", () => {
      const action = {
        type: getAllActorsByMovie.fulfilled.type,
        payload: actorsMock,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        error: "",
        actors: [],
        selectedActors: actorsMock,
        moviesOfActor: [],
        actorSelected: {},
        searched: [],
      });
    });

    it("rejected", () => {
      const action = {
        type: getAllActorsByMovie.rejected.type,
        error: { message: "error" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        error: "error",
        actors: [],
        selectedActors: [],
        moviesOfActor: [],
        actorSelected: {},
        searched: [],
      });
    });
  });

  describe("deleteActor", () => {
    it("pending", () => {
      const action = { type: deleteCelebrity.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: true,
        actors: [],
        moviesOfActor: [],
        actorSelected: {},
        searched: [],
        selectedActors: [],
        error: "",
      });
    });

    it("fulfilled", () => {
      const action = {
        type: deleteCelebrity.fulfilled.type,
        payload: actorsMock,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        error: "",
        moviesOfActor: [],
        actorSelected: {},
        searched: [],
        selectedActors: [],
        actors: [],
      });
    });

    it("rejected", () => {
      const action = {
        type: deleteCelebrity.rejected.type,
        error: { message: "error" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        error: "error",
        actors: [],
        moviesOfActor: [],
        actorSelected: {},
        searched: [],
        selectedActors: [],
      });
    });
  });

  describe("editActor", () => {
    it("pending", () => {
      const action = { type: editActor.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: true,
        actors: [],
        moviesOfActor: [],
        actorSelected: {},
        searched: [],
        selectedActors: [],
        error: "",
      });
    });

    it("fulfilled", () => {
      const action = {
        type: editActor.fulfilled.type,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        error: "",
        moviesOfActor: [],
        actorSelected: {},
        searched: [],
        selectedActors: [],
        actors: [],
      });
    });

    it("rejected", () => {
      const action = {
        type: editActor.rejected.type,
        error: { message: "error" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        error: "error",
        actors: [],
        moviesOfActor: [],
        actorSelected: {},
        searched: [],
        selectedActors: [],
      });
    });
  });

  describe("searchActors", () => {
    it("pending", () => {
      const action = { type: searchActors.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: true,
        actors: [],
        moviesOfActor: [],
        actorSelected: {},
        searched: [],
        selectedActors: [],
        error: "",
      });
    });

    it("fulfilled", () => {
      const action = {
        type: searchActors.fulfilled.type,
        payload: actorsMock,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        error: "",
        moviesOfActor: [],
        actorSelected: {},
        searched: actorsMock,
        selectedActors: [],
        actors: [],
      });
    });

    it("rejected", () => {
      const action = {
        type: searchActors.rejected.type,
        error: { message: "error" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        error: "error",
        actors: [],
        moviesOfActor: [],
        actorSelected: {},
        searched: [],
        selectedActors: [],
      });
    });
  });

  describe("getAllMoviesOfActor", () => {
    it("pending", () => {
      const action = { type: getMoviesOfActor.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: true,
        actors: [],
        moviesOfActor: [],
        actorSelected: {},
        searched: [],
        selectedActors: [],
        error: "",
      });
    });

    it("fulfilled", () => {
      const action = {
        type: getMoviesOfActor.fulfilled.type,
        payload: moviesMock,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        error: "",
        moviesOfActor: moviesMock,
        actorSelected: {},
        searched: [],
        selectedActors: [],
        actors: [],
      });
    });

    it("rejected", () => {
      const action = {
        type: getMoviesOfActor.rejected.type,
        error: { message: "error" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        error: "error",
        actors: [],
        moviesOfActor: [],
        actorSelected: {},
        searched: [],
        selectedActors: [],
      });
    });
  });

  describe("getActor", () => {
    it("pending", () => {
      const action = { type: getActor.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: true,
        actors: [],
        moviesOfActor: [],
        actorSelected: {},
        searched: [],
        selectedActors: [],
        error: "",
      });
    });

    it("fulfilled", () => {
      const action = {
        type: getActor.fulfilled.type,
        payload: actorSelectedMock,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        error: "",
        moviesOfActor: [],
        actorSelected: actorSelectedMock,
        searched: [],
        selectedActors: [],
        actors: [],
      });
    });

    it("rejected", () => {
      const action = {
        type: getActor.rejected.type,
        error: { message: "error" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        error: "error",
        actors: [],
        moviesOfActor: [],
        actorSelected: {},
        searched: [],
        selectedActors: [],
      });
    });
  });
});
