import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import resumeReducer from './resumeSlice';
import profileReducer from './profileSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        resume: resumeReducer,
        profile: profileReducer,
    },
});
