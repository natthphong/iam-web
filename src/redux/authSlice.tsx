import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    jwtBody: Record<string, any> | null;
}

const initialState: AuthState = {
    accessToken: null,
    refreshToken: null,
    jwtBody: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<AuthState>) {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.jwtBody = action.payload.jwtBody;
        },
        clearAuth(state) {
            state.accessToken = null;
            state.refreshToken = null;
            state.jwtBody = null;
            localStorage.removeItem('auth');
        },
    },
});

export const { setAuth, clearAuth } = authSlice.actions;

export default authSlice.reducer;
