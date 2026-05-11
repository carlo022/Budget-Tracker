import { configureStore } from '@reduxjs/toolkit';
import budgetReducer from '../features/budget/budgetSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    budget: budgetReducer,
    auth: authReducer,

  },
});