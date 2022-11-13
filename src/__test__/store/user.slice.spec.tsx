import reducer, {
  approveUser,
  deleteUserById,
  getUserById,
  getUserObject,
  getUsers,
  loginUser,
  registerUser,
} from "../../store/user.slice";
import { UserState } from "../../store/types";
import { currentUserMock, userMock } from "../components/mockValues";

describe("User Slice ExtraReducers", () => {
  const initialState: UserState = {
    loading: false,
    accounts: [],
    current: {},
    error: "",
  };

  describe("loginUser", () => {
    it("pending", () => {
      const action = { type: loginUser.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: true,
        accounts: [],
        current: {},
        error: "",
      });
    });

    it("fulfilled", () => {
      const action = {
        type: loginUser.fulfilled.type,
        payload: currentUserMock,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        accounts: [],
        current: currentUserMock,
        error: "",
      });
    });

    it("rejected", () => {
      const action = {
        type: loginUser.rejected.type,
        error: { message: "error" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        accounts: [],
        current: {},
        error: "error",
      });
    });
  });

  describe("registerUser", () => {
    it("pending", () => {
      const action = { type: registerUser.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: true,
        accounts: [],
        current: {},
        error: "",
      });
    });

    it("fulfilled", () => {
      const action = {
        type: registerUser.fulfilled.type,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        accounts: [],
        current: {},
        error: "",
      });
    });

    it("rejected", () => {
      const action = {
        type: registerUser.rejected.type,
        error: { message: "error" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        accounts: [],
        current: {},
        error: "error",
      });
    });
  });

  describe("getUsers", () => {
    it("pending", () => {
      const action = { type: getUsers.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: true,
        accounts: [],
        current: {},
        error: "",
      });
    });

    it("fulfilled", () => {
      const action = {
        type: getUsers.fulfilled.type,
        payload: userMock,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        accounts: userMock,
        current: {},
        error: "",
      });
    });

    it("rejected", () => {
      const action = {
        type: getUsers.rejected.type,
        error: { message: "error" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        accounts: [],
        current: {},
        error: "error",
      });
    });
  });

  describe("getUserObject", () => {
    it("pending", () => {
      const action = { type: getUserObject.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: true,
        accounts: [],
        current: {},
        error: "",
      });
    });

    it("fulfilled", () => {
      const action = {
        type: getUserObject.fulfilled.type,
        payload: currentUserMock,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        accounts: [],
        current: currentUserMock,
        error: "",
      });
    });

    it("rejected", () => {
      const action = {
        type: getUserObject.rejected.type,
        error: { message: "error" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        accounts: [],
        current: {},
        error: "error",
      });
    });
  });

  describe("getUserById", () => {
    it("pending", () => {
      const action = { type: getUserById.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: true,
        accounts: [],
        current: {},
        error: "",
      });
    });

    it("fulfilled", () => {
      const action = {
        type: getUserById.fulfilled.type,
        payload: currentUserMock,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        accounts: [],
        current: {},
        error: "",
      });
    });

    it("rejected", () => {
      const action = {
        type: getUserById.rejected.type,
        error: { message: "error" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        accounts: [],
        current: {},
        error: "error",
      });
    });
  });

  describe("deleteUserById", () => {
    it("pending", () => {
      const action = { type: deleteUserById.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: true,
        accounts: [],
        current: {},
        error: "",
      });
    });

    it("fulfilled", () => {
      const action = {
        type: deleteUserById.fulfilled.type,
        payload: currentUserMock,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        accounts: [],
        current: {},
        error: "",
      });
    });

    it("rejected", () => {
      const action = {
        type: deleteUserById.rejected.type,
        error: { message: "error" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        accounts: [],
        current: {},
        error: "error",
      });
    });
  });

  describe("approveUser", () => {
    it("pending", () => {
      const action = { type: approveUser.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: true,
        accounts: [],
        current: {},
        error: "",
      });
    });

    it("fulfilled", () => {
      const action = {
        type: approveUser.fulfilled.type,
        payload: currentUserMock,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        accounts: [],
        current: {},
        error: "",
      });
    });

    it("rejected", () => {
      const action = {
        type: approveUser.rejected.type,
        error: { message: "error" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        loading: false,
        accounts: [],
        current: {},
        error: "error",
      });
    });
  });
});
