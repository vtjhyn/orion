import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface RoleProps {
  id: number;
  name: string;
}

export const getRole = createAsyncThunk<RoleProps[]>(
  "role/getRole",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/role");
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

interface RoleStateProps {
  data: RoleProps[];
  isLoading: boolean;
  error: string | undefined;
}

const initialState: RoleStateProps = {
  data: [],
  isLoading: false,
  error: undefined,
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getRole.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getRole.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
  },
});

export default roleSlice.reducer;
