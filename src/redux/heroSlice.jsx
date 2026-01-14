import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiInstance, { postMultipart, putMultipart } from '../api/apiInstance';

export const fetchHero = createAsyncThunk(
    'hero/fetch',
    async () => {
        const res = await apiInstance.get('/hero-section/1');
        return res.data.payload;
    }
);

export const createHero = createAsyncThunk(
    'hero/create',
    async (formData) => postMultipart('/hero-section/admin', formData)
);

export const updateHero = createAsyncThunk(
    'hero/update',
    async ({ id, formData }) =>
        putMultipart(`/hero-section/admin/${id}`, formData)
);

export const deleteHero = createAsyncThunk(
    'hero/delete',
    async (id) => {
        await apiInstance.delete(`/hero-section/admin/${id}`);
        return id;
    }
);

const heroSlice = createSlice({
    name: 'hero',
    initialState: { data: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHero.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(createHero.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(updateHero.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(deleteHero.fulfilled, (state) => {
                state.data = null;
            });
    },
});

export default heroSlice.reducer;
