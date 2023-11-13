import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface MaterialProps {
  id: string;
  imgUrl: string;
  name: string;
  quantity?: number;
  unitId: string;
  createdAt: Date;
  updatedAt: Date;
  unit  : {
    id: string;
    name: string;
  };
}

export const getMaterial = createAsyncThunk<MaterialProps[]>(
  "material/getMaterial",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/material')
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getMaterialById = createAsyncThunk<MaterialProps, string>(
  "material/getMaterialById",
  async(item, thunkAPI) => {
    try {
      const response = await axios.get(`/api/material/${item}`)
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)


export const addMaterial = createAsyncThunk<MaterialProps, Partial<MaterialProps>>(
  "material/addmaterial",
  async(item, thunkAPI) => {
    try {
      const response = await axios.post('/api/material', item)
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)

export const editMaterial = createAsyncThunk<MaterialProps, Partial<MaterialProps>>(
  "material/editmaterial",
  async (item, thunkAPI) => {
    try {
      const response = await axios.post(`/api/material/${item.id}`, item);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteMaterial = createAsyncThunk<MaterialProps, Partial<MaterialProps>>(
  "material/deleteMaterial",
  async (item, thunkAPI) => {
    try {
      const response = await axios.delete(`/api/material/${item.id}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

interface MaterialStateProps {
  data: MaterialProps[];
  isLoading: boolean;
  error: string | undefined;
}

const initialState: MaterialStateProps = {
  data: [],
  isLoading: false,
  error: undefined,
};

const materialSlice = createSlice({
  name: "material",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getMaterial.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    })
    .addCase(getMaterial.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(getMaterial.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message
    })
    .addCase(getMaterialById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = [action.payload]
    })
    .addCase(getMaterialById.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(getMaterialById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message
    })
    .addCase(addMaterial.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = [...state.data, action.payload];
    })
    .addCase(addMaterial.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(addMaterial.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message
    })
    .addCase(editMaterial.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = state.data.filter(material => material.id !== action.payload.id);
    })
    .addCase(editMaterial.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(editMaterial.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    })
    .addCase(deleteMaterial.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = state.data.filter(material => material.id !== action.payload.id);
    })
    .addCase(deleteMaterial.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(deleteMaterial.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default materialSlice.reducer;