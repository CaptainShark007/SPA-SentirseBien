// src/features/snackbar/snackbarSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SnackbarState {
  open: boolean;
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
}

const initialState: SnackbarState = {
  open: false,
  message: '',
  type: 'info',
  duration: 3000,
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar(
      state,
      action: PayloadAction<{
        message: string;
        type?: SnackbarState['type'];
        duration?: number;
      }>
    ) {
      state.open = true;
      state.message = action.payload.message;
      state.type = action.payload.type || 'info';
      state.duration = action.payload.duration || 3000;
    },
    hideSnackbar(state) {
      state.open = false;
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
