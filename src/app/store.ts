import { configureStore } from '@reduxjs/toolkit';
import authSlice from '@/features/auth/auth.slice';
import snackbarSlice from '@components/SnackBar/snackBar.slice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    snackbar: snackbarSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
