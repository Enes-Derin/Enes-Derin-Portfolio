import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiInstance, { postMultipart, putMultipart } from '../api/apiInstance';

export const fetchAbout = createAsyncThunk(
    'about/fetch',
    async () => {
        const res = await apiInstance.get('/about/1');
        return res.data.payload;
    }
);

export const createAbout = createAsyncThunk(
    'about/create',
    async (formData) => {
        return await postMultipart('/about/admin', formData);
    }
);

export const updateAbout = createAsyncThunk(
    'about/update',
    async ({ id, formData }) => {
        return await putMultipart(`/about/admin/${id}`, formData);
    }
);

export const deleteAbout = createAsyncThunk(
    'about/delete',
    async (id) => {
        await apiInstance.delete(`/about/admin/${id}`);
        return id;
    }
);

const aboutSlice = createSlice({
    name: 'about',
    initialState: { data: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAbout.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(createAbout.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(updateAbout.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(deleteAbout.fulfilled, (state) => {
                state.data = null;
            });
    },
});

export default aboutSlice.reducer;
