import { configureStore } from '@reduxjs/toolkit';
import authSlice from '@/shared/slice/auth.slice';
import snackbarSlice from '@/shared/slice/snackBar.slice';
import modalSlice from '@/shared/slice/modal.slice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    snackbar: snackbarSlice,
    modal: modalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
