import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import authApi from "../api/authApi";
import User from "../models/user.model";
import { AxiosError } from "axios";

export const login = createAsyncThunk(
  "users/login",
  async (loginData: User, { rejectWithValue }) => {
    try {
      const res = await authApi.login(loginData);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }

    // // console.log(res);

    // if (res.status < 200 || res.status > 300) {
    //   return rejectWithValue(res.data);
    // }

    // return res.data;
  }
);

export const _register = createAsyncThunk(
  "users/register",
  async (loginData: User, { rejectWithValue }) => {
    // const res = await authApi.register(loginData);
    // // console.log(res);

    // return res.data;
    try {
      const res = await authApi.register(loginData);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
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
    logout(state, action) {
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
        // console.log(action);

        state.user = action.payload.user;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(login.rejected, (state, action:any) => {
        state.isLoading = false;
        state.isError = true;
        console.log(action.payload);
        
        
        state.errorMessage = action.payload.message;
      })
      .addCase(_register.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(_register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        
        
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(_register.rejected, (state, action:any) => {
        state.isLoading = false;
        state.errorMessage = state.errorMessage = action.payload.mesage;
      });
  },
});

const { reducer, actions } = userSlice;

export const { logout } = actions;

export default reducer;
