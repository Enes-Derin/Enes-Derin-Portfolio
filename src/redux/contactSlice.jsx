import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiInstance from '../api/apiInstance';

export const fetchContact = createAsyncThunk('contact/fetch', async () => {
    const response = await apiInstance.get(`/cantact-settings/1`);
    return response.data.payload;
});

export const createContact = createAsyncThunk('contact/create', async (data) => {
    const response = await apiInstance.post('/cantact-settings/admin', data);
    return response.data.payload;
});

export const updateContact = createAsyncThunk(
    'contact/update',
    async ({ id, data }) => {
        const response = await apiInstance.put(`/cantact-settings/admin/${id}`, data);
        return response.data.payload;
    }
);

export const deleteContact = createAsyncThunk('contact/delete', async (id) => {
    const response = await apiInstance.delete(`/cantact-settings/admin/${id}`);
    return response.data.payload;
});

const contactSlice = createSlice({
    name: 'contact',
    initialState: { data: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchContact.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(createContact.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(updateContact.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(deleteContact.fulfilled, (state) => {
                state.data = null;
            });
    },
});

export default contactSlice.reducer;
