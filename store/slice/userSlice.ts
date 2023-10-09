import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface UserProps {
  id: string;
  name: string;
  email: string;
  password?: string;
  hashedPassword?: string
  roleId: string;
  createdAt: Date;
  updatedAt: Date;
  role  : {
    id: string;
    name: string;
  };
}

export const getUser = createAsyncThunk<UserProps[]>(
  "user/getUser",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/user')
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getUserById = createAsyncThunk<UserProps, string>(
  "user/getUserById",
  async(item, thunkAPI) => {
    try {
      const response = await axios.get(`/api/user/${item}`)
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)


export const addUser = createAsyncThunk<UserProps, Partial<UserProps>>(
  "user/addUser",
  async(item, thunkAPI) => {
    try {
      const response = await axios.post('/api/user', item)
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)

export const editUser = createAsyncThunk<UserProps, Partial<UserProps>>(
  "user/editUser",
  async (item, thunkAPI) => {
    try {
      const response = await axios.post(`/api/user/${item.id}`, item);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk<UserProps, Partial<UserProps>>(
  "user/deleteUser",
  async (item, thunkAPI) => {
    try {
      const response = await axios.delete(`/api/user/${item.id}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

interface UserStateProps {
  data: UserProps[];
  isLoading: boolean;
  error: string | undefined;
}

const initialState: UserStateProps = {
  data: [],
  isLoading: false,
  error: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    })
    .addCase(getUser.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(getUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message
    })
    .addCase(getUserById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = [action.payload]
    })
    .addCase(getUserById.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(getUserById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message
    })
    .addCase(addUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = [...state.data, action.payload];
    })
    .addCase(addUser.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(addUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message
    })
    .addCase(editUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = state.data.filter(user => user.id !== action.payload.id);
    })
    .addCase(editUser.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(editUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    })
    .addCase(deleteUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = state.data.filter(user => user.id !== action.payload.id);
    })
    .addCase(deleteUser.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(deleteUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;