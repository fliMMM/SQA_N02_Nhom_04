import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../api/authApi";
import User from "../models/user.model";

export const login = createAsyncThunk(
  "users/login",
  async (loginData: User, { rejectWithValue }) => {
    const res = await authApi.login(loginData);
    // console.log(res);


    
    if (res.status < 200 || res.status > 300) {
      return rejectWithValue(res.data)
    }

    return res.data;
  }
);

export const _register = createAsyncThunk(
  "users/register",
  async (loginData: User, { rejectWithValue }) => {
    const res = await authApi.register(loginData);
    // console.log(res);

    return res.data;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    isLoading: false,
    user: localStorage.getItem("user"),
    errorMessage: "",
    isError:false
  },
  reducers: {
    logout(state, action) {
      localStorage.removeItem("user");
      state.user = null;
      state.isError = false;
      state.errorMessage = "";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        // console.log(action);
        
        state.user = action.payload.user;
        localStorage.setItem("user", action.payload.user);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = "Sai tên đăng nhập hoặc mật khẩu!";
      })
      .addCase(_register.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(_register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(_register.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = "Không thành công";
      });
  },
});

const { reducer, actions } = userSlice;

export const {logout} = actions;

export default reducer;
