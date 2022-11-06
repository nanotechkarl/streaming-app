import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import storage from "redux-persist/lib/storage";
import { server, getCookie, alertError } from "../utils/global";
import { UserState } from "./types";
import Swal from "sweetalert2";

//#region - Token
let token: string = getCookie("token");
let headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};
//#endregion

/* #region  - Initial state */
const initialState: UserState = {
  loading: false,
  accounts: [],
  current: {},
  error: "",
};
/* #endregion */

/* #region - Login/Register */
export const loginUser = createAsyncThunk(
  "user/login",
  async (
    { email, password }: { email: string; password: string },
    thunkApi
  ) => {
    try {
      const response = await axios.post(
        `${server.api}/users/login`,
        { email, password },
        { headers }
      );

      const result = response.data.data;

      document.cookie = `token=${result.token}; max-age=${60 * 60 * 24 * 14}`; //2 weeks
      return {
        email: result.email,
        id: result.id,
        name: result.name,
        permissions: result.permissions,
      };
    } catch (error: any) {
      if (error.response.data.message.includes("approved")) {
        alertError(error.response?.data?.message);
      } else {
        alertError("Wrong email or password");
      }
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (
    {
      firstName,
      lastName,
      email,
      password,
      permissions,
    }: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      permissions: string[];
    },
    thunkApi
  ) => {
    try {
      const response = await axios.post(
        `${server.api}/users/register`,
        { firstName, lastName, email, password, permissions },
        { headers }
      );

      if (response.data.message.includes("exist")) {
        alertError("User already exists");
        return;
      }

      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
/* #endregion */

/* #region - GET */
export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (arg, thunkApi) => {
    try {
      token = getCookie("token");
      const response = await axios.get(`${server.api}/users`, {
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

export const getUserObject = createAsyncThunk(
  "user/myProperties",
  async (arg, thunkApi) => {
    try {
      token = getCookie("token");
      const response = await axios.get(`${server.api}/users/property`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = response.data;
      return result;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getUserById = createAsyncThunk(
  "user/getUserById",
  async ({ id }: { id: number }, thunkApi) => {
    try {
      const response = await axios.get(`${server.api}/users/property/${id}`, {
        headers,
      });
      const result = response.data;

      return result;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
/* #endregion */

/* #region - Edit/Delete */
export const editUser = createAsyncThunk(
  "user/editUser",
  async (
    { id, fullName, email }: { id: number; fullName: string; email: string },
    thunkApi
  ) => {
    try {
      const response = await axios.put(
        `${server.api}/users/${id}`,
        { fullName, email },
        {
          headers,
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteUserById = createAsyncThunk(
  "user/deleteUser",
  async ({ id }: { id: number }, thunkApi) => {
    try {
      const response = await axios.delete(`${server.api}/users/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
/* #endregion */

/* #region  -  Approval*/
export const approveUser = createAsyncThunk(
  "user/approveUser",
  async (
    { userId, approved }: { userId: string; approved: boolean },
    thunkApi
  ) => {
    try {
      const response = await axios.patch(
        `${server.api}/users/approval/${userId}`,
        { approved },
        {
          headers,
        }
      );

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
/* #endregion */

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clear() {
      storage.removeItem("persist:root");
    },
    clearUserState(state) {
      state.current = {};
    },
  },
  extraReducers: (builder) => {
    /* #region - Login */
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.current = action.payload;
        state.error = "";
      }
    );
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.current = {};
      state.error = action.error.message;
    });
    /* #endregion */

    /* #region - Register */
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    /* #endregion */

    /* #region - Get users */
    builder.addCase(getUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.accounts = action.payload;
      state.error = "";
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.loading = false;
      state.accounts = [];
      state.error = action.error.message;
    });
    /* #endregion */

    /* #region - Get current user */
    builder.addCase(getUserObject.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getUserObject.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.current = action.payload;
        state.error = "";
      }
    );
    builder.addCase(getUserObject.rejected, (state, action) => {
      state.loading = false;
      state.current = {};
      state.error = action.error.message;
    });
    /* #endregion */

    /* #region - Get user by ID */
    builder.addCase(getUserById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getUserById.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = "";
      }
    );
    builder.addCase(getUserById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    /* #endregion */

    /* #region - Delete user */
    builder.addCase(deleteUserById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      deleteUserById.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = "";
      }
    );
    builder.addCase(deleteUserById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    /* #endregion */

    /* #region - Approve user */
    builder.addCase(approveUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      approveUser.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = "";
      }
    );
    builder.addCase(approveUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    /* #endregion */
  },
});

export const { clear, clearUserState } = userSlice.actions;
export default userSlice.reducer;
