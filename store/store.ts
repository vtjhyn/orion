'use client'

import { configureStore } from '@reduxjs/toolkit';
import unitReducer from './slice/unitsSlice';
import productReducer from './slice/productSlice';
import categoryReducer from './slice/categorySlice'

export const store = configureStore({
  reducer: {
    product: productReducer,
    unit: unitReducer,
    category: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
