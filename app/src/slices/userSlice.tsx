import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface LoginData  {
  email: string,
  password: string
}

export const login = createAsyncThunk(
  "users/login",
  async (loginData:LoginData, { rejectWithValue }) => {
    const res = await axios.post("https://reqres.in/api/login", loginData);
    
    return res.data;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    isLoading: false,
    user: null,
    errorMessage: "",
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
      state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = "Không thành công"
      })
  }
});

const { reducer, actions } = userSlice;

export const { } = actions;

export default reducer;
