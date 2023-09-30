import { createSlice, createAsyncThunk, SerializedError } from "@reduxjs/toolkit";
import axios from "axios";

export interface CategoryProps {
  id: number;
  name: string;
}

export const getCategory = createAsyncThunk<CategoryProps[]>(
  "category/getCategory",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/category')
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addCategory = createAsyncThunk<CategoryProps, Partial<CategoryProps>>(
  "category/addCategory",
  async (item, thunkAPI) => {
    try {
      const response = await axios.post("/api/category", {name: item});
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editCategory = createAsyncThunk<CategoryProps, Partial<CategoryProps>>(
  "category/editCategory",
  async (item, thunkAPI) => {
    try {
      const response = await axios.put("/api/category", {name: item});
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)

interface CategoryStateProps {
  data: CategoryProps[];
  isLoading: boolean;
  error: string | undefined;
}

const initialState: CategoryStateProps = {
  data: [],
  isLoading: false,
  error: undefined,
}

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    })
    .addCase(getCategory.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(getCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message
    })
    .addCase(addCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = [...state.data, action.payload];
    })
    .addCase(addCategory.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(addCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message
    })
    .addCase(editCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = [...state.data, action.payload];
    })
    .addCase(editCategory.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(editCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message
    })
  },
});

export default categorySlice.reducer;
