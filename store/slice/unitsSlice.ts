import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface UnitProps {
  id: number;
  name: string;
}

export const getUnit = createAsyncThunk<UnitProps[]>(
  "unit/getUnit",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/unit");
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addUnit = createAsyncThunk<UnitProps, Partial<UnitProps>>(
  "unit/addUnit",
  async (item, thunkAPI) => {
    try {
      const response = await axios.post("/api/unit", { name: item });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editUnit = createAsyncThunk<UnitProps, Partial<UnitProps>>(
  "unit/editUnit",
  async(item, thunkAPI) => {
    try {
      const response = await axios.put("/api/unit", { name: item });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)

interface UnitStateProps {
  data: UnitProps[];
  isLoading: boolean;
  error: string | undefined;
}

const initialState: UnitStateProps = {
  data: [],
  isLoading: false,
  error: undefined,
};

const unitSlice = createSlice({
  name: "unit",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUnit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getUnit.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUnit.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addUnit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = [...state.data, action.payload];
      })
      .addCase(addUnit.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addUnit.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(editUnit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = [...state.data, action.payload];
      })
      .addCase(editUnit.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(editUnit.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
  },
});

export default unitSlice.reducer;
