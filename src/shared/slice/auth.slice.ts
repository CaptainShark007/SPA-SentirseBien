import { storageKeys } from '@constants/localStorage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { removeLocalStorage } from '@utils/localStorage';

export type AuthState = {
  token: string | null;
  username: string | null;
  idUser: number | null;
  rol: 'ADMIN' | 'PROFESSIONAL' | 'CUSTOMER' | 'DEVELOPER' | null;
};

export type JwtPayload = AuthState & {
  sub: string;
  exp: number;
  iat: number;
};

export const initialState: AuthState = {
  token: null,
  idUser: null,
  username: null,
  rol: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<AuthState>) {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.idUser = action.payload.idUser;
      state.rol = action.payload.rol;
    },
    clearToken(state) {
      state.token = null;
      state.idUser = null;
      state.username = null;
      state.rol = null;
      removeLocalStorage(storageKeys.isSessionExpired);
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
