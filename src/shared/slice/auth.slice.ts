import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  token: string | null;
  username: string | null;
  idUser: number | null;
};

const initialState: AuthState = {
  token: null,
  idUser: null,
  username: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(
      state,
      action: PayloadAction<{
        token: string | null;
        username: string | null;
        idUser: number | null;
      }>
    ) {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.idUser = action.payload.idUser;
    },
    clearToken(state) {
      state.token = null;
      state.idUser = null;
      state.username = null;
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
