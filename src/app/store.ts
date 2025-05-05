import { configureStore } from '@reduxjs/toolkit';
import authSlice from '@/features/auth/auth.slice';
import snackbarSlice from '@components/SnackBar/snackBar.slice';
import modalSlice from '@components/ModalRenderer/modal.slice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    snackbar: snackbarSlice,
    modal: modalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
