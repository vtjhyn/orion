import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
      const response = await axios.post(`/api/category/${item.id}`, {name: item.name});
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)

export const deleteCategory = createAsyncThunk<CategoryProps, Partial<CategoryProps>>(
  "category/deleteCategory",
  async (item, thunkAPI) => {
    try {
      const response = await axios.delete(`/api/category/${item.id}`);
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
        const updatedCategory = action.payload;
        const updatedData = state.data.map((category) =>
          category.id === updatedCategory.id ? updatedCategory : category
        );
        state.data = updatedData;
    })
    .addCase(editCategory.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(editCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message
    })
    .addCase(deleteCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = state.data.filter(category => category.id !== action.payload.id);
    })
    .addCase(deleteCategory.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(deleteCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default categorySlice.reducer;
