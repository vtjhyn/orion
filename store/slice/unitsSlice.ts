"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Unit {
  id: number;
  name: string;
}

export const getUnits = createAsyncThunk<Unit[]>(
  "units/getUnits",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/unit", {});
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        message: error.response.data.message,
      });
    }
  }
);

const unitsSlice = createSlice({
  name: "units",
  initialState: [] as Unit[],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUnits.fulfilled, (state: any, action) => {
      state.action.payload;
    });
  },
});

export default unitsSlice.reducer;
