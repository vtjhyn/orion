import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface ProductProps {
  id: string;
  imgUrl: string;
  name: string;
  description?: string;
  cost?: string;
  quantity?: number;
  unitId: string;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
  unit  : {
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

export const getProductById = createAsyncThunk<ProductProps, string>(
  "product/getProductById",
  async(item, thunkAPI) => {
    try {
      const response = await axios.get(`/api/product/${item}`)
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)


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

export const editProduct = createAsyncThunk<ProductProps, Partial<ProductProps>>(
  "product/editProduct",
  async (item, thunkAPI) => {
    try {
      const response = await axios.post(`/api/product/${item.id}`, item);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk<ProductProps, Partial<ProductProps>>(
  "product/deleteProduct",
  async (item, thunkAPI) => {
    try {
      const response = await axios.delete(`/api/product/${item.id}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

interface ProductStateProps {
  data: ProductProps[];
  isLoading: boolean;
  error: string | undefined;
}

const initialState: ProductStateProps = {
  data: [],
  isLoading: false,
  error: undefined,
};

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
    .addCase(getProductById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = [action.payload]
    })
    .addCase(getProductById.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(getProductById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message
    })
    .addCase(addProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = [...state.data, action.payload];
    })
    .addCase(addProduct.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(addProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message
    })
    .addCase(editProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = state.data.filter(product => product.id !== action.payload.id);
    })
    .addCase(editProduct.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(editProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    })
    .addCase(deleteProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = state.data.filter(product => product.id !== action.payload.id);
    })
    .addCase(deleteProduct.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(deleteProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default productSlice.reducer;