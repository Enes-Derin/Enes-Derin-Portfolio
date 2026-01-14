import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import aboutReducer from './aboutSlice';
import heroReducer from './heroSlice';
import projectReducer from './projectSlice';
import skillReducer from './skillSlice';
import contactReducer from './contactSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        about: aboutReducer,
        hero: heroReducer,
        project: projectReducer,
        skill: skillReducer,
        contact: contactReducer,
    },
});

export default store;