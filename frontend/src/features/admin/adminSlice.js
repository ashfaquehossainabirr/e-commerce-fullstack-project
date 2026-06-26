import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

export const fetchStats = createAsyncThunk(
  "admin/fetchStats",
  async () => {
    const res = await API.get("/admin/stats");
    return res.data;
  }
);

export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async () => {
    const res = await API.get("/admin/users");
    return res.data;
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    stats: {},
    users: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.stats = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      });
  },
});

export default adminSlice.reducer;