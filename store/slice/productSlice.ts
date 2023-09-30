import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ProductProps {
  id: string;
  name: string;
  description: string | null;
  price: number;
  quantity: number;
  unitId: string;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
  unit: {
    id: string;
    name: string;
  };
  category: {
    id: string;
    name: string;
  };
}

export const getProduct = createAsyncThunk<ProductProps[]>(
  "product/getProduct",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/product')
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addProduct = createAsyncThunk<ProductProps, Partial<ProductProps>>(
  "product/addproduct",
  async(item, thunkAPI) => {
    try {
      const response = await axios.post('/api/product', item)
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)

const initialState = {
  data: [] as ProductProps[],
  isLoading: false,
  error: null,
} as any;

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    })
    .addCase(getProduct.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(getProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message
    })
    .addCase(addProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    })
    .addCase(addProduct.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(addProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message
    })
  },
});

export default productSlice.reducer;