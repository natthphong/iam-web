import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('auth');
        if (!serializedState) return undefined;
        return JSON.parse(serializedState);
    } catch (err) {
        console.error('Failed to load state:', err);
        return undefined;
    }
};

const saveState = (state: any) => {
    try {
        const serializedState = JSON.stringify(state.auth);
        localStorage.setItem('auth', serializedState);
    } catch (err) {
        console.error('Failed to save state:', err);
    }
};

const preloadedState = {
    auth: loadState(),
};

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    preloadedState,
});


store.subscribe(() => saveState(store.getState()));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
