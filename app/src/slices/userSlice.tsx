import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import authApi from "../api/authApi";
import User from "../models/user.model";
import { AxiosError } from "axios";

export interface MyData {
  success: boolean;
  message: string;
  user: User;
}

interface ErrorData {
  message: string;
  success: boolean;
}
export const login = createAsyncThunk<MyData, User>(
  "users/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const res = await authApi.login(loginData);

      return res.data as MyData;
    } catch (err: any) {
      let _err = (err as AxiosError)
      
      return rejectWithValue(_err.response?.data as ErrorData);
    }
  }
);

export const _register = createAsyncThunk(
  "users/register",
  async (loginData: User, { rejectWithValue }) => {
    try {
      const res = await authApi.register(loginData);
      return res.data as MyData;
    } catch (err: any) {
      return rejectWithValue(err.response.data as ErrorData);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    isLoading: false,
    user: JSON.parse(localStorage.getItem("user") || "null"),
    errorMessage: "",
    isError: false,
  },
  reducers: {
    logout(state) {
      console.log("user log out");

      localStorage.removeItem("user");
      state.user = null;
      state.isError = false;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        // console.log(action.payload.);

        state.user = action.payload.user;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(login.rejected, (state, action:any) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload.message;
      })
      .addCase(_register.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(_register.fulfilled,(state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;

        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(_register.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload.message;
      });
  },
});

const { reducer, actions } = userSlice;

export const { logout } = actions;

export default reducer;
