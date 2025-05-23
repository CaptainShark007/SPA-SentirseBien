import { configureStore } from '@reduxjs/toolkit';
import authSlice, { AuthState, initialState } from '@/shared/slice/auth.slice';
import snackbarSlice from '@/shared/slice/snackBar.slice';
import modalSlice from '@/shared/slice/modal.slice';
import { getLocalStorage, setLocalStorage } from '@utils/localStorage';
import { storageKeys } from '@constants/localStorage';

const preLoadedAuthState =
  getLocalStorage<AuthState>(storageKeys.auth) ?? initialState;

export const store = configureStore({
  reducer: {
    auth: authSlice,
    snackbar: snackbarSlice,
    modal: modalSlice,
  },
  preloadedState: {
    auth: preLoadedAuthState,
  },
});

store.subscribe(() => {
  const state = store.getState();
  setLocalStorage(storageKeys.auth, state.auth);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
